import { useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLeagues, useLiveMatches, useTeams } from '@/hooks/useFootballApi';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'matches' | 'leagues' | 'teams'>('matches');
  
  const { data: liveMatches, loading: liveLoading, error: liveError, refetch: refetchLive } = useLiveMatches();
  const { data: leagues, loading: leaguesLoading, error: leaguesError } = useLeagues();
  
  const teamParams = useMemo(() => ({ league: 39, season: 2023 }), []);
  const { data: teams, loading: teamsLoading, error: teamsError } = useTeams(teamParams);

  const onRefresh = () => {
    refetchLive();
  };

  const filteredMatches = liveMatches?.filter(match => 
    (match.teams.home.name && match.teams.home.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (match.teams.away.name && match.teams.away.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (match.league.name && match.league.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const filteredLeagues = leagues?.filter(league => 
    (league.name && league.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (league.country.name && league.country.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const filteredTeams = teams?.filter(team => 
    (team.name && team.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (team.country && team.country.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Search Football</ThemedText>
        
        {!liveMatches && !liveLoading && (
          <ThemedView style={styles.apiWarningContainer}>
            <ThemedText style={styles.apiWarningText}>
              ⚠️ API key required to see real data. Check .env file.
            </ThemedText>
          </ThemedView>
        )}
        
        <ThemedView style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search matches, leagues, teams..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'matches' && styles.activeTab]}
          onPress={() => setActiveTab('matches')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'matches' && styles.activeTabText]}>
            Live Matches
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'leagues' && styles.activeTab]}
          onPress={() => setActiveTab('leagues')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'leagues' && styles.activeTabText]}>
            Leagues
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'teams' && styles.activeTab]}
          onPress={() => setActiveTab('teams')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'teams' && styles.activeTabText]}>
            Teams
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={liveLoading} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'matches' && (
          <ThemedView>
            {liveError && (
              <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>Error: {liveError}</ThemedText>
              </ThemedView>
            )}
            {liveLoading ? (
              <ThemedView style={styles.loadingContainer}>
                <ThemedText>Loading live matches...</ThemedText>
              </ThemedView>
            ) : filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <ThemedView key={match.fixture.id} style={styles.matchCard}>
                  <ThemedView style={styles.matchHeader}>
                    <ThemedText style={styles.leagueName}>{match.league.name}</ThemedText>
                    <ThemedView style={styles.matchStatus}>
                      <ThemedText style={styles.liveIndicator}>LIVE</ThemedText>
                      <ThemedText style={styles.matchTime}>
                        {match.fixture.status.elapsed}&apos;
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                  
                  <ThemedView style={styles.matchTeams}>
                    <ThemedView style={styles.team}>
                      <ThemedText type="defaultSemiBold">{match.teams.home.name}</ThemedText>
                      <ThemedText style={styles.score}>{match.goals.home ?? 0}</ThemedText>
                    </ThemedView>
                    <ThemedText style={styles.vs}>vs</ThemedText>
                    <ThemedView style={styles.team}>
                      <ThemedText style={styles.score}>{match.goals.away ?? 0}</ThemedText>
                      <ThemedText type="defaultSemiBold">{match.teams.away.name}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              ))
            ) : (
              <ThemedView style={styles.noDataContainer}>
                <ThemedText>No live matches found</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}

        {activeTab === 'leagues' && (
          <ThemedView>
            {leaguesError && (
              <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>Error: {leaguesError}</ThemedText>
              </ThemedView>
            )}
            {leaguesLoading ? (
              <ThemedView style={styles.loadingContainer}>
                <ThemedText>Loading leagues...</ThemedText>
              </ThemedView>
            ) : filteredLeagues.length > 0 ? (
              filteredLeagues.map((league) => (
                <ThemedView key={league.id} style={styles.leagueCard}>
                  <ThemedView style={styles.leagueInfo}>
                    <ThemedText type="defaultSemiBold">{league.name}</ThemedText>
                    <ThemedText style={styles.countryName}>{league.country.name}</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.leagueDetails}>
                    <ThemedText style={styles.seasonText}>Season: {league.season}</ThemedText>
                    <ThemedText style={styles.typeText}>{league.type}</ThemedText>
                  </ThemedView>
                </ThemedView>
              ))
            ) : (
              <ThemedView style={styles.noDataContainer}>
                <ThemedText>No leagues found</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}

        {activeTab === 'teams' && (
          <ThemedView>
            {teamsError && (
              <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>Error: {teamsError}</ThemedText>
              </ThemedView>
            )}
            {teamsLoading ? (
              <ThemedView style={styles.loadingContainer}>
                <ThemedText>Loading teams...</ThemedText>
              </ThemedView>
            ) : filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <ThemedView key={team.id} style={styles.teamCard}>
                  <ThemedView style={styles.teamInfo}>
                    <ThemedText type="defaultSemiBold">{team.name}</ThemedText>
                    <ThemedText style={styles.countryName}>{team.country}</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.teamDetails}>
                    <ThemedText style={styles.foundedText}>Founded: {team.founded}</ThemedText>
                    <ThemedText style={styles.codeText}>Code: {team.code}</ThemedText>
                  </ThemedView>
                </ThemedView>
              ))
            ) : (
              <ThemedView style={styles.noDataContainer}>
                <ThemedText>No teams found</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  matchCard: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leagueName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  matchStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicator: {
    backgroundColor: '#dc3545',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  matchTime: {
    color: '#666',
    fontSize: 12,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  vs: {
    color: '#666',
    fontSize: 14,
    marginHorizontal: 16,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
  },
  leagueCard: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  leagueInfo: {
    marginBottom: 8,
  },
  countryName: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  leagueDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seasonText: {
    color: '#666',
    fontSize: 12,
  },
  typeText: {
    color: '#666',
    fontSize: 12,
  },
  teamCard: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  teamInfo: {
    marginBottom: 8,
  },
  teamDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foundedText: {
    color: '#666',
    fontSize: 12,
  },
  codeText: {
    color: '#666',
    fontSize: 12,
  },
  apiWarningContainer: {
    padding: 16,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    marginBottom: 16,
  },
  apiWarningText: {
    color: '#721c24',
    textAlign: 'center',
  },
});
