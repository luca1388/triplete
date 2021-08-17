/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios").default;
const path = require("path");

require("dotenv").config({
  path: `.env`,
});

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Team`;
const TABLE_POSITION_NODE_TYPE = `Position`;
const MATCH_NODE_TYPE = `Match`;
const SCORER_NODE_TYPE = "Scorer";
const SCORER_UCL_NODE_TYPE = "ScorerUCL";
const UCL_STANDING_NODE_TYPE = "Group";

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type AuthorJson implements Node @dontInfer {
//       name: String!
//       firstName: String!
//       email: String!
//       joinedAt: Date
//     }
//   `
//   createTypes(typeDefs)
// }

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;

  const data = {
    ucl: {},
  };

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

  const fetchUCLTeams = async () =>
    axios.get("https://api.football-data.org/v2/competitions/CL/teams", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });

  const fetchStandingsUCL = async () =>
    axios.get("https://api.football-data.org/v2/competitions/CL/standings", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
  
  const fetchScorersUCL = async () =>
    axios.get("https://api.football-data.org/v2/competitions/CL/scorers?limit=25", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });

  data.teams = (await fetchTeams()).data.teams;
  data.table = (await fetchTable()).data.standings[0].table;
  data.schedule = (await fetchSchedule()).data.matches;
  data.scorers = (await fetchScorers()).data.scorers;
  data.ucl.standings = (await fetchStandingsUCL()).data.standings.filter(
    standing => standing.type === "TOTAL"
  );
  data.ucl.teams = (await fetchUCLTeams()).data.teams;
  data.ucl.scorers = (await fetchScorersUCL()).data.scorers;

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
  data.ucl.standings = data.ucl.standings.map(entry => ({
    ...entry,
    ["table"]: entry.table.map(tab => {
      const updatedTeam = data.ucl.teams.find(team => team.id === tab.team.id);

      return {
        ...tab,
        ["team"]: updatedTeam,
      };
    }),
  }));

  data.ucl.standings.forEach(standing =>
    createNode({
      ...standing,
      id: createNodeId(`${UCL_STANDING_NODE_TYPE}-${standing.group}`),
      parent: null,
      children: [],
      internal: {
        type: UCL_STANDING_NODE_TYPE,
        content: JSON.stringify(standing),
        contentDigest: createContentDigest(standing),
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

  data.ucl.scorers = data.ucl.scorers.map(scorer => ({
    ...scorer,
    ["team"]: { ...data.ucl.teams.find(team => team.id === scorer.team.id) },
  }));

  data.ucl.scorers.forEach(scorer =>
    createNode({
      ...scorer,
      id: createNodeId(`${SCORER_UCL_NODE_TYPE}-${scorer.player.id}`),
      parent: null,
      children: [],
      internal: {
        type: SCORER_UCL_NODE_TYPE,
        content: JSON.stringify(scorer),
        contentDigest: createContentDigest(scorer),
      },
    })
  );
  return;
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Scorer implements Node {
          id: String
          player: playerScorer
          team: teamScorer
          numberOfGoals: Int
    } 

    type playerScorer implements Node {
      id: Int
      name: String
      nationality: String
    }

    type teamScorer implements Node {
      teamId: Int
      shortName: String
      crestUrl: String
    }

    type Group implements Node {
      id: Int
      group: String
      table: tableGroup
    }

    type tableGroup implements Node {
      position: Int
      playedGames: Int
      won: Int
      draw: Int
      lost: Int
      points: Int
      goalsFor: Int
      goalsAgainst: Int
      goalDifference: Int
      team: teamGroup
    }

    type teamGroup implements Node {
      id: String
      name: String
      crestUrl: String
      shortName: String
      tla: String
    }

    type Match implements Node {
      id: Int
      season: season
      utcDate: Date
      status: String
      matchday: Int
      score: timeScore
      homeTeam: teamScore
      awayTeam: teamScore
    }

    type teamScore implements Node {
      shortName: String
      id: Int
      crestUrl: String
      tla: String
    }

    type season implements Node {
      currentMatchday: Int
    }

    type timeScore implements Node {
      fullTime: scoreMatch
    }

    type scoreMatch implements Node {
        homeTeam: Int
        awayTeam: Int
    }

  `;
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `FeedNewsRSS`) {
    const slug = node.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, "-") // swap any length of whitespace, underscore, hyphen characters with a single -
      .replace(/^-+|-+$/g, ""); // remove leading, trailing -

    let nodeField = {
      node,
      name: `slug`,
      value: slug,
    };
    if (!nodeField.node.enclosure || !nodeField.node.enclosure.url) {
      nodeField.node.enclosure = {
        url: "",
      };
    }

    createNodeField({
      ...nodeField,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const scorersResult = await graphql(`
    query {
      allScorer {
        nodes {
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
  `);

  createPage({
    path: "/marcatori",
    component: path.resolve(`./src/templates/Scorers/Scorers.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      scorers: scorersResult.data?.allScorer.nodes.map(edge => ({
        ...edge.node,
      })),
    },
  });

  const uclScorersResult = await graphql(`
    query {
      allScorerUcl {
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
    path: "/champions/marcatori",
    component: path.resolve(`./src/templates/Scorers/Scorers.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      scorers: uclScorersResult.data?.allScorerUcl.edges.map(edge => ({
        ...edge.node,
      })),
    },
  });

  const uclStandingsResult = await graphql(`
    query {
      allGroup {
        nodes {
          id
          group
          table {
            position
            playedGames
            won
            draw
            lost
            points
            goalsFor
            goalsAgainst
            goalDifference
            team {
              teamId: id
              name
              crestUrl
              shortName
              tla
            }
          }
        }
      }
    }
  `);

  createPage({
    path: "/champions/gironi",
    component: path.resolve(`./src/templates/Groups/Groups.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      groups: uclStandingsResult.data?.allGroup.nodes,
    },
  });

  const scheduleResult = await graphql(`
    {
      allMatch {
        totalCount
        nodes {
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
  `);

  const calendar = scheduleResult.data?.allMatch.nodes
    // .map(entry => ({ ...entry.node }))
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
      component: path.resolve("./src/templates/About/About.tsx"),
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        title: node.frontmatter.title,
        html: node.html,
      },
    });
  });

  // const newsResult = await graphql(`
  //   {
  //     allFeedNewsRss {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //           }
  //           title
  //           content
  //           pubDate
  //           enclosure {
  //             url
  //           }
  //           link
  //           isoDate
  //         }
  //       }
  //     }
  //   }
  // `);

  // newsResult.data.allFeedNewsRss.edges.forEach(({ node }) => {
  //   createPage({
  //     path: '/news/' + node.fields.slug,
  //     component: path.resolve("./src/templates/News/News.tsx"),
  //     context: {
  //       // additional data can be passed via context
  //       content: node.content,
  //       title: node.title,
  //       pubDate: node.pubDate,
  //       link: node.link,
  //       imageUrl: node.enclosure.url,
  //     },
  //   });
  // });
};
