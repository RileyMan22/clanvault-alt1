# ClanVault Alt1 App

A companion app for [ClanVault](https://clanvault.io) that runs inside the [Alt1 Toolkit](https://runeapps.org/) for RuneScape 3.

## Features

- **Hiscores** — look up any RS3 player's skill levels and ranks
- **GE Price** — check current Grand Exchange prices for any item
- **Citadel Tracker** — coming soon

## Add to Alt1

```
alt1://addapp/https://RileyMan22.github.io/clanvault-alt1/appconfig.json
```

Paste that link into your browser while Alt1 is running.

## Development

```bash
npm install
npm run watch   # rebuilds on save → open dist/index.html in a browser to test
npm run build   # production build
```

The app works in a regular browser for UI development. Alt1-specific APIs (`alt1.identifyAppUrl`, overlay drawing, screen capture) only activate when running inside the Alt1 Toolkit.

## Deployment

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

Make sure GitHub Pages is enabled in your repo settings with source set to **GitHub Actions**.

## Adding an icon

Add a 64×64 PNG named `icon.png` to the `src/` folder. It will be copied to `dist/` by webpack and shown in the Alt1 app list.
