# Gatsby Stacked-Notes (Digital Garden) Theme

A modern, high-performance "Andy Matuschak-style" digital garden starter built with **Gatsby v5**, **MDX v2**, **React 18**, and **Tailwind CSS**. Entirely migrated to **TypeScript** for robust development.

This theme features a sliding pane layout where notes open side-by-side horizontally. It includes smart navigation (branching history), bi-directional wiki-linking, automatic backlink generation, and full LaTeX support.

## Features

- **Sliding Stack Layout**: Pages slide in from the right, creating a visual history of your thought path.
- **Smart Branching**: Clicking a link in the middle of the stack "forks" the history, clearing subsequent notes to focus on the new path.
- **Wiki-Link Support**: Standard `[[Wiki Links]]` auto-convert to slugs using strict normalization logic.
- **Automatic Backlinks**: Every note displays a "Referred in" section at the bottom, generated at build time.
- **LaTeX Math Rendering**: Native support for inline `$E=mc^2$` and block `$$E=mc^2$$` math using KaTeX.
- **Table of Contents (ToC)**: Compact, clickable ToC with customizable recursion depth via frontmatter.
- **Global Header**: Persistent full-width header containing site-wide navigation and a theme toggle.
- **Spine Mode**: When notes are stacked, they collapse into a vertical "spine" with rotated titles.
- **Stack Highlighting**: Links to notes that are already open in the stack are automatically highlighted with a light blue background.
- **Light/Dark Mode**: Built-in theme context with a persistent toggle centered in the global header.
- **TypeScript Native**: Full type safety across components, context, and Gatsby configuration.

## Installation & Setup

### 1. Initialize
Clone the repository and install dependencies:

```bash
npm install
```

### 2. Running Locally

```bash
# Clean cache and start development server
npm run clean
npm run develop
```

Access the site at `http://localhost:8000`.

### 3. Production Build

```bash
npm run build -- --prefix-paths
npm run serve -- --prefix-paths
```

## File Structure
The project is organized into a clean, TypeScript-first structure.

```Plaintext
/
├── content/                      # Markdown/MDX notes.
├── src/
│   ├── components/
│   │   ├── garden_interface.tsx  # Main UI logic for sliding NoteCards.
│   │   ├── mdx_link.tsx          # Custom link component handling stack navigation.
│   │   ├── theme_toggle.tsx      # Dark mode toggle button.
│   │   └── partials/             # Reusable MDX snippets (Header/Footer).
│   │
│   ├── context/
│   │   ├── stack_context.tsx     # Manages note stack and branching logic.
│   │   └── theme_context.tsx     # Manages persistent light/dark theme state.
│   │
│   ├── hooks/
│   │   └── useWindowWidth.ts     # Monitors window size for responsive layout.
│   │
│   ├── layouts/
│   │   └── index.tsx             # Global layout wrapper (Providers & Header).
│   │
│   ├── pages/
│   │   ├── {mdx.fields__slug}.tsx # Dynamic template for individual notes.
│   │   └── 404.tsx               # Professional "Not Found" page.
│   │
│   └── styles/
│       └── global.css            # Centralized CSS variables and component styles.
│
├── utils/
│   └── slugify.ts                # Shared utility for URL-friendly slugs.
│
├── gatsby-config.ts              # Gatsby plugins and site configuration.
├── gatsby-node.ts                # GraphQL schema customization and backlink logic.
├── tailwind.config.js            # Tailwind CSS configuration.
└── GEMINI.md                     # Strict coding standards and style guide.
```

## Writing Content

Add `.md` or `.mdx` files to the `content/` folder.

### Frontmatter Options

```markdown
---
title: My Advanced Note
toc: true        # Enable Table of Contents
toc_depth: 2     # Limit ToC to H2 sub-sections
hideHeader: true # Hide the local note header area
hideFooter: true # Hide the local note footer area
---
```

### Linking

- **Wiki Style**: `[[Note Title]]` or `[[Note Title|Custom Label]]`
- **Standard**: `[Link Text](/target-slug)`

Internal links are intercepted to open in the sliding stack. Links to open notes receive an `.is-open` CSS class highlight.


## TODO

- **Ghost Links**: Style wiki-links to non-existent notes with dark red text.
- **Link Previews**: Implement a preview box that appears when hovering over a note link.
- **Gallery Feature**: Add "Minimal Mistakes" style gallery support for notes.
- **Search**: Implement site-wide search functionality.
