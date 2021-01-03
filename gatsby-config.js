require("dotenv").config({
  path: `.env`,
});

let plugins = [
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
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/`,
      name: "pages",
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
  },
  {
    resolve: `gatsby-source-rss-feed`,
    options: {
      url: `https://www.corrieredellosport.it/rss/calcio/serie-a`,
      name: `NewsRSS`,
    },
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
      icon: `content/images/icons/icon-512x512.png`, // This path is relative to the root of the site.
      description:
        "Con Triplete.net il campionato di calcio italiano non avrà più segreti per te: controlla i risultati della Serie A quando vuoi, ovunque ti trovi. La tua squadra riuscirà a fare il triplete?",
      dir: "ltr",
      lang: "it-IT",
      scope: ".",
      display: "standalone",
      orientation: "portrait-primary",
      shortcuts: [
        {
          name: "Marcatori",
          short_name: "Marcatori",
          description: "Classifica marcatori Serie A",
          url: "/marcatori",
          icons: [
            { src: "content/images/icons/icon-96x96.png", sizes: "96x96" },
          ],
        },
        {
          name: "Partite",
          short_name: "Partite",
          description: "Calendario delle prossime partite di Serie A",
          url: "/partite",
          icons: [
            { src: "content/images/icons/icon-96x96.png", sizes: "96x96" },
          ],
        },
      ],
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  `gatsby-plugin-offline`,
];

if (process.env.GA_TRACKING_ID) {
  console.log('Installing GA plugin...');
  plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GA_TRACKING_ID,
      // Puts tracking script in the head instead of the body
      head: false,
      // Setting this parameter is optional
      anonymize: true,
    },
  });
}

if (process.env.SENTRY_DSN && process.env.BRANCH_ENV) {
  console.log('Installing Sentry plugin...');
  plugins.push({
    resolve: "@sentry/gatsby",
      options: {
          dsn: process.env.SENTRY_DSN,
          environment: process.env.BRANCH_ENV
      },
  });
}

module.exports = {
  siteMetadata: {
    title: `Triplete.net`,
    description: `Con Triplete.net il campionato di calcio italiano non avrà più segreti per te: controlla i risultati della Serie A quando vuoi, ovunque ti trovi. La tua squadra riuscirà a fare il triplete?`,
    author: `@luca1388`,
    image: "https://triplete.net/preview.png",
    url: "https://triplete.net",
  },
  plugins: plugins,
};
