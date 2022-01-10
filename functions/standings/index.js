const fetch = require("node-fetch");
const storage = require("../storage");
const footballValue = require("../config");

const STANDINGS_TIME_TO_LEAVE = 10 * 60 * 1000; // 5 minutes

exports.handler = async (event, context) => {
  try {
    const requestTimestamp = new Date().getTime();
    const timeToLeaveScorersCache = parseInt(storage.getItem("standingsExpires"));
    if (requestTimestamp < timeToLeaveScorersCache) {
      const standings = storage.getItem("standings");
      // console.log("reading from cache ...");
      return { statusCode: 200, body: JSON.stringify({ standings }) };
    }

    const response = await fetch(
      footballValue.competitionsUrl + "/SA/standings",
      { headers: { "X-Auth-Token": footballValue.tokenApi } }
    );
    const data = await response.json();
    // console.log("reading from api ...");
    storage.setItem("standings", data.standings[0].table);
    const now = new Date().getTime();
    storage.setItem("scorersExpires", now + STANDINGS_TIME_TO_LEAVE);
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
