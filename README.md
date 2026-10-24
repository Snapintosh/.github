# Snapintosh organization profile

`profile/README.md` is the public overview at [github.com/Snapintosh](https://github.com/Snapintosh).

The visual system uses graphite, ivory, and coral. The existing Snapintosh dragon mark is preserved in `profile/assets/snapintosh-mark.png` and its smaller variant. The desktop and mobile heroes are self-contained SVGs with the small mark embedded; the six component icons are editable SVGs. All overview images are served from this repository, without external badge services or fonts.

Update descriptions and status from the public component documentation. Keep the hardware target and experimental limits visible. See `AGENTS.md` for maintenance rules.

## Preview and verify

Requirements: Node.js 22 or later, Git, and an authenticated GitHub CLI (`gh`).

```sh
npm install
npx playwright install chromium
PROFILE_PREVIEW=1 npm run verify
```

Preview mode asks GitHub to render the candidate Markdown, then inserts it into the organization page **only inside a local headless browser**. Local image responses are substituted for the unpublished assets. Nothing is published by this command. GitHub supplies the page layout and styles.

After publishing, run:

```sh
npm run verify
```

Live mode checks the published README and image hashes, repository and document links, roadmap anchors, image loading, responsive hero selection, component cards, essential status text, and horizontal overflow. Both modes capture the profile and full page at desktop and mobile widths in light and dark themes. A human should inspect those screenshots before considering the design verified.

Each run creates an ignored `artifacts/<mode>-<timestamp>/` directory with screenshots, rendered text, a JSON report, and `SHA256SUMS`. The report distinguishes a local preview from a live check and records the local/remote commits and asset hashes. The verifier does not run hardware or qualify macOS compatibility.
