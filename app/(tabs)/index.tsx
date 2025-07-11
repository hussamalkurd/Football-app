import { PlayerCard } from '@/components/PlayerCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Player {
  id: number;
  name: string;
  team: string;
  marketValue?: string;
  legacyValue?: string;
  followers?: string;
  posts?: string;
  change?: string;
  rank?: number;
  image?: string;
}

export default function HomeScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();



  const fetchPlayers = async () => {
    try {
      
      const API_TOKEN = 'gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw';
      

      const url = `https://api.sportmonks.com/v3/football/players?api_token=${API_TOKEN}&per_page=20`;
      

      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      
      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      
      
      if (data.data && Array.isArray(data.data)) {

        const convertedPlayers: Player[] = data.data.map((player: any) => ({
          id: player.id,
          name: player.display_name || player.firstname + ' ' + player.lastname,
          team: 'Unknown Team', 
          marketValue: '€' + Math.floor(Math.random() * 200 + 10) + 'M',
          legacyValue: '€' + Math.floor(Math.random() * 300 + 50) + 'M',
          followers: Math.floor(Math.random() * 100 + 1) + 'M',
          posts: Math.floor(Math.random() * 1000 + 100) + 'M',
          change: '+' + Math.floor(Math.random() * 30 + 5) + '%',
          rank: Math.floor(Math.random() * 10 + 1),
        }));
        

        setPlayers(convertedPlayers);

      } else {

        throw new Error('No data array in API response');
      }
    } catch (error) {
      console.error(error);

      const mockPlayers: Player[] = [
        {
          id: 1,
          name: 'Lionel Messi',
          team: 'Inter Miami',
          marketValue: '€25M',
          legacyValue: '€250M',
          followers: '52.3M',
          posts: '493M',
        },
        {
          id: 2,
          name: 'Cristiano Ronaldo',
          team: 'Al Nassr',
          marketValue: '€15M',
          legacyValue: '€230M',
          followers: '108M',
          posts: '605M',
        },
        {
          id: 3,
          name: 'Kylian Mbappé',
          team: 'Real Madrid',
          marketValue: '€180M',
          legacyValue: '€200M',
          followers: '8.2M',
          posts: '112M',
        },
        {
          id: 4,
          name: 'Erling Haaland',
          team: 'Manchester City',
          marketValue: '€170M',
          legacyValue: '€180M',
          followers: '3.1M',
          posts: '35M',
        },
        {
          id: 5,
          name: 'Jude Bellingham',
          team: 'Real Madrid',
          marketValue: '€150M',
          legacyValue: '€155M',
          followers: '2.8M',
          posts: '21M',
          change: '+25%',
        },
        {
          id: 6,
          name: 'Pelé',
          team: 'Retired',
          legacyValue: '€300M',
          rank: 1,
        },
        {
          id: 7,
          name: 'Diego Maradona',
          team: 'Retired',
          legacyValue: '€280M',
          rank: 2,
        },
      ];

      setPlayers(mockPlayers);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPlayers();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const featuredPlayers = players.slice(0, 4);
  const trendingPlayers = players.slice(0, 3);
  const legacyPlayers = players.slice(0, 3);
  const playerOfWeek = players[0];



  const SectionHeader = ({ title, onViewAll }: { title: string; onViewAll?: () => void }) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText type="title" style={styles.sectionTitle}>{title}</ThemedText>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll}>
          <ThemedText style={styles.viewAllText}>View all</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Loading players...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >

      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>True Value Football</ThemedText>
      </ThemedView>


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
        <SectionHeader title="Player of the Week" onViewAll={() => {}} />
        {playerOfWeek ? (
          <PlayerCard 
            player={playerOfWeek} 
            type="playerOfWeek" 
            onPress={() => router.push({ pathname: '/player/[id]', params: { id: playerOfWeek.id.toString() } })}
          />
        ) : (
          <ThemedText>No player of the week available</ThemedText>
        )}
      </ThemedView>


      <ThemedView style={styles.section}>
        <SectionHeader title="Featured Players" onViewAll={() => router.push('/player')} />
        {featuredPlayers.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                type="featured"
                onPress={() => router.push({ pathname: '/player/[id]', params: { id: player.id.toString() } })}
              />
            ))}
          </ScrollView>
        ) : (
          <ThemedText>No featured players available</ThemedText>
        )}
      </ThemedView>


      <ThemedView style={styles.section}>
        <SectionHeader title="Trending Players" onViewAll={() => router.push('/player')} />
        {trendingPlayers.length > 0 ? (
          <ThemedView style={styles.verticalList}>
            {trendingPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                type="trending"
                onPress={() => router.push({ pathname: '/player/[id]', params: { id: player.id.toString() } })}
              />
            ))}
          </ThemedView>
        ) : (
          <ThemedText>No trending players available</ThemedText>
        )}
      </ThemedView>


      <ThemedView style={styles.section}>
        <SectionHeader title="Legacy Rankings" onViewAll={() => router.push('/player')} />
        {legacyPlayers.length > 0 ? (
          <ThemedView style={styles.verticalList}>
            {legacyPlayers.map((player, index) => (
              <PlayerCard
                key={player.id}
                player={{ ...player, rank: index + 1 }}
                type="legacy"
                onPress={() => router.push({ pathname: '/player/[id]', params: { id: player.id.toString() } })}
              />
            ))}
          </ThemedView>
        ) : (
          <ThemedText>No legacy players available</ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  navTabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  verticalList: {
    gap: 8,
  },
});
