export default {
    apiUrl: process.env.API_URL,
    apiToken: process.env.TOKEN,
    // feedRssUrl: 'https://www.corrieredellosport.it/rss/calcio/serie-a'
    feedRssUrl: 'https://www.gazzetta.it/rss/serie-a.xml',
    feedRssList: [
        'https://www.gazzetta.it/rss/serie-a.xml',
        'https://www.corrieredellosport.it/rss/calcio/serie-a'
    ]
};