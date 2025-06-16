// API-Football Configuration
export const API_CONFIG = {
  BASE_URL: 'https://v3.football.api-sports.io',
  // You'll need to get your API key from https://dashboard.api-football.com/
  API_KEY: process.env.EXPO_PUBLIC_API_FOOTBALL_KEY || 'YOUR_API_KEY_HERE',
  HOST: 'v3.football.api-sports.io',
};

export const API_ENDPOINTS = {
  // Countries
  COUNTRIES: '/countries',
  
  // Seasons
  SEASONS: '/seasons',
  
  // Leagues
  LEAGUES: '/leagues',
  
  // Teams
  TEAMS: '/teams',
  
  // Standings
  STANDINGS: '/standings',
  
  // Fixtures
  FIXTURES: '/fixtures',
  LIVE_FIXTURES: '/fixtures?live=all',
  
  // Events
  EVENTS: '/fixtures/events',
  
  // Line-ups
  LINEUPS: '/fixtures/lineups',
  
  // Players
  PLAYERS: '/players',
  TOP_SCORERS: '/players/topscorers',
  
  // Statistics
  STATISTICS: '/fixtures/statistics',
  
  // Predictions
  PREDICTIONS: '/predictions',
  
  // Odds
  ODDS: '/odds',
  LIVE_ODDS: '/odds/live',
};

// API Headers
export const getApiHeaders = () => ({
  'x-rapidapi-host': API_CONFIG.HOST,
  'x-rapidapi-key': API_CONFIG.API_KEY,
  'Content-Type': 'application/json',
});

// Error handling
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