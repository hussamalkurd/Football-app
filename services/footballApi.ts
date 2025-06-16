import { API_CONFIG, API_ENDPOINTS, ApiError, getApiHeaders } from './apiConfig';

export { ApiError } from './apiConfig';

export interface ApiResponse<T> {
  get: string;
  parameters: any;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: Country;
  flag: string;
  season: number;
  round: string;
}

export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number | null;
    name: string | null;
    city: string | null;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface Score {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals;
  penalty: Goals;
}

export interface Match {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: Goals;
  score: Score;
}

export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: Country;
  height: string | null;
  weight: string | null;
  injured: boolean;
  photo: string;
}

export interface TopScorer {
  player: Player;
  statistics: {
    team: Team;
    league: League;
    games: {
      appearances: number;
      lineups: number;
      minutes: number;
      number: number;
      position: string;
      rating: string;
      captain: boolean;
    };
    substitutes: {
      in: number;
      out: number;
      bench: number;
    };
    shots: {
      total: number;
      on: number;
    };
    goals: {
      total: number;
      conceded: number;
      assists: number;
      saves: number;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number;
      interceptions: number;
    };
    duels: {
      total: number;
      won: number;
    };
    dribbles: {
      attempts: number;
      success: number;
      past: number;
    };
    fouls: {
      drawn: number;
      committed: number;
    };
    cards: {
      yellow: number;
      red: number;
    };
    penalty: {
      won: number;
      committed: number;
      scored: number;
      missed: number;
      saved: number;
    };
  }[];
}

async function makeApiRequest<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  try {
    const url = new URL(API_CONFIG.BASE_URL + endpoint);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data: ApiResponse<T> = await response.json();
    
    if (data.errors && data.errors.length > 0) {
      throw new ApiError(`API errors: ${JSON.stringify(data.errors)}`);
    }

    return data.response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const footballApi = {
  getLiveMatches: () => makeApiRequest<Match[]>(API_ENDPOINTS.LIVE_FIXTURES),

  getLeagues: (params?: {
    country?: string;
    season?: number;
    type?: string;
  }) => makeApiRequest<League[]>(API_ENDPOINTS.LEAGUES, params),

  getTeams: (params?: {
    league?: number;
    season?: number;
    country?: string;
  }) => makeApiRequest<Team[]>(API_ENDPOINTS.TEAMS, params),

  getPlayers: (params?: {
    team?: number;
    league?: number;
    season?: number;
    search?: string;
  }) => makeApiRequest<Player[]>(API_ENDPOINTS.PLAYERS, params),

  getTopScorers: (leagueId: number, season: number) => 
    makeApiRequest<TopScorer[]>(API_ENDPOINTS.TOP_SCORERS, { league: leagueId, season }),
}; 