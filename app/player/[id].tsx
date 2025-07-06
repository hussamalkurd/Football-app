import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

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
  nationality?: string;
  status?: string;
  dob?: string;
  height?: string;
  position?: string;
  foot?: string;
  contract?: string;
  achievements?: string[];
  highlights?: string[];
}

const placeholderImage = 'https://ui-avatars.com/api/?name=Player&background=4A90E2&color=fff&size=256';

export default function PlayerDetails() {
  const { id } = useLocalSearchParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const API_TOKEN = 'gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw';
        const url = `https://api.sportmonks.com/v3/football/players/${id}?api_token=${API_TOKEN}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch player');
        }
        const data = await response.json();
        if (data.data) {
          const p = data.data;
          setPlayer({
            id: p.id,
            name: p.display_name || p.firstname + ' ' + p.lastname,
            team: 'Unknown Team',
            marketValue: '€' + Math.floor(Math.random() * 200 + 10) + 'M',
            legacyValue: '€' + Math.floor(Math.random() * 300 + 50) + 'M',
            followers: Math.floor(Math.random() * 100 + 1) + 'M',
            posts: Math.floor(Math.random() * 1000 + 100) + 'M',
            change: '+' + Math.floor(Math.random() * 30 + 5) + '%',
            rank: Math.floor(Math.random() * 10 + 1),
            image: p.image_path || '',
            nationality: p.nationality || 'Argentina',
            status: 'Active Legend',
            dob: p.date_of_birth || 'June 24, 1987 (37)',
            height: p.height ? `${p.height} cm` : '170 cm',
            position: p.position || 'Right Winger',
            foot: p.foot || 'Left',
            contract: 'Until Dec 31, 2025',
            achievements: [
              '8× Ballon d\'Or',
              'FIFA World Cup Winner (2022)',
              'Copa América (2021, 2024)',
              '4× Champions League',
              '11× La Liga',
              '7× Copa del Rey',
              'Ligue 1 (2021-22, 2022-23)',
              'Leagues Cup (2023)',
            ],
            highlights: [
              'Record 8 Ballon d\'Or wins',
              'FIFA World Cup winner (2022)',
              'Barcelona\'s all-time leading scorer',
              'Most assists in football history',
            ],
          });
        } else {
          setError('Player not found');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text>Loading player...</Text>
      </View>
    );
  }

  if (error || !player) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error || 'Player not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.headerCard}>
        <Image
          source={{ uri: player.image || placeholderImage }}
          style={styles.avatar}
        />
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerTeam}>{player.team}</Text>
        <View style={styles.nationalityRow}>
          <Text style={styles.nationality}>{player.nationality}</Text>
          <Text style={styles.status}>{player.status}</Text>
        </View>
      </View>


      <View style={styles.valueCard}>
        <View style={styles.valueBoxBig}>
          <Text style={styles.valueLabelBig}>Market Value</Text>
          <Text style={styles.valueBig}>{player.marketValue}</Text>
        </View>
        <View style={styles.valueBoxBig}>
          <Text style={styles.valueLabelBig}>Legacy Value</Text>
          <Text style={styles.valueBig}>{player.legacyValue}</Text>
        </View>
      </View>


      <View style={styles.infoRow}>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>DOB</Text><Text style={styles.infoValue}>{player.dob}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>Height</Text><Text style={styles.infoValue}>{player.height}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>Position</Text><Text style={styles.infoValue}>{player.position}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>Foot</Text><Text style={styles.infoValue}>{player.foot}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>Contract</Text><Text style={styles.infoValue}>{player.contract}</Text></View>
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {player.achievements?.map((ach, idx) => (
          <Text key={idx} style={styles.sectionItem}>• {ach}</Text>
        ))}
      </View>

      {/* Career Highlights Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Highlights</Text>
        {player.highlights?.map((hl, idx) => (
          <Text key={idx} style={styles.sectionItem}>• {hl}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  headerCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 24,
    marginBottom: 12,
    paddingVertical: 28,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#3b82f6',
    backgroundColor: '#e5e7eb',
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  playerTeam: {
    fontSize: 18,
    color: '#3b82f6',
    marginBottom: 2,
  },
  nationalityRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  nationality: {
    fontSize: 15,
    color: '#374151',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  status: {
    fontSize: 15,
    color: '#10b981',
    backgroundColor: '#e0f7ef',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  valueCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  valueBoxBig: {
    flex: 1,
    alignItems: 'center',
  },
  valueLabelBig: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 2,
  },
  valueBig: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  infoItem: {
    flexBasis: '18%',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sectionItem: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 6,
  },
}); 