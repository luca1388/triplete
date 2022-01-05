
const availableCompetitions = [ 'SA' ];
const baseUrl = 'https://api.football-data.org/v2/';
const tokenApi = process.env.API_TOKEN;

const competitionsUrl = baseUrl + 'competitions/';
const standingPath = '/standing/';

const matchStates = [
    'SCHEDULED',
    'LIVE',
    'IN_PLAY',
    'PAUSED',
    'FINISHED',
    'POSTPONED',
    'SUSPENDED',
    'CANCELED'
];

exports.tokenApi = tokenApi;
exports.competitions = availableCompetitions;
exports.baseUrl = baseUrl;
exports.competitionsUrl = competitionsUrl;
exports.standingPath = standingPath;
exports.matchStates = matchStates;