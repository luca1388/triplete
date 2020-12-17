/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios").default;
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

require("dotenv").config({
  path: `.env`,
});

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Team`;
const TABLE_POSITION_NODE_TYPE = `Position`;
const MATCH_NODE_TYPE = `Match`;
const SCORER_NODE_TYPE = "Scorer";

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;

  const data = {};

  const fetchTeams = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/teams", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
  const fetchTable = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/standings", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
  const fetchSchedule = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/matches", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });

  const fetchScorers = async () =>
    axios.get(
      "https://api.football-data.org/v2/competitions/SA/scorers?limit=50",
      {
        headers: { "X-Auth-Token": process.env.API_TOKEN },
      }
    );

  // let news = [];
  // let feed = await parser.parseURL(urls.feedRssList[1]);
  // // console.log(feed);
  // news = feed.items.map(item => ({
  //   title: item.title,
  //   description: item.content,
  //   date: new Date(item.pubDate),
  //   imgSrc: item.enclosure.url,
  //   link: item.link,
  //   source: item.link
  //   // source: getHostName(domData.querySelector("link").innerHTML),
  // }));
  // console.log(news);

  // for (let feed of urls.feedRssList) {
  //   news = news.concat(await fetchFeed(feed));
  // }
  // news.sort((a, b) => b.date - a.date);

  // data.news = news;
  data.teams = (await fetchTeams()).data.teams;
  data.table = (await fetchTable()).data.standings[0].table;
  data.schedule = (await fetchSchedule()).data.matches;
  data.scorers = (await fetchScorers()).data.scorers;

  // loop through data and create Gatsby nodes
  data.teams.forEach(team => {
    createNode({
      ...team,
      teamId: team.id,
      id: createNodeId(`${POST_NODE_TYPE}-${team.id}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(team),
        contentDigest: createContentDigest(team),
      },
    });
  });

  // joining table data with teams to get all needed fields
  data.table = data.table.map(tableEntry => ({
    ...tableEntry,
    ["team"]: { ...data.teams.find(team => team.id === tableEntry.team.id) },
  }));

  data.table.forEach(position =>
    createNode({
      ...position,
      id: createNodeId(`${TABLE_POSITION_NODE_TYPE}-${position.position}`),
      parent: null,
      children: [],
      internal: {
        type: TABLE_POSITION_NODE_TYPE,
        content: JSON.stringify(position),
        contentDigest: createContentDigest(position),
      },
    })
  );

  // joining schedule data with teams to get all needed fields
  data.schedule = data.schedule.map(match => {
    const homeTeam = data.teams.find(team => team.id === match.homeTeam.id);
    const awayTeam = data.teams.find(team => team.id === match.awayTeam.id);

    return {
      ...match,
      ["homeTeam"]: homeTeam,
      ["awayTeam"]: awayTeam,
    };
  });

  data.schedule.forEach(match => {
    createNode({
      ...match,
      id: createNodeId(`${MATCH_NODE_TYPE}-${match.id}`),
      parent: null,
      children: [],
      internal: {
        type: MATCH_NODE_TYPE,
        content: JSON.stringify(match),
        contentDigest: createContentDigest(match),
      },
    });
  });

  // joining table data with teams to get all needed fields
  data.scorers = data.scorers.map(scorer => ({
    ...scorer,
    ["team"]: { ...data.teams.find(team => team.id === scorer.team.id) },
  }));

  data.scorers.forEach(scorer => {
    createNode({
      ...scorer,
      id: createNodeId(`${SCORER_NODE_TYPE}-${scorer.player.id}`),
      parent: null,
      children: [],
      internal: {
        type: SCORER_NODE_TYPE,
        content: JSON.stringify(scorer),
        contentDigest: createContentDigest(scorer),
      },
    });
  });
  return;
};

exports.onCreateNode = ({ node, getNode, actions }) => {};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const scorersResult = await graphql(`
    query {
      allScorer {
        edges {
          node {
            id
            player {
              id
              name
              nationality
            }
            team {
              teamId: id
              shortName
              crestUrl
            }
            numberOfGoals
          }
        }
      }
    }
  `);

  createPage({
    path: "/marcatori",
    component: path.resolve(`./src/templates/Scorers/Scorers.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      scorers: scorersResult.data.allScorer.edges.map(edge => ({
        ...edge.node,
      })),
    },
  });

  const scheduleResult = await graphql(`
    {
      allMatch {
        totalCount
        edges {
          node {
            id
            season {
              currentMatchday
            }
            utcDate
            status
            matchday
            score {
              fullTime {
                homeTeam
                awayTeam
              }
            }
            homeTeam {
              shortName
              teamId: id
              crestUrl
              tla
            }
            awayTeam {
              shortName
              teamId: id
              crestUrl
              tla
            }
          }
        }
      }
    }
  `);

  const calendar = scheduleResult.data.allMatch.edges
    .map(entry => ({ ...entry.node }))
    .reduce((acc, current) => {
      acc[current.utcDate.split("T")[0]] = [
        ...(acc[current.utcDate.split("T")[0]] || []),
        current,
      ];
      return acc;
    }, {});

  createPage({
    path: "/partite",
    component: path.resolve(`./src/templates/Schedule/Schedule.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      calendar: calendar,
    },
  });

  // const teams = await graphql(`
  //   {
  //     allTeam {
  //       edges {
  //         node {
  //           id
  //           teamId
  //         }
  //       }
  //     }
  //   }
  // `)

  //     createPage({
  //       path: "/schedule/teams/" + searchedTeamId,
  //       component: path.resolve(`./src/templates/Schedule/Schedule.tsx`),
  //       context: {
  //         // Data passed to context is available
  //         // in page queries as GraphQL variables.
  //         teamId: searchedTeamId,
  //         teamName: searchedTeam.name,
  //         matches: searchedTeamMatches,
  //         teamShortName: searchedTeam.shortName,
  //         teamImage: searchedTeam.crestUrl,
  //       },
  //     })
  //   })

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              slug
            }
            html
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve('./src/templates/About/About.tsx'),
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        title: node.frontmatter.title,
        html: node.html
      },
    });
  });
};
