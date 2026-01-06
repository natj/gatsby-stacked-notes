import remarkWikiLinkPkg from "remark-wiki-link";
const wiki_link_plugin = remarkWikiLinkPkg;
import make_slug from "./utils/slugify";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import type { GatsbyConfig } from "gatsby";
import path from "path";

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config: GatsbyConfig = {
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
        path: path.resolve(`content`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partials`,
        path: path.resolve(`src/components/partials`),
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
          rehypePlugins: [rehypeKatex, rehypeSlug],
        },
      },
    },
  ],
};

export default config;
