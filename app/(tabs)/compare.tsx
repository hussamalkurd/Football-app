import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Player {
  id: number;
  name: string;
  team: string;
  marketValue: string;
  legacyValue: string;
  followers: string;
  posts: string;
  image?: string;
  stats?: {
    goals: number;
    assists: number;
    appearances: number;
    trophies: number;
    rating: number;
  };
}

interface ComparePlayer extends Player {
  stats: {
    goals: number;
    assists: number;
    appearances: number;
    trophies: number;
    rating: number;
  };
}

const { width: screenWidth } = Dimensions.get('window');

export default function CompareScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [comparePlayers, setComparePlayers] = useState<ComparePlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Stats');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlayers = async () => {
    try {
      console.log('Fetching players for compare from SportMonks API...');
      
      const API_TOKEN = 'gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw';
      const url = `https://api.sportmonks.com/v3/football/players?api_token=${API_TOKEN}&per_page=50`;
      
      console.log('API URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response received successfully!');
      
      if (data.data && Array.isArray(data.data)) {
        console.log('Converting API data to players...');
        const convertedPlayers: Player[] = data.data.map((player: any) => ({
          id: player.id,
          name: player.display_name || player.firstname + ' ' + player.lastname,
          team: 'Unknown Team',
          marketValue: '€' + Math.floor(Math.random() * 200 + 10) + 'M',
          legacyValue: '€' + Math.floor(Math.random() * 300 + 50) + 'M',
          followers: Math.floor(Math.random() * 100 + 1) + 'M',
          posts: Math.floor(Math.random() * 1000 + 100) + 'M',
        }));
        
        console.log('Successfully converted players from API:', convertedPlayers);
        setPlayers(convertedPlayers);
        console.log('Players state updated with API data');
      } else {
        console.log('No data array found in API response');
        throw new Error('No data array in API response');
      }
    } catch (error) {
      console.error('Error fetching players from API:', error);
      setPlayers([]);
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

  const addPlayerToCompare = (player: Player) => {
    if (comparePlayers.length >= 2) {
      return; // Maximum 2 players
    }
    
    if (comparePlayers.find(p => p.id === player.id)) {
      return; // Player already added
    }

    const comparePlayer: ComparePlayer = {
      ...player,
      stats: {
        goals: Math.floor(Math.random() * 1000 + 100),
        assists: Math.floor(Math.random() * 300 + 50),
        appearances: Math.floor(Math.random() * 800 + 200),
        trophies: Math.floor(Math.random() * 50 + 10),
        rating: Math.floor(Math.random() * 20 + 80),
      }
    };
    
    setComparePlayers([...comparePlayers, comparePlayer]);
    setShowPlayerModal(false);
    setSearchQuery('');
  };

  const removePlayer = (playerId: number) => {
    setComparePlayers(comparePlayers.filter(player => player.id !== playerId));
  };

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !comparePlayers.find(p => p.id === player.id)
  );

  const renderTabButton = (title: string, isActive: boolean) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={() => setActiveTab(title)}
    >
      <ThemedText style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderPlayerCard = (player: ComparePlayer) => (
    <ThemedView key={player.id} style={styles.playerCard}>
      <ThemedView style={styles.playerHeader}>
        <ThemedText type="subtitle" style={styles.playerName}>{player.name}</ThemedText>
        <TouchableOpacity onPress={() => removePlayer(player.id)} style={styles.removeButton}>
          <IconSymbol size={20} name="xmark.circle.fill" color="#ef4444" />
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.playerImageContainer}>
        <IconSymbol size={60} name="person.circle.fill" color="#4A90E2" />
      </ThemedView>
      
      <ThemedText style={styles.playerTeam}>{player.team}</ThemedText>
      
      <ThemedView style={styles.playerStats}>
        <ThemedView style={styles.statRow}>
          <ThemedText style={styles.statValue}>{player.followers}</ThemedText>
          <ThemedText style={styles.statValue}>{player.posts}</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.playerValues}>
        <ThemedView style={styles.valueRow}>
          <ThemedText style={styles.valueLabel}>Market Value</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.valueAmount}>{player.marketValue}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.valueRow}>
          <ThemedText style={styles.valueLabel}>Legacy Value</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.valueAmount}>{player.legacyValue}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  const renderStatsComparison = () => {
    if (comparePlayers.length < 2) {
      return (
        <ThemedView style={styles.noComparisonContainer}>
          <IconSymbol size={60} name="chart.bar" color="#6b7280" />
          <ThemedText style={styles.noComparisonText}>
            {comparePlayers.length === 0 
              ? 'Add 2 players to compare stats' 
              : 'Add 1 more player to compare stats'
            }
          </ThemedText>
        </ThemedView>
      );
    }

    const stats = ['Goals', 'Assists', 'Appearances', 'Trophies', 'Rating'];
    const statKeys = ['goals', 'assists', 'appearances', 'trophies', 'rating'] as const;

    return (
      <ThemedView style={styles.statsContainer}>
        <ThemedText type="subtitle" style={styles.statsTitle}>Stats Comparison</ThemedText>
        {stats.map((stat, index) => {
          const statKey = statKeys[index];
          const player1Value = comparePlayers[0]?.stats[statKey] || 0;
          const player2Value = comparePlayers[1]?.stats[statKey] || 0;
          const maxValue = Math.max(player1Value, player2Value);
          
          return (
            <ThemedView key={stat} style={styles.statComparisonRow}>
              <ThemedText style={styles.statName}>{stat}</ThemedText>
              <ThemedView style={styles.statBars}>
                <ThemedView style={[styles.statBar, { width: `${(player1Value / maxValue) * 100}%` }]}>
                  <ThemedText style={styles.statBarValue}>{player1Value}</ThemedText>
                </ThemedView>
                <ThemedView style={[styles.statBar, { width: `${(player2Value / maxValue) * 100}%` }]}>
                  <ThemedText style={styles.statBarValue}>{player2Value}</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          );
        })}
      </ThemedView>
    );
  };

  const renderAddPlayerButton = () => (
    <TouchableOpacity 
      style={styles.addPlayerButton} 
      onPress={() => setShowPlayerModal(true)}
      disabled={comparePlayers.length >= 2}
    >
      <IconSymbol size={24} name="plus.circle.fill" color="#0a7ea4" />
      <ThemedText style={styles.addPlayerText}>Add Player</ThemedText>
    </TouchableOpacity>
  );

  const renderPlayerSelectionModal = () => (
    <Modal
      visible={showPlayerModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowPlayerModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <ThemedView style={styles.modalHeader}>
          <ThemedView style={styles.modalHeaderContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>Select Player</ThemedText>
            <ThemedText style={styles.modalSubtitle}>Choose a player to compare (max 2 players)</ThemedText>
          </ThemedView>
          <TouchableOpacity onPress={() => setShowPlayerModal(false)} style={styles.closeButton}>
            <IconSymbol size={24} name="xmark.circle.fill" color="#6b7280" />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.searchContainer}>
          <ThemedView style={styles.searchInput}>
            <IconSymbol size={16} name="magnifyingglass" color="#6b7280" />
            <ThemedText 
              style={styles.searchText}
              onPress={() => setSearchQuery('')}
            >
              {searchQuery || 'Search players...'}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <FlatList
          data={filteredPlayers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.playerListItem}
              onPress={() => addPlayerToCompare(item)}
            >
              <ThemedView style={styles.playerListImage}>
                <IconSymbol size={40} name="person.circle.fill" color="#4A90E2" />
              </ThemedView>
              <ThemedView style={styles.playerListInfo}>
                <ThemedText type="defaultSemiBold" style={styles.playerListName}>
                  {item.name}
                </ThemedText>
                <ThemedText style={styles.playerListTeam}>{item.team}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.playerListValues}>
                <ThemedText style={styles.playerListMarketValue}>{item.marketValue}</ThemedText>
                <ThemedText style={styles.playerListLegacyValue}>{item.legacyValue}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.playerListContainer}
        />
      </SafeAreaView>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
          <ThemedText style={styles.loadingText}>Loading players...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Compare Players</ThemedText>
        </ThemedView>

        <ThemedView style={styles.playersContainer}>
          {comparePlayers.map(renderPlayerCard)}
          {comparePlayers.length < 2 && renderAddPlayerButton()}
        </ThemedView>

        <ThemedView style={styles.tabContainer}>
          {renderTabButton('Stats', activeTab === 'Stats')}
          {renderTabButton('Attributes', activeTab === 'Attributes')}
          {renderTabButton('Social Impact', activeTab === 'Social Impact')}
        </ThemedView>

        <ThemedView style={styles.content}>
          {activeTab === 'Stats' && renderStatsComparison()}
          {activeTab === 'Attributes' && (
            <ThemedView style={styles.noComparisonContainer}>
              <IconSymbol size={60} name="chart.bar" color="#6b7280" />
              <ThemedText style={styles.noComparisonText}>Attributes comparison coming soon</ThemedText>
            </ThemedView>
          )}
          {activeTab === 'Social Impact' && (
            <ThemedView style={styles.noComparisonContainer}>
              <IconSymbol size={60} name="chart.bar" color="#6b7280" />
              <ThemedText style={styles.noComparisonText}>Social impact comparison coming soon</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>

      {renderPlayerSelectionModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    color: '#1a2e35',
    marginBottom: 8,
  },
  playersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
    minHeight: 320,
  },
  playerCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 300,
    maxWidth: (screenWidth - 52) / 3,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  playerName: {
    color: '#1a2e35',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  playerImageContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  playerTeam: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  playerStats: {
    width: '100%',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 12,
    color: '#1a2e35',
    fontWeight: '600',
  },
  playerValues: {
    width: '100%',
    gap: 6,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  valueAmount: {
    fontSize: 12,
    color: '#1a2e35',
  },
  addPlayerButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    minHeight: 300,
    maxWidth: (screenWidth - 52) / 3,
  },
  addPlayerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '600',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flex: 1,
  },
  activeTabButton: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  activeTabButtonText: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    color: '#1a2e35',
    fontSize: 18,
    marginBottom: 20,
  },
  statComparisonRow: {
    marginBottom: 16,
  },
  statName: {
    fontSize: 14,
    color: '#1a2e35',
    marginBottom: 8,
    fontWeight: '600',
  },
  statBars: {
    flexDirection: 'row',
    gap: 8,
    height: 32,
  },
  statBar: {
    flex: 1,
    backgroundColor: '#0a7ea4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  statBarValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  noComparisonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noComparisonText: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalHeaderContent: {
    flex: 1,
  },
  modalTitle: {
    color: '#1a2e35',
    fontSize: 18,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6b7280',
    flex: 1,
  },
  playerListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  playerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  playerListImage: {
    marginRight: 12,
  },
  playerListInfo: {
    flex: 1,
  },
  playerListName: {
    fontSize: 16,
    color: '#1a2e35',
    marginBottom: 4,
  },
  playerListTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  playerListValues: {
    alignItems: 'flex-end',
  },
  playerListMarketValue: {
    fontSize: 14,
    color: '#1a2e35',
    fontWeight: '600',
    marginBottom: 2,
  },
  playerListLegacyValue: {
    fontSize: 12,
    color: '#6b7280',
  },
}); 