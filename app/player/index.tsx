import { PlayerCard } from '@/components/PlayerCard';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function AllPlayersScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const API_TOKEN = 'gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw';
        const url = `https://api.sportmonks.com/v3/football/players?api_token=${API_TOKEN}&per_page=50`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch players');
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
          setError('No players found');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text>Loading players...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Players</Text>
      <Text style={styles.subtitle}>Players with the most significant changes in Legacy Value over the past month, based on recent performances and achievements.</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/player/[id]', params: { id: item.id.toString() } })}>
            <PlayerCard player={item} type="trending" />
          </TouchableOpacity>
        )}
        numColumns={1}
        ListEmptyComponent={<Text>No players found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginLeft: 20,
    marginBottom: 18,
    marginRight: 20,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
}); 