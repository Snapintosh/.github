# Organization profile maintenance

- Use the Context Mode plugin whenever practical to keep large tool output out of context.
- Keep changes scoped to this organization profile. Preserve unrelated work.
- `profile/README.md` is the public GitHub organization overview. Use GitHub-supported Markdown and HTML; scripts and custom CSS do not run there.
- Preserve the graphite, ivory, and coral identity and the existing Snapintosh dragon mark. Keep image assets in `profile/assets/`; use absolute raw.githubusercontent.com URLs so they resolve on the organization page.
- Verify claims and links against the current public component repositories. Keep the hardware target and experimental status visible. A source build or offline replay does not prove a hardware result.
- Never publish vendor binaries, private inputs, credentials, personal paths, or machine identifiers.
- Never write unit tests after you write code.
- Highly prefer E2E tests as the sole testing mechanism. Use them to verify complex features work. At the end of E2E tests, produce a verifiable and repeatable artifact.
- If you must test a system in isolation, first write down all the ways it could fail, then write the code.
- For profile changes, verify the rendered page in light and dark themes and at a narrow viewport. Retain screenshots and a machine-readable report using `npm run verify`. Check outbound links, image loading, and horizontal overflow. Keep generated artifacts out of Git.
- Before publishing, inspect the outgoing diff, run `git diff --check`, and check for secrets. After publishing, verify the remote commit and the live organization overview.
