import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

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
  twitter?: string;
}

const { width: screenWidth } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [trendingPlayers, setTrendingPlayers] = useState<Player[]>([]);
  const [risingStars, setRisingStars] = useState<Player[]>([]);
  const [globalIcons, setGlobalIcons] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchPlayers = async () => {
    try {
      const API_TOKEN = 'gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw';
      const url = `https://api.sportmonks.com/v3/football/players?api_token=${API_TOKEN}&per_page=30`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        const convertedPlayers: Player[] = data.data.map((player: any) => ({
          id: player.id,
          name: player.display_name || player.firstname + ' ' + player.lastname,
          team: 'Unknown Team',
          marketValue: '€' + Math.floor(Math.random() * 200 + 10) + 'M',
          legacyValue: '€' + Math.floor(Math.random() * 1000 + 100) + 'M',
          followers: Math.floor(Math.random() * 100 + 1) + 'M',
          posts: Math.floor(Math.random() * 1000 + 100) + 'M',
          change: '+' + Math.floor(Math.random() * 30 + 5) + '%',
          rank: Math.floor(Math.random() * 10 + 1),
          twitter: '@' + (player.firstname?.toLowerCase() || 'player'),
        }));
        
        setTrendingPlayers(convertedPlayers.slice(0, 6));
        setRisingStars(convertedPlayers.slice(6, 10));
        setGlobalIcons(convertedPlayers.slice(10, 14));
      } else {
        throw new Error('No data array in API response');
      }
    } catch (error) {
      console.error(error);

      const mockTrendingPlayers: Player[] = [
        {
          id: 1,
          name: 'Cristiano Ronaldo',
          team: 'Al Nassr',
          marketValue: '€15M',
          legacyValue: '€930M',
          twitter: '@cristiano',
        },
        {
          id: 2,
          name: 'Lionel Messi',
          team: 'Inter Miami',
          marketValue: '€25M',
          legacyValue: '€925M',
          twitter: '@leomessi',
        },
        {
          id: 3,
          name: 'Kylian Mbappé',
          team: 'Real Madrid',
          marketValue: '€180M',
          legacyValue: '€610M',
        },
        {
          id: 4,
          name: 'Erling Haaland',
          team: 'Manchester City',
          marketValue: '€170M',
          legacyValue: '€535M',
        },
        {
          id: 5,
          name: 'Hakan Çalhanoğlu',
          team: 'Inter Milan',
          marketValue: '€45M',
          legacyValue: '€0M',
        },
        {
          id: 6,
          name: 'Thomas Müller',
          team: 'Bayern Munich',
          marketValue: '€8M',
          legacyValue: '€0M',
        },
      ];

      const mockRisingStars: Player[] = [
        {
          id: 7,
          name: 'Hakan Çalhanoğlu',
          team: 'Inter Milan',
          marketValue: '€45M',
          legacyValue: '€0M',
          change: '+15%',
        },
        {
          id: 8,
          name: 'Erling Haaland',
          team: 'Manchester City',
          marketValue: '€170M',
          legacyValue: '€535M',
          change: '+15%',
        },
        {
          id: 9,
          name: 'Kylian Mbappé',
          team: 'Real Madrid',
          marketValue: '€180M',
          legacyValue: '€610M',
          change: '+15%',
        },
        {
          id: 10,
          name: 'Jude Bellingham',
          team: 'Real Madrid',
          marketValue: '€150M',
          legacyValue: '€395M',
          change: '+15%',
        },
      ];

      const mockGlobalIcons: Player[] = [
        {
          id: 11,
          name: 'Cristiano Ronaldo',
          team: 'Al Nassr',
          marketValue: '€15M',
          legacyValue: '€930M',
          twitter: '@cristiano',
        },
        {
          id: 12,
          name: 'Lionel Messi',
          team: 'Inter Miami',
          marketValue: '€25M',
          legacyValue: '€925M',
          twitter: '@leomessi',
        },
        {
          id: 13,
          name: 'Karim Benzema',
          team: 'Al-Ittihad',
          marketValue: '€20M',
          legacyValue: '€705M',
        },
        {
          id: 14,
          name: 'Luka Modrić',
          team: 'Real Madrid',
          marketValue: '€10M',
          legacyValue: '€695M',
        },
      ];

      setTrendingPlayers(mockTrendingPlayers);
      setRisingStars(mockRisingStars);
      setGlobalIcons(mockGlobalIcons);
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

  const SectionHeader = ({ title }: { title: string }) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText type="title" style={styles.sectionTitle}>{title}</ThemedText>
    </ThemedView>
  );

  const renderTrendingPlayerCard = (player: Player) => (
    <TouchableOpacity 
      style={styles.trendingCard} 
      onPress={() => router.push(`/player/${player.id}`)}
    >
      <ThemedView style={styles.trendingCardContent}>
        <ThemedView style={styles.playerHeader}>
          <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
          <ThemedText style={styles.playerTeam}>{player.team}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.valuesContainer}>
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>Market Value</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.marketValue}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>Legacy Value</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.legacyValue}</ThemedText>
          </ThemedView>
        </ThemedView>
        {player.twitter && (
          <ThemedText style={styles.twitterHandle}>{player.twitter}</ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderRisingStarCard = (player: Player) => (
    <TouchableOpacity 
      style={styles.risingStarCard} 
      onPress={() => router.push(`/player/${player.id}`)}
    >
      <ThemedView style={styles.risingStarContent}>
        <ThemedView style={styles.risingStarLeft}>
          <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
          <ThemedText style={styles.playerTeam}>{player.team}</ThemedText>
          <ThemedView style={styles.valuesContainer}>
            <ThemedView style={styles.valueRow}>
              <ThemedText style={styles.valueLabel}>Market Value</ThemedText>
              <ThemedText style={styles.valueAmount}>{player.marketValue}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.valueRow}>
              <ThemedText style={styles.valueLabel}>Legacy Value</ThemedText>
              <ThemedText style={styles.valueAmount}>{player.legacyValue}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        {player.change && (
          <ThemedView style={styles.changeContainer}>
            <ThemedText style={styles.changeValue}>{player.change}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderGlobalIconCard = (player: Player) => (
    <TouchableOpacity 
      style={styles.globalIconCard} 
      onPress={() => router.push(`/player/${player.id}`)}
    >
      <ThemedView style={styles.globalIconContent}>
        <ThemedView style={styles.playerHeader}>
          <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
          <ThemedText style={styles.playerTeam}>{player.team}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.valuesContainer}>
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>Market Value</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.marketValue}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>Legacy Value</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.legacyValue}</ThemedText>
          </ThemedView>
        </ThemedView>
        {player.twitter && (
          <ThemedText style={styles.twitterHandle}>{player.twitter}</ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
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
        <ThemedText type="title" style={styles.pageTitle}>Discover Players</ThemedText>
      </ThemedView>

      {/* Trending Players Section */}
      <SectionHeader title="Trending Players" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {trendingPlayers.map((player) => (
          <View key={player.id} style={styles.trendingCardContainer}>
            {renderTrendingPlayerCard(player)}
          </View>
        ))}
      </ScrollView>

      {/* Rising Stars Section */}
      <SectionHeader title="Rising Stars" />
      <ThemedView style={styles.verticalList}>
        {risingStars.map((player) => (
          <View key={player.id} style={styles.risingStarCardContainer}>
            {renderRisingStarCard(player)}
          </View>
        ))}
      </ThemedView>

      {/* Global Icons Section */}
      <SectionHeader title="Global Icons" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {globalIcons.map((player) => (
          <View key={player.id} style={styles.globalIconCardContainer}>
            {renderGlobalIconCard(player)}
          </View>
        ))}
      </ScrollView>
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
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionHeader: {
    padding: 20,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  verticalList: {
    paddingHorizontal: 20,
  },
  trendingCardContainer: {
    marginRight: 16,
  },
  risingStarCardContainer: {
    marginBottom: 12,
  },
  globalIconCardContainer: {
    marginRight: 16,
  },
  trendingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    minWidth: 220,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trendingCardContent: {
    gap: 12,
  },
  risingStarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  risingStarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  risingStarLeft: {
    flex: 1,
    gap: 8,
  },
  globalIconCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    minWidth: 220,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  globalIconContent: {
    gap: 12,
  },
  playerHeader: {
    gap: 4,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  playerTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  valuesContainer: {
    gap: 8,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  valueAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  twitterHandle: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  changeContainer: {
    backgroundColor: '#10b981',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
}); 