/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios").default
const path = require("path")

require("dotenv").config({
  path: `.env`,
})

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Team`
const TABLE_POSITION_NODE_TYPE = `Position`
const MATCH_NODE_TYPE = `Match`
const SCORER_NODE_TYPE = "Scorer"

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const data = {}

  const fetchTeams = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/teams", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    })
  const fetchTable = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/standings", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    })
  const fetchSchedule = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/matches", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    })

  const fetchScorers = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/scorers", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    })

  data.teams = (await fetchTeams()).data.teams
  data.table = (await fetchTable()).data.standings[0].table
  data.schedule = (await fetchSchedule()).data.matches
  data.scorers = (await fetchScorers()).data.scorers

  //   {
  //     "player": {
  //       "id": 11688,
  //       "name": "Zlatan Ibrahimovic",
  //       "firstName": "Zlatan",
  //       "lastName": null,
  //       "dateOfBirth": "1981-10-03",
  //       "countryOfBirth": "Sweden",
  //       "nationality": "Sweden",
  //       "position": "Attacker",
  //       "shirtNumber": null,
  //       "lastUpdated": "2020-11-26T02:19:29Z"
  //     },
  //     "team": {
  //       "id": 98,
  //       "name": "AC Milan"
  //     },
  //     "numberOfGoals": 10
  //   },

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
    })
  })

  // joining table data with teams to get all needed fields
  data.table = data.table.map(tableEntry => ({
    ...tableEntry,
    ["team"]: { ...data.teams.find(team => team.id === tableEntry.team.id) },
  }))

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
  )

  // joining schedule data with teams to get all needed fields
  data.schedule = data.schedule.map(match => {
    const homeTeam = data.teams.find(team => team.id === match.homeTeam.id)
    const awayTeam = data.teams.find(team => team.id === match.awayTeam.id)

    return {
      ...match,
      ["homeTeam"]: homeTeam,
      ["awayTeam"]: awayTeam,
    }
  })

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
    })
  })

  // joining table data with teams to get all needed fields
  data.scorers = data.scorers.map(scorer => ({
    ...scorer,
    ["team"]: { ...data.teams.find(team => team.id === scorer.team.id) },
  }))

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
    })
  })
  return
}

exports.onCreateNode = ({ node, getNode, actions }) => {}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions


//   const scheduleResult = await graphql(`
//     {
//       allMatch {
//         totalCount
//         edges {
//           node {
//             id
//             score {
//               fullTime {
//                 homeTeam
//                 awayTeam
//               }
//             }
//             homeTeam {
//               name
//               shortName
//               id
//               crestUrl
//             }
//             awayTeam {
//               name
//               shortName
//               id
//               crestUrl
//             }
//           }
//         }
//       }
//     }
//   `)

//   const teams = await graphql(`
//     {
//       allTeam {
//         edges {
//           node {
//             id
//             teamId
//           }
//         }
//       }
//     }
//   `)

//   teams.data.allTeam.edges.forEach(teamEdge => {
//     const searchedTeamId = teamEdge.node.teamId

//     let searchedTeamMatches = scheduleResult.data.allMatch.edges.filter(
//       scheduleEdge => {
//         return (
//           scheduleEdge.node.homeTeam.id === searchedTeamId ||
//           scheduleEdge.node.awayTeam.id === searchedTeamId
//         )
//       }
//     )
//     const searchedTeam =
//       searchedTeamMatches[0].node.homeTeam.id === searchedTeamId
//         ? searchedTeamMatches[0].node.homeTeam
//         : searchedTeamMatches[0].node.awayTeam

//     searchedTeamMatches = searchedTeamMatches.map(match => ({
//       ...match,
//       teamId: searchedTeamId,
//       teamName: searchedTeam.name,
//     }))

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
}
