import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    team: string;
    marketValue?: string;
    legacyValue?: string;
    followers?: string;
    posts?: string;
    change?: string;
    rank?: number;
  };
  type?: 'featured' | 'trending' | 'legacy' | 'playerOfWeek';
  onPress?: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, type = 'featured', onPress }) => {
  const renderFeaturedCard = () => (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
      <ThemedView style={styles.playerCardHeader}>
        <ThemedText type="defaultSemiBold" style={styles.playerCardName}>{player.name}</ThemedText>
        <ThemedText style={styles.playerCardTeam}>{player.team}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.playerCardValues}>
        {player.marketValue && (
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>Market Value</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.marketValue}</ThemedText>
          </ThemedView>
        )}
        {player.legacyValue && (
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>Legacy Value</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.legacyValue}</ThemedText>
          </ThemedView>
        )}
        {player.followers && player.posts && (
          <ThemedView style={styles.valueRow}>
            <ThemedText style={styles.valueLabel}>{player.followers}</ThemedText>
            <ThemedText style={styles.valueAmount}>{player.posts}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderTrendingCard = () => (
    <TouchableOpacity style={styles.trendingCard} onPress={onPress}>
      <ThemedView style={styles.trendingPlayerInfo}>
        <ThemedText type="defaultSemiBold" style={styles.trendingPlayerName}>{player.name}</ThemedText>
        <ThemedText style={styles.trendingPlayerTeam}>{player.team}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.trendingPlayerStats}>
        {player.change && <ThemedText style={styles.trendingChange}>{player.change}</ThemedText>}
        {player.legacyValue && <ThemedText style={styles.trendingValue}>{player.legacyValue}</ThemedText>}
        {player.followers && <ThemedText style={styles.trendingFollowers}>{player.followers}</ThemedText>}
        {player.posts && <ThemedText style={styles.trendingPosts}>{player.posts}</ThemedText>}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderLegacyCard = () => (
    <TouchableOpacity style={styles.legacyCard} onPress={onPress}>
      <ThemedText style={styles.rankingNumber}>{player.rank}</ThemedText>
      <ThemedView style={styles.legacyPlayerInfo}>
        <ThemedText type="defaultSemiBold" style={styles.legacyPlayerName}>{player.name}</ThemedText>
        {player.legacyValue && <ThemedText style={styles.legacyValue}>Legacy Value: {player.legacyValue}</ThemedText>}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderPlayerOfWeekCard = () => (
    <TouchableOpacity style={styles.playerOfWeekCard} onPress={onPress}>
      <ThemedView style={styles.playerOfWeekInfo}>
        <ThemedText type="defaultSemiBold" style={styles.playerName}>{player.name}</ThemedText>
        <ThemedText style={styles.playerTeam}>{player.team}</ThemedText>
        <ThemedView style={styles.valueInfo}>
          {player.legacyValue && <ThemedText style={styles.legacyValueText}>Legacy Value: {player.legacyValue}</ThemedText>}
          {player.change && <ThemedText style={styles.changeText}>{player.change}</ThemedText>}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.playerImageContainer}>
        <IconSymbol size={60} name="person.circle.fill" color="#4A90E2" />
      </ThemedView>
    </TouchableOpacity>
  );

  switch (type) {
    case 'featured':
      return renderFeaturedCard();
    case 'trending':
      return renderTrendingCard();
    case 'legacy':
      return renderLegacyCard();
    case 'playerOfWeek':
      return renderPlayerOfWeekCard();
    default:
      return renderFeaturedCard();
  }
};

const styles = StyleSheet.create({
  featuredCard: {
    width: 200,
    marginRight: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  playerCardHeader: {
    marginBottom: 12,
  },
  playerCardName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  playerCardTeam: {
    fontSize: 12,
    color: '#666',
  },
  playerCardValues: {
    gap: 8,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 12,
    color: '#666',
  },
  valueAmount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  trendingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 8,
  },
  trendingPlayerInfo: {
    flex: 1,
  },
  trendingPlayerName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  trendingPlayerTeam: {
    fontSize: 12,
    color: '#666',
  },
  trendingPlayerStats: {
    alignItems: 'flex-end',
    gap: 4,
  },
  trendingChange: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  trendingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  trendingFollowers: {
    fontSize: 12,
    color: '#666',
  },
  trendingPosts: {
    fontSize: 12,
    color: '#666',
  },
  legacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 8,
  },
  rankingNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginRight: 16,
    minWidth: 30,
  },
  legacyPlayerInfo: {
    flex: 1,
  },
  legacyPlayerName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  legacyValue: {
    fontSize: 14,
    color: '#666',
  },
  playerOfWeekCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  playerOfWeekInfo: {
    flex: 1,
    gap: 8,
  },
  playerName: {
    fontSize: 18,
    color: '#333',
  },
  playerTeam: {
    fontSize: 14,
    color: '#666',
  },
  valueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legacyValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  changeText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  playerImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 