const SPORTMONKS_API_TOKEN = 'milN02rshqDpqZh1VPCltqO5Nx5DoMv1pecBZlhQcFZUMPb5VOSrrJaExN11';
const BASE_URL = 'https://api.sportmonks.com/v3/football';

export class ApiError extends Error {
    status?: number;
    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export interface ApiResponse<T> {
    data: T;
    meta: any;
}

export interface Player {
    id: number;
    firstname: string;
    lastname: string;
    display_name: string;
    image_path: string;
    date_of_birth: string;
    gender: string;
    nationality: string;
    position_id: number;
    team_id: number;

}

function getApiHeaders(): HeadersInit {
    return {
        Accept: 'application/json',
        Authorization: `Bearer ${SPORTMONKS_API_TOKEN}`,
    };
}

async function makeApiRequest<T>(
    endpoint: string,
    params?: Record<string, any>
): Promise<T> {
    try {
        const url = new URL(`${BASE_URL}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        const res = await fetch(url.toString(), {
            method: 'GET',
            headers: getApiHeaders(),
        });

        if (!res.ok) {
            throw new ApiError(`Request failed with status ${res.status}`, res.status);
        }

        const data: ApiResponse<T> = await res.json();
        return data.data;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError((err as Error).message);
    }
}

export const sportmonksApi = {
    getPlayers: (params?: { team_id?: number; search?: string }) =>
        makeApiRequest<Player[]>('/players', params),
};
