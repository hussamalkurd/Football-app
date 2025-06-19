import { router } from 'expo-router';

import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { PlayerCard } from '@/components/PlayerCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLiveMatches, useTopScorers } from '@/hooks/useFootballApi';

export default function HomeScreen() {
  const { data: liveMatches, loading: liveLoading, error: liveError } = useLiveMatches();
  const { data: topScorers, loading: scorersLoading } = useTopScorers(39, 2023);

  
  console.log('topScorers',topScorers)
  

  const navigateToPlayer = (playerId: number, playerName: string) => {
    router.push(`/Player-Profile?id=${playerId}&name=${encodeURIComponent(playerName)}`);
  };

  const featuredPlayers = topScorers?.slice(0, 4).map((scorer, index) => ({
    id: scorer.player.id,
    name: scorer.player.name,
    team: scorer.statistics[0]?.team?.name || 'Unknown Team',
    marketValue: '€' + Math.floor(Math.random() * 200 + 50) + 'M',
    legacyValue: '€' + Math.floor(Math.random() * 300 + 100) + 'M',
    followers: Math.floor(Math.random() * 100 + 10) + 'M',
    posts: Math.floor(Math.random() * 500 + 100) + 'M',
    image: `https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=${scorer.player.name.split(' ').map(n => n[0]).join('')}`
  })) || [];

  const trendingPlayers = topScorers?.slice(0, 3).map((scorer, index) => ({
    id: scorer.player.id,
    name: scorer.player.name,
    team: scorer.statistics[0]?.team?.name || 'Unknown Team',
    change: '+' + Math.floor(Math.random() * 30 + 10) + '%',
    legacyValue: '€' + Math.floor(Math.random() * 200 + 100) + 'M',
    followers: Math.floor(Math.random() * 50 + 5) + 'M',
    posts: Math.floor(Math.random() * 200 + 50) + 'M'
  })) || [];

  const playerOfWeek = topScorers?.[0] ? {
    id: topScorers[0].player.id,
    name: topScorers[0].player.name,
    team: topScorers[0].statistics[0]?.team?.name || 'Unknown Team',
    legacyValue: '€' + Math.floor(Math.random() * 200 + 100) + 'M',
    change: '+' + Math.floor(Math.random() * 30 + 10) + '%'
  } : {
    id: 1,
    name: 'Loading...',
    team: 'Loading...',
    legacyValue: '€0M',
    change: '+0%'
  };

  const legacyRankings = [
    { id: 1, rank: 1, name: 'Pelé', team: 'Retired', legacyValue: '€300M' },
    { id: 2, rank: 2, name: 'Diego Maradona', team: 'Retired', legacyValue: '€280M' },
    { id: 3, rank: 3, name: 'Lionel Messi', team: 'Inter Miami', legacyValue: '€250M' }
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1a1a1a', dark: '#000000' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#4A90E2"
          name="sportscourt.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.mainTitle}>True Value Football</ThemedText>
      </ThemedView>

      {!topScorers && !scorersLoading && (
        <ThemedView style={styles.apiWarningContainer}>
          <ThemedText style={styles.apiWarningTitle}>🚨 API Key Required</ThemedText>
          <ThemedText style={styles.apiWarningText}>
            To see real football data, you need to configure your API key:
          </ThemedText>
          <ThemedText style={styles.apiWarningSteps}>
            1. Get your free API key from api-football.com{'\n'}
            2. Edit the .env file in your project{'\n'}
            3. Replace &quot;your_api_key_here&quot; with your key{'\n'}
            4. Restart the app
          </ThemedText>
          <TouchableOpacity style={styles.apiWarningButton}>
            <ThemedText style={styles.apiWarningButtonText}>View Setup Guide</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      <ThemedView style={styles.navTabs}>
        <TouchableOpacity style={styles.navTab}>
          <ThemedText style={styles.navTabText}>Featured</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <ThemedText style={styles.navTabText}>Top Talents</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <ThemedText style={styles.navTabText}>Legends</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <ThemedText style={styles.navTabText}>Top Stars</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Player of the Week</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.viewAllText}>View all</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {scorersLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Loading Player of the Week...</ThemedText>
          </ThemedView>
        ) : topScorers && topScorers.length > 0 ? (
          <PlayerCard 
            player={playerOfWeek} 
            type="playerOfWeek" 
            onPress={() => navigateToPlayer(playerOfWeek.id, playerOfWeek.name)}
          />
        ) : (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>No player data available</ThemedText>
            <ThemedText style={styles.errorSubtext}>
              Please check your API key in the .env file
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Players</ThemedText>
        </ThemedView>
        
        {scorersLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Loading featured players...</ThemedText>
          </ThemedView>
        ) : topScorers && topScorers.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredPlayers.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                type="featured" 
                onPress={() => navigateToPlayer(player.id, player.name)}
              />
            ))}
          </ScrollView>
        ) : (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>No featured players available</ThemedText>
            <ThemedText style={styles.errorSubtext}>
              API key may be missing or invalid
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Trending Players</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.viewAllText}>View all</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {scorersLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Loading trending players...</ThemedText>
          </ThemedView>
        ) : topScorers && topScorers.length > 0 ? (
          trendingPlayers.map((player) => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              type="trending" 
              onPress={() => navigateToPlayer(player.id, player.name)}
            />
          ))
        ) : (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>No trending players available</ThemedText>
            <ThemedText style={styles.errorSubtext}>
              Get your API key from api-football.com
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Legacy Rankings</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.viewAllText}>View all</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {legacyRankings.map((player) => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            type="legacy" 
            onPress={() => navigateToPlayer(player.id, player.name)}
          />
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Live Matches</ThemedText>
        {liveError && (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>Error loading live matches: {liveError}</ThemedText>
          </ThemedView>
        )}
        {liveLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Loading live matches...</ThemedText>
          </ThemedView>
        ) : liveMatches && liveMatches.length > 0 ? (
          liveMatches.slice(0, 3).map((match) => (
            <ThemedView key={match.fixture.id} style={styles.liveMatchCard}>
              <ThemedView style={styles.matchInfo}>
                <ThemedText type="defaultSemiBold">{match.teams.home.name}</ThemedText>
                <ThemedText type="defaultSemiBold">
                  {match.goals.home ?? 0} - {match.goals.away ?? 0}
                </ThemedText>
                <ThemedText type="defaultSemiBold">{match.teams.away.name}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.matchStatus}>
                <ThemedText style={styles.liveText}>LIVE</ThemedText>
                <ThemedText>{match.fixture.status.elapsed}&apos;</ThemedText>
              </ThemedView>
              <ThemedText style={styles.leagueText}>{match.league.name}</ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.noDataContainer}>
            <ThemedText>No live matches at the moment</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  headerImage: {
    color: '#4A90E2',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  navTabs: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  navTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  navTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    gap: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginHorizontal: -16,
  },
  liveMatchCard: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffeaa7',
    marginBottom: 8,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  matchStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  liveText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  leagueText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5c6cb',
  },
  errorText: {
    color: '#721c24',
  },
  errorSubtext: {
    color: '#6c757d',
    fontSize: 12,
    marginTop: 4,
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
  },
  apiWarningContainer: {
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
    marginBottom: 20,
  },
  apiWarningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 8,
  },
  apiWarningText: {
    fontSize: 14,
    color: '#333',
  },
  apiWarningSteps: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 16,
  },
  apiWarningButton: {
    padding: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  apiWarningButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
