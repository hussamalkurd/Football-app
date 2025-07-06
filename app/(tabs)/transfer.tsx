import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TransferPlayer {
  id: number;
  name: string;
  team: string;
  position: string;
  marketValue: string;
  legacyValue?: string;
  followers?: string;
  posts?: string;
  change?: string;
  rank?: number;
  image?: string;
}

interface RecentTransfer {
  id: number;
  playerName: string;
  fromTeam: string;
  toTeam: string;
  fee: string;
  date: string;
  image?: string;
}

export default function TransferScreen() {
  const [activeTab, setActiveTab] = useState('Market');
  const [players, setPlayers] = useState<TransferPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransferData = async () => {
    try {
      console.log('Fetching transfer data from SportMonks API...');
      
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
        console.log('Converting API data to transfer players...');
        const convertedPlayers: TransferPlayer[] = data.data.map((player: any) => ({
          id: player.id,
          name: player.display_name || player.firstname + ' ' + player.lastname,
          team: 'Unknown Team',
          position: 'Forward', // Default position
          marketValue: '€' + Math.floor(Math.random() * 200 + 10) + 'M',
          legacyValue: '€' + Math.floor(Math.random() * 1000 + 100) + 'M',
          followers: Math.floor(Math.random() * 100 + 1) + 'M',
          posts: Math.floor(Math.random() * 1000 + 100) + 'M',
          change: '+' + Math.floor(Math.random() * 30 + 5) + '%',
          rank: Math.floor(Math.random() * 10 + 1),
        }));
        
        console.log('Successfully converted transfer players from API:', convertedPlayers);
        setPlayers(convertedPlayers);
        console.log('Transfer players state updated with API data');
      } else {
        console.log('No data array found in API response');
        throw new Error('No data array in API response');
      }
    } catch (error) {
      console.error('Error fetching transfer data from API:', error);
      // Don't set any mock data, just log the error
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransferData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTransferData();
  }, []);

  // Derive data from API players
  const featuredTransfer = players[0] || null;
  const topMarketValues = players.slice(1, 6);
  const recentTransfers: RecentTransfer[] = players.slice(6, 9).map((player, index) => ({
    id: player.id,
    playerName: player.name,
    fromTeam: ['PSG', 'West Ham', 'Dortmund'][index] || 'Team A',
    toTeam: ['Real Madrid', 'Arsenal', 'Real Madrid'][index] || 'Team B',
    fee: index === 0 ? 'Free Transfer' : '€' + Math.floor(Math.random() * 150 + 50) + 'M',
    date: ['Jun 2024', 'Jul 2023', 'Jul 2023'][index] || 'Jan 2024',
  }));

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

  const renderFeaturedTransfer = () => {
    if (!featuredTransfer) {
      return (
        <ThemedView style={styles.featuredTransferCard}>
          <ThemedView style={styles.featuredHeader}>
            <ThemedText type="subtitle" style={styles.featuredTitle}>Featured Transfer</ThemedText>
          </ThemedView>
          <ThemedView style={styles.noDataContainer}>
            <IconSymbol size={40} name="exclamationmark.triangle" color="#6b7280" />
            <ThemedText style={styles.noDataText}>No featured transfer available</ThemedText>
          </ThemedView>
        </ThemedView>
      );
    }

    return (
      <ThemedView style={styles.featuredTransferCard}>
        <ThemedView style={styles.featuredHeader}>
          <ThemedText type="subtitle" style={styles.featuredTitle}>Featured Transfer</ThemedText>
        </ThemedView>
        <ThemedView style={styles.featuredContent}>
          <ThemedView style={styles.featuredPlayerInfo}>
            <ThemedView style={styles.playerImageContainer}>
              <IconSymbol size={60} name="person.circle.fill" color="#4A90E2" />
            </ThemedView>
            <ThemedView style={styles.playerDetails}>
              <ThemedText type="defaultSemiBold" style={styles.playerName}>
                {featuredTransfer.name}
              </ThemedText>
              <ThemedText style={styles.playerTeam}>{featuredTransfer.team}</ThemedText>
              <ThemedText style={styles.playerPosition}>{featuredTransfer.position}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.marketValueContainer}>
            <ThemedText style={styles.marketValueLabel}>Market Value</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.marketValueAmount}>
              {featuredTransfer.marketValue}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  };

  const renderTopMarketValues = () => (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>Top Market Values</ThemedText>
      <ThemedView style={styles.marketValuesList}>
        {topMarketValues.length > 0 ? (
          topMarketValues.map((player) => (
            <TouchableOpacity key={player.id} style={styles.marketValueItem}>
              <ThemedView style={styles.marketValueLeft}>
                <ThemedText type="defaultSemiBold" style={styles.marketValueName}>
                  {player.name}
                </ThemedText>
                <ThemedText style={styles.marketValueTeam}>
                  {player.team} • {player.position}
                </ThemedText>
              </ThemedView>
              <ThemedText type="defaultSemiBold" style={styles.marketValueAmount}>
                {player.marketValue}
              </ThemedText>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedView style={styles.noDataContainer}>
            <IconSymbol size={40} name="exclamationmark.triangle" color="#6b7280" />
            <ThemedText style={styles.noDataText}>No market values available</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );

  const renderRecentTransfers = () => (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Transfers</ThemedText>
      <ThemedView style={styles.recentTransfersList}>
        {recentTransfers.length > 0 ? (
          recentTransfers.map((transfer) => (
            <ThemedView key={transfer.id} style={styles.recentTransferItem}>
              <ThemedView style={styles.transferHeader}>
                <ThemedText type="defaultSemiBold" style={styles.transferPlayerName}>
                  {transfer.playerName}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.transferDetails}>
                <ThemedView style={styles.transferTeams}>
                  <ThemedText style={styles.transferFromTeam}>{transfer.fromTeam}</ThemedText>
                  <IconSymbol size={16} name="arrow.right" color="#6b7280" />
                  <ThemedText style={styles.transferToTeam}>{transfer.toTeam}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.transferFeeDate}>
                  <ThemedText type="defaultSemiBold" style={styles.transferFee}>
                    {transfer.fee}
                  </ThemedText>
                  <ThemedText style={styles.transferDate}>{transfer.date}</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.noDataContainer}>
            <IconSymbol size={40} name="exclamationmark.triangle" color="#6b7280" />
            <ThemedText style={styles.noDataText}>No recent transfers available</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
          <ThemedText style={styles.loadingText}>Loading transfer data...</ThemedText>
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
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Transfer Market</ThemedText>
        </ThemedView>

        <ThemedView style={styles.tabContainer}>
          {renderTabButton('Market', activeTab === 'Market')}
          {renderTabButton('Rumors', activeTab === 'Rumors')}
          {renderTabButton('History', activeTab === 'History')}
        </ThemedView>

        <ThemedView style={styles.content}>
          {renderFeaturedTransfer()}
          {renderTopMarketValues()}
          {renderRecentTransfers()}
        </ThemedView>
      </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeTabButton: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabButtonText: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featuredTransferCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredHeader: {
    marginBottom: 16,
  },
  featuredTitle: {
    color: '#1a2e35',
    fontSize: 20,
  },
  featuredContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredPlayerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerImageContainer: {
    marginRight: 16,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    color: '#1a2e35',
    marginBottom: 4,
  },
  playerTeam: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  playerPosition: {
    fontSize: 14,
    color: '#6b7280',
  },
  marketValueContainer: {
    alignItems: 'flex-end',
  },
  marketValueLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  marketValueAmount: {
    fontSize: 18,
    color: '#1a2e35',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#1a2e35',
    fontSize: 20,
    marginBottom: 16,
  },
  marketValuesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  marketValueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  marketValueLeft: {
    flex: 1,
  },
  marketValueName: {
    fontSize: 16,
    color: '#1a2e35',
    marginBottom: 4,
  },
  marketValueTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  recentTransfersList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentTransferItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  transferHeader: {
    marginBottom: 8,
  },
  transferPlayerName: {
    fontSize: 16,
    color: '#1a2e35',
  },
  transferDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transferFromTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  transferToTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  transferFeeDate: {
    alignItems: 'flex-end',
  },
  transferFee: {
    fontSize: 14,
    color: '#1a2e35',
    marginBottom: 2,
  },
  transferDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noDataText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
}); 