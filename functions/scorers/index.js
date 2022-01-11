const fetch = require("node-fetch");
const storage = require("../storage");
const footballValue = require("../config");

const SCORERS_TIME_TO_LEAVE = 10 * 60 * 1000; // 10 minutes

exports.handler = async (event, context) => {
  try {
    const requestTimestamp = new Date().getTime();
    const timeToLeaveScorersCache = parseInt(storage.getItem("scorersExpires"));
    if (requestTimestamp < timeToLeaveScorersCache) {
      const scorers = storage.getItem("scorers");
      // console.log("reading from cache ...");
      return { statusCode: 200, body: JSON.stringify({ scorers }) };
    }

    const response = await fetch(
      footballValue.competitionsUrl + "/SA/scorers?limit=80",
      { headers: { "X-Auth-Token": footballValue.tokenApi } }
    );
    const data = await response.json();
    // console.log("reading from api ...");
    console.log(data);
    storage.setItem("scorers", data.scorers);
    const now = new Date().getTime();
    storage.setItem("scorersExpires", now + SCORERS_TIME_TO_LEAVE);
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
