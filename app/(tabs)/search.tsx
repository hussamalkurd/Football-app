import { StyleSheet, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SearchScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="magnifyingglass"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
      </ThemedView>
      
      {/* Search Input */}
      <ThemedView style={styles.searchContainer}>
        <ThemedView style={styles.searchInputContainer}>
          <IconSymbol size={20} name="magnifyingglass" color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teams, players, matches..."
            placeholderTextColor="#666"
          />
        </ThemedView>
      </ThemedView>

      <ThemedText>Find your favorite football teams, players, and matches.</ThemedText>
      
      <Collapsible title="Search Teams">
        <ThemedText>
          Search for your favorite football teams by name, league, or country.
        </ThemedText>
        <ThemedText>
          Get real-time updates on team statistics, upcoming matches, and recent results.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Search Players">
        <ThemedText>
          Find detailed information about football players including stats, career history, and current form.
        </ThemedText>
        <ThemedText>
          Track player performance across different competitions and seasons.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Search Matches">
        <ThemedText>
          Search for upcoming and past matches by date, teams, or competition.
        </ThemedText>
        <ThemedText>
          Get live scores, match statistics, and detailed analysis.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Recent Searches">
        <ThemedText>
          Your recent searches will appear here for quick access.
        </ThemedText>
        <ThemedText>
          Tap on any recent search to quickly view those results again.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    marginVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
