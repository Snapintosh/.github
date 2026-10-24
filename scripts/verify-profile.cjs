// End-to-end verification against GitHub's real organization-page renderer.
// PROFILE_PREVIEW=1 injects GitHub-rendered candidate Markdown locally before publishing.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const preview = process.env.PROFILE_PREVIEW === '1';
const mode = preview ? 'preview' : 'live';
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const out = path.join(root, 'artifacts', `${mode}-${stamp}`);
const origin = 'https://github.com/Snapintosh';
const assetPrefix = 'https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/';
const source = fs.readFileSync(path.join(root, 'profile/README.md'), 'utf8');
const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');
const gh = (...args) => execFileSync('gh', args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
fs.mkdirSync(out, { recursive: true });
const report = { mode, url: origin, timestamp: new Date().toISOString(), readmeSha256: sha256(source), views: [], links: [], assets: [], failures: [] };

(async () => {
  let browser;
  try {
    report.localCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
    report.remoteCommit = JSON.parse(gh('api', 'repos/Snapintosh/.github/commits/main')).sha;
    let rendered;
    if (preview) {
      rendered = execFileSync('gh', ['api', 'markdown', '--method', 'POST', '--input', '-'], {
        input: JSON.stringify({ text: source, mode: 'gfm', context: 'Snapintosh/.github' }), encoding: 'utf8'
      });
      fs.writeFileSync(path.join(out, 'github-rendered.html'), rendered);
    } else {
      const published = gh('api', 'repos/Snapintosh/.github/contents/profile/README.md', '-H', 'Accept: application/vnd.github.raw+json');
      if (published !== source) report.failures.push('Published README differs from the local candidate.');
    }
    // Check each destination using GitHub's API, avoiding web-page anti-bot/rate-limit responses.
    const links = [...new Set([...source.matchAll(/(?:https:\/\/github\.com\/)[^\s"<>\)]+/g)].map(m => m[0]))];
    for (const href of links) {
      const u = new URL(href);
      const [owner, repo, kind, ref, ...rest] = u.pathname.slice(1).split('/');
      let endpoint = `repos/${owner}/${repo}`;
      if (kind === 'blob') endpoint += `/contents/${rest.join('/')}?ref=${ref}`;
      try {
        const data = JSON.parse(gh('api', endpoint));
        if (kind === 'issues' && !data.has_issues) throw new Error('Issues are disabled');
        if (u.hash && data.content) {
          const text = Buffer.from(data.content, 'base64').toString();
          const anchors = [...text.matchAll(/^#{1,6} (.+)$/gm)].map(m => m[1].toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu, '').replace(/ /g, '-'));
          if (!anchors.includes(decodeURIComponent(u.hash.slice(1)))) throw new Error('Heading anchor missing');
        }
        report.links.push({ href, ok: true });
      } catch (e) {
        report.links.push({ href, ok: false });
        report.failures.push(`Destination failed: ${href}`);
      }
    }
    const externalLinks = [...new Set([...source.matchAll(/https:\/\/(?!github\.com|raw\.githubusercontent\.com)[^\s"<>\)]+/g)].map(m => m[0]))];
    for (const href of externalLinks) {
      const res = await fetch(href, { signal: AbortSignal.timeout(30000) });
      report.links.push({ href, ok: res.ok, status: res.status });
      if (!res.ok) report.failures.push(`External destination failed: ${href} (${res.status})`);
    }
    const assets = [...new Set([...source.matchAll(/src(?:set)?="([^"]+)"/g)].map(m => m[1]))];
    for (const url of assets) {
      const local = fs.readFileSync(path.join(root, 'profile/assets', path.basename(new URL(url).pathname)));
      const result = { url, localSha256: sha256(local) };
      if (!preview) {
        const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
        const bytes = Buffer.from(await res.arrayBuffer());
        result.status = res.status;
        result.remoteSha256 = sha256(bytes);
        if (!res.ok || result.remoteSha256 !== result.localSha256) report.failures.push(`Published asset mismatch: ${url}`);
      }
      report.assets.push(result);
    }
    browser = await chromium.launch({ headless: true });
    for (const view of [
      { name: 'desktop-light', width: 1440, height: 1100, colorScheme: 'light' },
      { name: 'desktop-dark', width: 1440, height: 1100, colorScheme: 'dark' },
      { name: 'mobile-light', width: 390, height: 844, colorScheme: 'light' },
      { name: 'mobile-dark', width: 390, height: 844, colorScheme: 'dark' }
    ]) {
      const context = await browser.newContext({ viewport: { width: view.width, height: view.height }, colorScheme: view.colorScheme, deviceScaleFactor: 1 });
      const page = await context.newPage();
      if (preview) await page.route(`${assetPrefix}**`, route => {
        const name = path.basename(new URL(route.request().url()).pathname);
        return route.fulfill({ path: path.join(root, 'profile/assets', name), contentType: name.endsWith('.svg') ? 'image/svg+xml' : 'image/png' });
      });
      await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const article = page.locator('article.markdown-body').first();
      await article.waitFor({ state: 'visible' });
      if (preview) await article.evaluate((element, html) => { element.innerHTML = html; }, rendered);
      await page.waitForFunction(() => {
        const imgs = [...document.querySelectorAll('article.markdown-body img')];
        return imgs.length >= 7 && imgs.every(img => img.complete);
      }, { timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      const checks = await article.evaluate(element => {
        const images = [...element.querySelectorAll('img')].map(img => ({ src: img.getAttribute('src'), currentSrc: img.currentSrc, naturalWidth: img.naturalWidth, loaded: img.naturalWidth > 0, alt: img.alt }));
        const table = element.querySelector('table');
        return {
          images,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
          articleOverflow: element.scrollWidth > element.clientWidth + 1,
          cards: table ? table.querySelectorAll('td').length : 0,
          text: element.innerText,
          theme: { mode: document.documentElement.getAttribute('data-color-mode'), background: getComputedStyle(document.body).backgroundColor }
        };
      });
      if (checks.images.length !== 7 || checks.images.some(i => !i.loaded || !i.alt)) report.failures.push(`${view.name}: image load/alt failure`);
      if (checks.horizontalOverflow || checks.articleOverflow) report.failures.push(`${view.name}: horizontal overflow`);
      if (checks.images[0]?.naturalWidth !== (view.width <= 600 ? 720 : 1440)) report.failures.push(`${view.name}: incorrect responsive hero`);
      if (checks.cards !== 6) report.failures.push(`${view.name}: expected six component cards`);
      for (const text of ['Still experimental', 'UX3607OA', '26A428', 'Mac host', 'SnapQCC2072']) if (!checks.text.includes(text)) report.failures.push(`${view.name}: missing ${text}`);
      fs.writeFileSync(path.join(out, `${view.name}.txt`), checks.text);
      delete checks.text;
      await article.screenshot({ path: path.join(out, `${view.name}.png`) });
      await page.screenshot({ path: path.join(out, `${view.name}-page.png`), fullPage: true });
      report.views.push({ ...view, ...checks });
      await context.close();
    }
  } catch (e) {
    report.failures.push(e.message);
  } finally {
    if (browser) await browser.close();
    report.passed = report.failures.length === 0;
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    const files = fs.readdirSync(out).filter(name => name !== 'SHA256SUMS');
    fs.writeFileSync(path.join(out, 'SHA256SUMS'), files.map(name => `${sha256(fs.readFileSync(path.join(out, name)))}  ${name}`).join('\n') + '\n');
    console.log(JSON.stringify({ passed: report.passed, mode, views: report.views.length, links: report.links.length, assets: report.assets.length, failures: report.failures, artifacts: out }, null, 2));
    if (!report.passed) process.exitCode = 1;
  }
})();
