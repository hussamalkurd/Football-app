import {Tabs, useLocalSearchParams} from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function ProfileScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();


    return (
      <ScrollView style={styles.container}>
        {/*<ThemedText type="title" style={styles.title}>
          {name}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Player ID: {id}
        </ThemedText>*/}

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.club}>Inter Miami</Text>
            <Text style={styles.country}>🇦🇷 Argentina</Text>
            <Text style={styles.name}>{id}</Text>
            <View style={styles.tagRow}>
              <Text style={styles.tagYellow}>Active Legend</Text>
              <Text style={styles.tagPurple}>Unsterblich</Text>
            </View>
          </View>
        </View>

        {/* Value Section */}
        <View style={styles.valueRow}>
          <View style={styles.valueBox}>
            <Text style={styles.valueLabel}>Market Value</Text>
            <Text style={styles.valueText}>€25M</Text>
          </View>
          <View style={styles.valueBox}>
            <Text style={styles.valueLabel}>Legacy Value</Text>
            <Text style={styles.valueText}>€0.9B</Text>
            <Text style={styles.legacyTag}>Unsterblich</Text>
          </View>
        </View>

        {/* Info Row */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>June 24, 1987 (37)</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>170 cm</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Position</Text>
            <Text style={styles.value}>Right Winger</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Foot</Text>
            <Text style={styles.value}>Left</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Contract</Text>
            <Text style={styles.value}>Until Dec 31, 2025</Text>
          </View>
        </View>

        {/* Tab placeholder */}
        <Tabs screenOptions={{tabBarActiveBackgroundColor: "coral"}}>
          <Tabs.Screen name="index" options={{title: "Profile"}}/>
          <Tabs.Screen name="search" options={{title: "Legacy"}}/>

        </Tabs>

        {/* Chart Placeholder */}
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Market Value Development</Text>
        </View>
      </ScrollView>
    );
  }



const styles = StyleSheet.create({
  headerImage: {
    color: '#4A90E2',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  avatarContainer: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  favoriteTeamsContainer: {
    marginTop: 12,
    gap: 8,
  },
  teamItem: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  /*container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },*/
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 40,
  },
  avatarPlaceholder: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#ccc', marginRight: 16,
  },
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    /*header: { flexDirection: 'row', marginBottom: 16 },*/
    /*avatarPlaceholder: {
      width: 80, height: 80, borderRadius: 40,
      backgroundColor: '#ccc', marginRight: 16,
    },*/
    name: { fontSize: 20, fontWeight: 'bold' },
    club: { fontSize: 16 },
    country: { fontSize: 16 },
    tagRow: { flexDirection: 'row', marginTop: 8 },
    tagYellow: {
      backgroundColor: '#FFD700', paddingHorizontal: 8, paddingVertical: 4,
      borderRadius: 8, marginRight: 8,
    },
    tagPurple: {
      backgroundColor: '#B19CD9', paddingHorizontal: 8, paddingVertical: 4,
      borderRadius: 8,
    },

    valueRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
    valueBox: {
      flex: 1, marginHorizontal: 4, padding: 12,
      backgroundColor: '#f1f1f1', borderRadius: 8, alignItems: 'center'
    },
    valueLabel: { fontSize: 14, color: '#888' },
    valueText: { fontSize: 18, fontWeight: 'bold' },
    legacyTag: { color: 'purple', fontSize: 12 },

    infoSection: { marginVertical: 12 },
    infoItem: { marginBottom: 10 },
    label: { color: '#555', fontSize: 14 },
    value: { fontSize: 16 },

    tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
    tab: { fontSize: 14, color: '#aaa' },
    activeTab: { fontSize: 14, fontWeight: 'bold', color: '#000', borderBottomWidth: 2 },

    chartBox: {
      height: 200, backgroundColor: '#eee', borderRadius: 8,
      justifyContent: 'center', alignItems: 'center', marginTop: 20
    },
    chartTitle: { fontSize: 16, fontWeight: 'bold' },
});


/*
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_FOOTBALL_KEY;

const PlayerData: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch('https://api.sportmonks.com/v3/football/fixtures?api_token=gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'gadQnPaHV1hQzI9nl4vQh9z78NqKA9adYAqOI3vrsqPOCGfEGdxgMTj3pZtw',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          },
        });

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Player Info</Text>
        <Text>Name: {data?.name}</Text>
        <Text>Team: {data?.team}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default PlayerData;
*/
