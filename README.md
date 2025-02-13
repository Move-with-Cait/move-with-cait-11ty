# Electric Eleventy Starter ⚡️

This is an Eleventy 3.0 + Lightning CSS starter repository that I use to scaffold most of my freelance studio's marketing/brochure site projects. In addition to some basic tooling and features, it includes a number of opinionated decisions about how I prefer to work with Eleventy. It's meant mainly as a shortcut for me, but if others find it useful, that's great, too!

## Features

- [Eleventy 3.0](https://www.11ty.dev/) static site generator with image and navigation plugins
- [Lightning CSS](https://lightningcss.dev/) scripts to transpile, bundle, and minify CSS — organize and write styles as you please, and forget all of those PostCSS dependencies
- [Alpine JS](https://alpinejs.dev/start-here) for lightweight interactivity
- A number of pre-defined layouts, partials, and base CSS styles
- Fluid typography scaling and spacing with [Utopia](https://utopia.fyi/)
- Optimized web font loading (using one of my favorite workhorse fonts at the moment, [Public Sans](https://public-sans.digital.gov/))
- [Reasonable Colors](https://www.reasonable.work/colors/) for quick, accessible color palettes
- `robots.txt` that blocks AI scrapers

## Opinions

Take or leave the following opinions:

- Uses the Liquid templating engine, which is well-supported and has a great [VS Code extension](https://marketplace.visualstudio.com/items?itemName=killalau.vscode-liquid-snippets)
- Uses a base `src` directory for all includes, assets, and content
- Places content (pages, posts, collections, etc.) in a dedicated `content` directory for ease of organization, while retaining normal permalink output
- Separates filters and shortcodes into individual files, which are collected in `index.js` files and imported into `eleventy.config.mjs` (thanks ESM!)
- Implements a [CUBE CSS](https://piccalil.li/blog/cube-css/)-influenced approach to authoring styles and uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to control the cascade and nesting for visual organization
- Retains Prettier and VS Code preference files — i.e., settings for the [CSS Var Complete](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar) extension
- Prefers `snake_case` over `camelCase` for nameing partials, filters, shortcodes, etc.
- Annotates filters, shortcodes, and functions with [JSDoc](https://jsdoc.app/about-getting-started)

## Getting Started

### 1. Generate or clone repository

The easiest way to use this starter repository is to click "Use this template" and create a new repository. Alternatively, you can clone/fork this repository yourself.

### 2. Install dependencies

Navigate to your local directory and use npm (or other package manager) to install dependencies.

```node
cd electric-eleventy
```

```node
npm install
```

### 3. Run scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts Eleventy dev server and bundles CSS with Lightning CSS (no minification). |
| `npm run build` | Builds site and bundles/minifies CSS to `_site` output directory. |
| `npm run clean` | Deletes the `_site` output directory (Mac/Linux). |

## Organization

The `src` directory has the following structure:

```yaml
src/
├── _data/  # sitewide data
├── _includes/
│   ├── layouts/  # page templates
│   └── partials/
│       ├── components/  # most partials are here
│       ├── modules/  # larger page sections (for page building scenario)
│       └── navigation/
├── assets/
│   ├── images/  # all will be processed
│   └── styles/
│       ├── base/  # main/critical css
│       ├── block/  # styles for individual pages/partials/modules
│       ├── components/  # styles for singular components like buttons
│       ├── navigation/  # styles for navigation components
│       └── site.css  # main file that imports everything
├── content/  # pages, posts, etc.
├── lib/  # filters/shorcodes and other helper functions
│   ├── filters/  # add filters here
│   ├── shortcodes/  # add shortcodes here
│   └── utils/  # add other functions here
└── static/  # passthrough directory for public assets (outputs to root)
    └── fonts/
```

A few notes on other files:

- `.theme-check.yml` is used to control/disable some of the warning messages from the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=killalau.vscode-liquid-snippets)
- `.vscode` directory contains a settings file that manages the [CSS Var Complete](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar) extension

## Acknowledgments

Some of the great people/projects that have informed my thinking and made this starter repository possible:

- [CUBE CSS/Piccalilli](https://piccalil.li/blog/cube-css/)
- [Utopia - Fluid Responsive Design](https://utopia.fyi/)
- [Reasonable Colors](https://www.reasonable.work/colors/)
- [Zach Leatherman - The Font Loading Checklist](https://www.zachleat.com/web/font-checklist/) (and many more)
- [Bryce Wray - Using Lightning CSS with Hugo](https://www.brycewray.com/posts/2024/02/using-lightning-css-hugo-without-workarounds/)
