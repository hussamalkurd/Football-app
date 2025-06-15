import { StyleSheet, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#4A90E2"
          name="sportscourt.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Football Hub</ThemedText>
        <HelloWave />
      </ThemedView>
      
      

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Quick Actions</ThemedText>
        <ThemedView style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol size={24} name="magnifyingglass" color="#4A90E2" />
            <ThemedText>Search</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol size={24} name="star.fill" color="#4A90E2" />
            <ThemedText>Favorites</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol size={24} name="bell.fill" color="#4A90E2" />
            <ThemedText>Alerts</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol size={24} name="person.fill" color="#4A90E2" />
            <ThemedText>Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Latest News */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Latest News</ThemedText>
        <ThemedView style={styles.newsCard}>
          <ThemedText type="defaultSemiBold">Transfer Window Updates</ThemedText>
          <ThemedText>Latest transfer news and rumors from around the world...</ThemedText>
          <ThemedText style={styles.newsTime}>2 hours ago</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.newsCard}>
          <ThemedText type="defaultSemiBold">Champions League Preview</ThemedText>
          <ThemedText>Key matchups and predictions for this week&apos;s Champions League...</ThemedText>
          <ThemedText style={styles.newsTime}>5 hours ago</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerImage: {
    color: '#4A90E2',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  section: {
    gap: 12,
    marginBottom: 24,
  },
  liveMatchCard: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  matchCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
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
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    gap: 8,
  },
  newsCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 4,
  },
  newsTime: {
    color: '#666',
    fontSize: 12,
  },
});
