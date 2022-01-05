const fetch = require("node-fetch");
const storage = require("../storage");
const footballValue = require("../config");

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts';

exports.handler = async (event, context) => {
  try {
    const response = await fetch(footballValue.competitionsUrl + "/SA/scorers?limit=80", { headers: {'X-Auth-Token': footballValue.tokenApi}});
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
          