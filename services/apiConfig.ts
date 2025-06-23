export const API_CONFIG = {
  BASE_URL: 'https://v3.football.api-sports.io',
  API_KEY: process.env.EXPO_PUBLIC_API_FOOTBALL_KEY || 'YOUR_API_KEY_HERE',
  HOST: 'v3.football.api-sports.io',
};
/*export const API_CONFIG = {
  BASE_URL: 'https://api.sportmonks.com',
  API_KEY: process.env.EXPO_PUBLIC_API_FOOTBALL_KEY || 'YOUR_API_KEY_HERE',
  HOST: 'api.sportmonks.com',
};*/

export const API_ENDPOINTS = {
  COUNTRIES: '/countries',

  SEASONS: '/seasons',

  LEAGUES: '/leagues',

  TEAMS: '/teams',

  STANDINGS: '/standings',

  FIXTURES: '/fixtures',
  LIVE_FIXTURES: '/fixtures?live=all',

  EVENTS: '/fixtures/events',

  LINEUPS: '/fixtures/lineups',

  PLAYERS: '/players',
  TOP_SCORERS: '/players/topscorers',

  STATISTICS: '/fixtures/statistics',

  PREDICTIONS: '/predictions',

  ODDS: '/odds',
  LIVE_ODDS: '/odds/live',
};

export const getApiHeaders = () => ({
  'x-rapidapi-host': API_CONFIG.HOST,
  'x-rapidapi-key': API_CONFIG.API_KEY,
  'Content-Type': 'application/json',
});

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
