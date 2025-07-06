import { ApiError, footballApi } from '@/services/footballApi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
}

function useApiCall<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const apiCallRef = useRef(apiCall);
  apiCallRef.current = apiCall;

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await apiCallRef.current();


      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : 'An unexpected error occurred';
      console.error(errorMessage);
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}

export const useLiveMatches = () => {
  return useApiCall(() => footballApi.getLiveMatches());
};

export const useLeagues = (params?: {
  country?: string;
  season?: number;
  type?: string;
}) => {
  const stableParams = useMemo(() => params, [
    params?.country,
    params?.season,
    params?.type,
  ]);

  return useApiCall(() => footballApi.getLeagues(stableParams), [
    stableParams?.country,
    stableParams?.season,
    stableParams?.type,
  ]);
};

export const useTeams = (params?: { league?: number; season?: number; country?: string }) => {
  const stableParams = useMemo(() => params, [
    params?.league,
    params?.season,
    params?.country,
  ]);

  return useApiCall(() => footballApi.getTeams(stableParams), [
    stableParams?.league,
    stableParams?.season,
    stableParams?.country,
  ]);
};

export const usePlayers = (params?: {
  team?: number;
  league?: number;
  season?: number;
  search?: string;
}) => {
  const stableParams = useMemo(() => params, [
    params?.team,
    params?.league,
    params?.season,
    params?.search,
  ]);

  return useApiCall(() => footballApi.getPlayers(stableParams), [
    stableParams?.team,
    stableParams?.league,
    stableParams?.season,
    stableParams?.search,
  ]);
};

export const useTopScorers = (leagueId: number, season: number) => {
  return useApiCall(() => footballApi.getTopScorers(leagueId, season), [leagueId, season]);
};















