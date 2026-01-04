# Gatsby Digital Garden Theme

A modern, "Andy Matuschak-style" digital garden starter built with Gatsby v5, MDX, and Tailwind CSS.

This theme features a sliding pane layout where notes open side-by-side horizontally. It includes smart navigation (branching history), bi-directional wiki-linking, and automatic backlink generation.

## Features

- Sliding Stack Layout: Pages slide in from the right, creating a visual history of your thought path.
- Smart Branching: Clicking a link in the middle of the stack "forks" the history, clearing subsequent notes to focus on the new path.
- Wiki-Link Support: Write standard [[Wiki Links]] that auto-convert to slugs using strict logic.
- Automatic Backlinks: Every note displays a "Linked to by" section at the bottom, generated at build time.
- Spine Mode: When notes are stacked, they collapse into a vertical "spine" with rotated text (like books on a shelf).
- GitHub Pages Ready: Configured for easy deployment to subdirectories using pathPrefix.

## Installation & Setup

### 1. Initialize
Since this is a custom theme structure, assume you have the files in place. If starting fresh:

```bash
npm install
```


### 2. Key Dependencies
Ensure your `package.json` includes these core libraries:

```JSON

"dependencies": { "gatsby": "^5.x",
  "gatsby-plugin-mdx": "^5.x",
  "gatsby-plugin-layout": "^4.x",
  "gatsby-plugin-postcss": "^6.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "remark-wiki-link": "^2.x",
  "slugify": "^1.x",
  "tailwindcss": "^3.x"
}
```

### 3. Running Locally

```Bash
npm run clean
npm run develop
```

Access the site at http://localhost:8000. Alternatively, you can build and serve with `npm run build` && `npm run serve`.


### File Structure & Description
Core files powering the "Garden" logic.

```Plaintext

/
├── content/                      # Markdown/MDX notes.
├── src/
│   ├── components/
│   │   ├── partials/             # Reusable MDX snippets (Header/Footer).
│   │   ├── garden_interface.js   # UI entry. Renders sliding NoteCards.
│   │   ├── mdx_link.js           # Intercepts links for stack navigation.
│   │   └── theme_toggle.js       # Light/dark mode toggle button.
│   │
│   ├── context/
│   │   ├── stack_context.js    # Manages note stack and branching logic.
│   │   └── theme_context.js    # Manages light/dark theme state.
│   │
│   ├── hooks/
│   │   └── useWindowWidth.js   # Monitors window width for responsive UI.
│   │
│   ├── layouts/

│   │   └── index.js              # App wrapper. Syncs Gatsby location with stack.
│   │
│   ├── pages/
│   │   ├── {mdx.fields__slug}.js # Template for individual notes.
│   │   └── 404.js                # Custom "Not Found" page.
│   │
│   └── styles/
│       └── global.css            # Tailwind and custom global styles.
│
├── utils/
│   └── slugify.js                # Utility for consistent URL slugs.
│
├── gatsby-config.js              # Gatsby plugins and site configuration.
├── gatsby-node.js                # Custom GraphQL fields (backlinks) and slugs.
├── postcss.config.js             # PostCSS configuration for Tailwind.
├── tailwind.config.js            # Tailwind CSS configuration.
└── GEMINI.md                     # Project-specific coding and comment style guide.
```


### Writing Content

Add .md or .mdx files to the `content/` folder. Frontmatter is optional but recommended for titles.

```Markdown

---
title: My Gardening Tips
---

Here is a paragraph about gardening.
```

#### Linking (Wiki Style)

You can link to other notes using double brackets. The system uses the `utils/slugify.js` logic to resolve the filename.
- [[Watering Plants]] → Links to /watering-plants
- [[Watering Plants|Click here]] → Links to /watering-plants with text "Click here"

Standard Markdown links also work and are intercepted by the stack logic: `[Go to Home](/)`

### Deploying to GitHub Pages

If your site is hosted at `username.github.io/repo-name`, you must configure the Path Prefix.

`gatsby-config.js:`

```JavaScript

module.exports = {
  pathPrefix: "/repo-name", // REPLACE WITH YOUR REPO NAME
  // ...
}
```

You must include the flag when building.

```Bash

npm run build -- --prefix-paths
```

# TODO

- ghost (wiki) links to missing notes are styled with a dark red text to show that they do not exist
- notes can have "title of content" listing after the title (when toc:true is set in markdown preamble)
- latex support to md
- a preview box opens when however above a note link

Tasks pending because gemini failed (too complex):
- open notes in the stack have their link highlighted with a light blue background
