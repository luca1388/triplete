module.exports = {
  siteMetadata: {
    title: `Triplete.net`,
    description: `Con Triplete.net il campionato di calcio italiano non avrà più segreti per te: controlla i risultati della Serie A quando vuoi, ovunque ti trovi. La tua squadra riuscirà a fare il triplete?`,
    author: `@luca1388`,
    image: 'https://triplete.net/preview.png',
    url: 'https://triplete.net'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://www.corrieredellosport.it/rss/calcio/serie-a`,
        name: `NewsRSS`,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Triplete.net`,
        short_name: `Triplete`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#1482d2`,
        display: `standalone`,
        icon: `content/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
