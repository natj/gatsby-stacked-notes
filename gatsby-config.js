const wiki_link_plugin = require("remark-wiki-link").wikiLinkPlugin;
const make_slug = require("./utils/slugify");

module.exports = {
  pathPrefix: "/home/jnattila/astro-curriculum",
  siteMetadata: {
    title: "My Modern Garden",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-layout`,
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
