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
  `gatsby-plugin-styled-components`,
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
      icon: "content/icon.png",
      icons: [
        {
          src: "content/images/icons/icon-48x48.png",
          type: "image/png",
          sizes: "48x48",
        },
        {
          src: "content/images/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-256x256.png",
          type: "image/png",
          sizes: "256x256",
        },
        {
          src: "content/images/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "content/images/icons/icon-512x512-maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
      description:
        "Con Triplete il campionato di calcio non avrà più segreti per te: controlla la classifica e i risultati della Serie A quando vuoi, ovunque ti trovi. La tua squadra riuscirà a fare il triplete?",
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
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      exclude: ["/news/*"],
    },
  },
  {
    resolve: "gatsby-plugin-robots-txt",
    options: {
      host: "https://www.triplete.net",
      sitemap: "https://www.triplete.net/sitemap.xml",
      resolveEnv: () => process.env.BRANCH_ENV,
      env: {
        development: {
          policy: [{ userAgent: "*", disallow: ["/"] }],
        },
        production: {
          policy: [
            { userAgent: "*", allow: "/" },
            { userAgent: "Googlebot-Image", disallow: ["/"] },
          ],
        },
      },
    },
  },
];

if (process.env.GATSBY_GA_TRACKING_ID && process.env.GATSBY_GA_TRACKING_ID !== " ") {
  plugins.push({
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: process.env.GATSBY_GA_TRACKING_ID,
      // Puts tracking script in the head instead of the body
      head: false,
      // enable ip anonymization
      anonymize: true,
    },
  });
}

if (process.env.SENTRY_DSN && process.env.BRANCH_ENV && process.env.SENTRY_DSN !== " ") {
  plugins.push({
    resolve: "@sentry/gatsby",
    options: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.BRANCH_ENV,
    },
  });
}

module.exports = {
  siteMetadata: {
    title: `Triplete - Classifica Serie A`,
    description: `Con Triplete il campionato di calcio non avrà più segreti per te: controlla la classifica e i risultati della Serie A quando vuoi, ovunque ti trovi. La tua squadra riuscirà a fare il triplete?`,
    author: `@luca1388`,
    image: "https://www.triplete.net/preview.png",
    url: "https://www.triplete.net",
    siteUrl: "https://www.triplete.net",
    displayTitle: "Triplete.net"
  },
  plugins: plugins,
};
