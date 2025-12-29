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

### 1. Prerequisites
Node.js (v18+ recommended)

```
Gatsby CLI (npm install -g gatsby-cli)
```

### 2. Initialize
Since this is a custom theme structure, assume you have the files in place. If starting fresh:

```bash
npm install
```


### 3. Key Dependencies
Ensure your package.json includes these core libraries:

```JSON

"dependencies": {
  "gatsby": "^5.x",
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

### 4. Running Locally

```Bash
npm run clean
npm run develop
```

Access the site at `http://localhost:8000`. Alternatively, you can build and serve with `npm run build` && `npm run serve`.




### File Structure & Description
Here is a breakdown of the core files that make the "Garden" logic work.

```Plaintext

/
├── content/                  # Your Markdown/MDX notes go here
│   ├── index.mdx             # The entry point (Home)
│   └── ...
├── src/
│   ├── components/
│   │   ├── GardenInterface.js # THE CORE UI. Renders the horizontal list of NoteCards.
│   │   │                      # Handles the "Spine" visualization and obstructed states.
│   │   │
│   │   └── MdxLink.js         # Custom link component. Intercepts clicks to tell
│   │                          # StackContext "I am clicking from Index X".
│   │
│   ├── context/
│   │   └── StackContext.js    # THE BRAIN. Manages the array of open notes.
│   │                          # Contains the "Branching" logic and "Source Index" ref.
│   │
│   ├── layouts/
│   │   └── index.js           # Wraps the entire app. Captures Gatsby location changes
│   │                          # and feeds them into StackContext.
│   │
│   ├── pages/
│   │   └── {mdx.fields__slug}.js  # The Template for every note.
│   │                              # Queries 'backlinks' and renders content.
│   │
│   └── styles/
│       └── global.css         # Tailwind directives
│
├── utils/
│   └── slugify.js            # Shared utility to ensure [[Wiki Links]] and URLs match perfectly.
│
├── gatsby-config.js          # Configures MDX, WikiLinks, and Path Prefix.
└── gatsby-node.js            # Generates 'Backlinks' field and creates Slugs.
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

- fix erraneous ")}" at the end of each note
- dark mode with a toggle
- optional header and footer
- mobile mode with no stacking
- fix browser back button behavior


