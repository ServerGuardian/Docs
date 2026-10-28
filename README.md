# ServerGuardian Docs

The public documentation: how ServerGuardian works for game-server owners and for players, how to install the plugins, and the rules. Built with [VitePress](https://vitepress.dev) (Vue 3), in TypeScript, in the same brand style as the web apps.

These pages are a **pre-launch preview** and say so. Internal planning, legal and security documents are not here: they are in the private [Internal](https://github.com/ServerGuardian/Internal) repository.

## Run it

Needs Node 26 (25 works for now) and pnpm 10.

```bash
pnpm install
pnpm dev        # http://localhost:5190
pnpm build      # static site in docs/.vitepress/dist
```

Checks: `pnpm typecheck`, `pnpm lint`, `pnpm format`.

## Layout

```
docs/
  index.md              home page
  guide/                for server owners: how it works, getting started, rules
  install/              one page per plugin: BeamMP, FiveM, Minecraft
  players/              for players
  public/logo.svg       the placeholder mark
  .vitepress/
    config.ts           site title, navigation, sidebar, search
    theme/
      brand.css         the brand tokens, copied from Website's branding/theme.css
      style.css         maps those tokens onto VitePress's variables (change colours in brand.css)
      index.ts          loads the self-hosted fonts and the two files above
```

## House rules

- No analytics, no third-party fonts or scripts (a request to another company reveals the visitor's IP address). Search is VitePress's built-in local search; fonts are npm packages.
- Never publish a number behind the rules ("Very sure", "Balanced", "Less sure" are words by design), and never claim something the product does not do yet. Say "not yet tried on a live server" where it is true.
- Colours come from `brand.css` only. When the brand changes, change it in the Website repository first, then copy the two blocks here.

## Publishing

CI builds the site on every push. It publishes only when the repository variable `DEPLOY_DOCS` is `true` and Pages is set to deploy from GitHub Actions. Set the variable `DOCS_BASE` to `/Docs/` if serving from `serverguardian.github.io/Docs/` rather than a custom domain.

The earlier 2025 MkDocs page is kept on the `legacy-2025` branch.
