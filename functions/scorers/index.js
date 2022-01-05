const fetch = require("node-fetch");
const storage = require("../storage");
const footballValue = require("../config");

exports.handler = async (event, context) => {
  try {
    const cachedScorers = storage.getItem("scorers");
    console.log(cachedScorers);
    const response = await fetch(
      footballValue.competitionsUrl + "/SA/scorers?limit=80",
      { headers: { "X-Auth-Token": footballValue.tokenApi } }
    );
    const data = await response.json();
    storage.setItem("scorers", data);
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
