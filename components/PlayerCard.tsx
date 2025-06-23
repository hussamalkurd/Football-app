import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

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
    image?: string;
  };
  type?: 'featured' | 'trending' | 'legacy' | 'playerOfWeek';
  onPress?: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, type = 'featured', onPress }) => {
  console.log('PlayerCard rendering:', { player, type });
  
  const renderFeaturedCard = () => (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
      <ThemedView style={styles.featuredHeader}>
        <ThemedText type="defaultSemiBold" style={styles.featuredName}>{player.name}</ThemedText>
        <ThemedText style={styles.featuredTeam}>{player.team}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.featuredValues}>
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
      <ThemedView style={styles.trendingLeft}>
        <ThemedText type="defaultSemiBold" style={styles.trendingName}>{player.name}</ThemedText>
        <ThemedText style={styles.trendingTeam}>{player.team}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.trendingRight}>
        {player.change && <ThemedText style={styles.trendingChange}>{player.change}</ThemedText>}
        {player.legacyValue && <ThemedText style={styles.trendingValue}>{player.legacyValue}</ThemedText>}
        {player.followers && <ThemedText style={styles.trendingFollowers}>{player.followers}</ThemedText>}
        {player.posts && <ThemedText style={styles.trendingPosts}>{player.posts}</ThemedText>}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderLegacyCard = () => (
    <TouchableOpacity style={styles.legacyCard} onPress={onPress}>
      <ThemedText style={styles.legacyRank}>{player.rank}</ThemedText>
      <ThemedView style={styles.legacyInfo}>
        <ThemedText type="defaultSemiBold" style={styles.legacyName}>{player.name}</ThemedText>
        {player.legacyValue && <ThemedText style={styles.legacyValue}>Legacy Value: {player.legacyValue}</ThemedText>}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderPlayerOfWeekCard = () => (
    <TouchableOpacity style={styles.playerOfWeekCard} onPress={onPress}>
      <ThemedView style={styles.playerOfWeekInfo}>
        <ThemedText type="defaultSemiBold" style={styles.playerOfWeekName}>{player.name}</ThemedText>
        <ThemedText style={styles.playerOfWeekTeam}>{player.team}</ThemedText>
        <ThemedView style={styles.playerOfWeekValues}>
          {player.legacyValue && <ThemedText style={styles.playerOfWeekLegacy}>Legacy Value: {player.legacyValue}</ThemedText>}
          {player.change && <ThemedText style={styles.playerOfWeekChange}>{player.change}</ThemedText>}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.playerOfWeekImage}>
        {player.image ? (
          <Image source={{ uri: player.image }} style={styles.playerImage} />
        ) : (
          <IconSymbol size={60} name="person.circle.fill" color="#4A90E2" />
        )}
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
  // Featured Card Styles
  featuredCard: {
    width: 280,
    marginRight: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredHeader: {
    marginBottom: 16,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featuredTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  featuredValues: {
    gap: 12,
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

  // Trending Card Styles
  trendingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  trendingLeft: {
    flex: 1,
  },
  trendingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  trendingTeam: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendingRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  trendingChange: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  trendingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  trendingFollowers: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendingPosts: {
    fontSize: 14,
    color: '#6b7280',
  },

  // Legacy Card Styles
  legacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  legacyRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginRight: 16,
    minWidth: 30,
  },
  legacyInfo: {
    flex: 1,
  },
  legacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  legacyValue: {
    fontSize: 14,
    color: '#6b7280',
  },

  // Player of the Week Card Styles
  playerOfWeekCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  playerOfWeekInfo: {
    flex: 1,
    gap: 8,
  },
  playerOfWeekName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  playerOfWeekTeam: {
    fontSize: 16,
    color: '#6b7280',
  },
  playerOfWeekValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playerOfWeekLegacy: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  playerOfWeekChange: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  playerOfWeekImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
}); 