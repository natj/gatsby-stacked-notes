module.exports = {
  siteMetadata: {
    title: "My Modern Garden",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-layout`, // Persists state across navigation
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-plugin-mdx`,
  ],
};
