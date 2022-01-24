const fetch = require("node-fetch");
const storage = require("../storage");
const footballValue = require("../config");

const MATCHES_TIME_TO_LEAVE = 1 * 60 * 1000; // 1 minutes

exports.handler = async (event, context) => {
  try {
    const requestTimestamp = new Date().getTime();
    // const timeToLeaveMatchesCache = parseInt(storage.getItem("matchesExpires"));
    // if (requestTimestamp < timeToLeaveMatchesCache) {
    //   const matches = storage.getItem("matches");
    //   // console.log("reading from cache ...");
    //   return { statusCode: 200, body: JSON.stringify({ matches }) };
    // }

    const response = await fetch(
      footballValue.competitionsUrl + "/matches?competitions=SA",
      { headers: { "X-Auth-Token": footballValue.tokenApi } }
    );
    const data = await response.json();
    // console.log("reading from api ...");
    const matches = data.matches;
    // storage.setItem("matches", matches);
    const now = new Date().getTime();
    // storage.setItem("scorersExpires", now + MATCHES_TIME_TO_LEAVE);
    return { statusCode: 200, body: JSON.stringify({ matches }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
