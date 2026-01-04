const wiki_link_plugin = require("remark-wiki-link").wikiLinkPlugin;
const make_slug = require("./utils/slugify");

module.exports = {
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
        },
      },
    },
  ],
};
