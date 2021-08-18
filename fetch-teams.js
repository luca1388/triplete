const axios = require("axios").default;
const fs = require("fs");
const dotenv = require("dotenv");
const slugify = require("./src/utils/stringUtils").slugify;

dotenv.config();

const fetchTeams = async () =>
  axios.get("https://api.football-data.org/v2/competitions/SA/teams", {
    headers: { "X-Auth-Token": process.env.API_TOKEN },
  });

const fetchTeam = async id =>
  axios.get(`https://api.football-data.org/v2/teams/${id}`, {
    headers: { "X-Auth-Token": process.env.API_TOKEN },
  });

const sliceLength = 5;
const waitTime = 32000;

const startFetchTeams = async teams => {
  let index = 0;
  const slice = teams.splice(index, sliceLength);
  if (slice.length) {
    await fetchNextTeamsSlice(slice);
    index += sliceLength;
    console.log("Waiting ...");
    setTimeout(() => {
      startFetchTeams(teams);
    }, waitTime);
  } else {
    console.log("Completed");
  }
};

const fetchNextTeamsSlice = async teams => {
  for (const team of teams) {
    console.log(`getting ${team.shortName}`);
    const teamDetail = (await fetchTeam(team.id)).data;
    teamDetail.slug = slugify(team.shortName);
    fs.writeFileSync(
      `./content/teams/${team.id}.json`,
      JSON.stringify(teamDetail)
    );
  }
};

const main = async () => {
  const teams = (await fetchTeams()).data.teams;
  startFetchTeams(teams);
};

main();
