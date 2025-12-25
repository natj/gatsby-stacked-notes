const wikiLinkPlugin = require("remark-wiki-link").wikiLinkPlugin;
const slugify = require("slugify");

module.exports = {
  pathPrefix: "/home/jnattila/astro-curriculum",
  siteMetadata: {
    title: "My Modern Garden",
  },
  // We need to define the path prefix if you are deploying to GitHub Pages
  // pathPrefix: "/your-repo-name", 
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
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [
            [
              wikiLinkPlugin,
              {
                // 1. How to turn [[Title]] into a slug? (e.g. [[My Note]] -> my-note)
                pageResolver: (name) => [slugify(name, { lower: true, strict: true })],
                
                // 2. How to build the final URL? (e.g. /my-note)
                hrefTemplate: (permalink) => `/${permalink}`,

                // 3. (Optional) Class for styling the links
                wikiLinkClassName: "internal-link",
              },
            ],
          ],
        },
      },
    },
  ],
};
