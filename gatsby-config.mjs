import remarkWikiLinkPkg from "remark-wiki-link";
const wiki_link_plugin = remarkWikiLinkPkg;
import make_slug from "./utils/slugify.mjs";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("DEBUG: remarkMath type:", typeof remarkMath);
console.log("DEBUG: rehypeKatex type:", typeof rehypeKatex);
console.log("DEBUG: wiki_link_plugin type:", typeof wiki_link_plugin);
console.log("DEBUG: remarkWikiLinkPkg:", remarkWikiLinkPkg);

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
  // Path Prefix: Used when deploying to a subdirectory (like GitHub Pages).
  pathPrefix: "/home/jnattila/astro-curriculum",
  siteMetadata: {
    title: "My Modern Garden",
  },
  // Plugins: Gatsby's extension system.
  plugins: [
    `gatsby-plugin-postcss`, // Enables PostCSS support (used by Tailwind).
    `gatsby-plugin-layout`,  // Wraps every page with a persistent layout component.
    
    // Source Filesystem: Reads files from disk into Gatsby's GraphQL data layer.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partials`,
        path: `${__dirname}/src/components/partials`,
      },
    },
    
    // MDX: Parses Markdown with embedded React components.
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [
            remarkMath,
            [
              wiki_link_plugin,
              {
                // Resolve links using shared slugify function.
                pageResolver: (name) => [make_slug(name)],
                hrefTemplate: (permalink) => `/${permalink}`,
                wikiLinkClassName: "internal-link",
              },
            ],
          ],
          rehypePlugins: [rehypeKatex],
        },
      },
    },
  ],
};

export default config;
