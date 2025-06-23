import {Stack, Tabs, useLocalSearchParams} from 'expo-router';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';


import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from "react";
import {Entypo, Feather, FontAwesome, FontAwesome5, FontAwesome6, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default function ProfileScreen() {
    const {id, name} = useLocalSearchParams<{ id: string; name: string }>();


    const TABS = ['Profile', 'Legacy', 'Transfers', 'Stats'];
    const [activeTab, setActiveTab] = useState('Profile');

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Player Profile',            // Title in the header
                    headerBackTitle: 'Home',         // ← Text next to the back arrow
                }}
            />
            {/*<ThemedText type="title" style={styles.title}>
          {name}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Player ID: {id}
        </ThemedText>*/}

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder}/>
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
                <View style={[styles.valueBox, {backgroundColor:  '#ccffe6'}]}>
                    <Text style={styles.valueLabel}>Legacy Value</Text>
                    <Text style={styles.valueText}>€0.9B</Text>
                    <Text style={styles.legacyTag}>Unsterblich</Text>
                </View>
            </View>

            {/* Info Row */}
            <View style={styles.infoSection}>
                <View style={{flexDirection: 'row'}}>
                    <Feather style={{flex: 1}} name="calendar" size={12} color="grey"/>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Text style={styles.value}>June 24, 1987 (37)</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Entypo style={{flex: 1}} name="ruler" size={12} color="grey" />

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Height</Text>
                        <Text style={styles.value}>170 cm</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Entypo style={{flex: 1}} name="medal" size={12} color="grey" />
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Position</Text>
                        <Text style={styles.value}>Right Winger</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons style={{flex: 1}} name="shirt-outline" size={12} color="grey" />
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Foot</Text>
                        <Text style={styles.value}>Left</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Feather style={{flex: 1}} name="clock" size={12} color="grey" />
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Contract</Text>
                        <Text style={styles.value}>Until Dec 31, 2025</Text>
                    </View>
                </View>
            </View>


            <View style={styles.container}>
                {/* Tab Buttons */}
                <View style={styles.tabsContainer}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tabButton,
                                activeTab === tab && styles.activeTabs,
                            ]}
                        >
                            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.contentContainer}>
                    {activeTab === 'Profile' &&
                        (
                            <View>
                                <Text style={styles.sectionTitle}>Market Value Development</Text>
                                <View style={styles.graphPlaceholder}/>

                                <Text style={styles.sectionTitle}>Achievements</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> 8× Ballon d'Or</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> FIFA World Cup Winner
                                    (2022)</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> Copa América (2021,
                                    2024)</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> 4× Champions League</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> 11× La Liga</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> 7× Copa del Rey</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> Ligue 1 (2021-22,
                                    2022-23)</Text>
                                <Text><FontAwesome5 name="medal" size={12} color="gold"/> Leagues Cup (2023)</Text>

                                <Text style={styles.sectionTitle}>Career Highlights</Text>
                                <Text><FontAwesome6 name="arrow-trend-up" size={12} color="green"/> Record 8 Ballon d'Or
                                    wins</Text>
                                <Text><FontAwesome6 name="arrow-trend-up" size={12} color="green"/> FIFA World Cup
                                    winner (2022)</Text>
                                <Text><FontAwesome6 name="arrow-trend-down" size={12} color="red"/> Barcelona's all-time
                                    leading scorer</Text>
                                <Text><FontAwesome6 name="arrow-trend-down" size={12} color="red"/> Most assists in
                                    football history</Text>
                            </View>
                        )
                    }
                    {activeTab === 'Legacy' &&
                        (
                            <View>
                                <Text style={styles.sectionTitle}>Legacy Value Berechnung</Text>
                                <Text style={styles.subText}>Immortal legends who transcended football</Text>

                                <View style={styles.legacyBox}>
                                    <Text style={styles.legacySub}>Gesamt Legacy Value</Text>
                                    <Text style={styles.legacyValue}>€1 Mrd.</Text>
                                    <Text style={styles.legacySub}>(925 Millionen)</Text>
                                </View>

                                <View style={{marginBottom: 20}}>
                                    <View style={styles.metricHeader}>
                                        <Text style={[styles.metricTitle]}><Ionicons name="trophy-outline" size={12}
                                                                                     color="green"/> Karriereleistung
                                            (25%)</Text>
                                        <Text style={styles.metricValue}>€245M (98%)</Text>
                                    </View>
                                    <Text style={styles.metricDescription}>Trophäen, Rekorde, individuelle
                                        Auszeichnungen</Text>
                                    <View style={styles.barWrapper}>
                                        <View style={[styles.barFill, {width: '98%'}]}/>
                                    </View>
                                </View>

                                <View style={{marginBottom: 20}}>
                                    <View style={styles.metricHeader}>
                                        <Text style={[styles.metricTitle]}><FontAwesome name="star-o" size={12}
                                                                                        color="green"/> Popularität/Kultfaktor
                                            (20%)</Text>
                                        <Text style={styles.metricValue}>€190M (95%)</Text>
                                    </View>
                                    <Text style={styles.metricDescription}>Globale Bekanntheit und kultureller
                                        Einfluss</Text>
                                    <View style={styles.barWrapper}>
                                        <View style={[styles.barFill, {width: '95%'}]}/>
                                    </View>
                                </View>

                                <View style={{marginBottom: 20}}>
                                    <View style={styles.metricHeader}>
                                        <Text style={[styles.metricTitle]}><FontAwesome6 name="arrow-trend-up" size={12}
                                                                                         color="green"/> Markenwert/Popkultur
                                            (20%)</Text>
                                        <Text style={styles.metricValue}>€185M (93%)</Text>
                                    </View>
                                    <Text style={styles.metricDescription}>Kommerzielle Vermarktung und
                                        Popkultur-Status</Text>
                                    <View style={styles.barWrapper}>
                                        <View style={[styles.barFill, {width: '93%'}]}/>
                                    </View>
                                </View>

                                <View style={{marginBottom: 20}}>
                                    <View style={styles.metricHeader}>
                                        <Text style={[styles.metricTitle]}><Feather name="users" size={12}
                                                                                    color="green"/> Langzeitwirkung
                                            (15%)</Text>
                                        <Text style={styles.metricValue}>€130M (87%)</Text>
                                    </View>
                                    <Text style={styles.metricDescription}>Nachhaltiger Einfluss auf zukünftige
                                        Generationen</Text>
                                    <View style={styles.barWrapper}>
                                        <View style={[styles.barFill, {width: '87%'}]}/>
                                    </View>
                                </View>

                                <View style={{marginBottom: 20}}>
                                    <View style={styles.metricHeader}>
                                        <Text style={[styles.metricTitle]}><MaterialIcons name="electric-bolt" size={12}
                                                                                          color="green"/> Aura/Ego/Präsenz
                                            (10%)</Text>
                                        <Text style={styles.metricValue}>€85M (85%)</Text>
                                    </View>
                                    <Text style={styles.metricDescription}>Charisma, Führungsqualitäten,
                                        Bühnenpräsenz</Text>
                                    <View style={styles.barWrapper}>
                                        <View style={[styles.barFill, {width: '85%'}]}/>
                                    </View>
                                </View>

                                <View style={{marginBottom: 20}}>
                                    <View style={styles.metricHeader}>
                                        <Text style={[styles.metricTitle]}><Feather name="target" size={12}
                                                                                    color="green"/> Einfluss auf Fußball
                                            (10%)</Text>
                                        <Text style={styles.metricValue}>€90M (90%)</Text>
                                    </View>
                                    <Text style={styles.metricDescription}>Taktische Innovation,
                                        Spielfluss-Einfluss</Text>
                                    <View style={styles.barWrapper}>
                                        <View style={[styles.barFill, {width: '90%'}]}/>
                                    </View>
                                </View>
                                <View style={{backgroundColor: '#f2f2f2', padding: 15, borderRadius: 15}}>
                                    <Text style={[styles.metricTitle]}>Warum Unsterblich?</Text>
                                    <Text style={[styles.metricDescription]}>Lionel Messi erreicht einen Legacy Value
                                        von €0.9 Milliarden, was ihn in die Kategorie "Unsterblich" einordnet. Diese
                                        Bewertung berücksichtigt nicht nur sportliche Leistungen, sondern auch
                                        kulturellen Einfluss, Markenwert und langfristige Wirkung auf den Fußball.
                                    </Text>

                                </View>
                            </View>
                        )

                    }
                    {activeTab === 'Transfers' &&
                        (
                            <View>
                                <Text style={styles.sectionTitle}>Transfer History</Text>

                                <View style={styles.transferItem}>
                                    <View style={styles.leftIcon}>
                                        <Text style={{fontSize: 16}}><FontAwesome5 name="long-arrow-alt-down" size={12}
                                                                                   color="green"/></Text>
                                    </View>

                                    <View style={styles.transferContent}>
                                        <Text style={styles.transferDate}>Jul 15, 2023</Text>
                                        <Text style={styles.transferClubs}>Paris Saint-Germain → Inter Miami</Text>
                                        <Text style={styles.transferValue}>Market Value at time: €35M</Text>
                                    </View>

                                    <View style={styles.transferBadge}>
                                        <Text style={styles.transferBadgeText}>Free Transfer</Text>
                                    </View>
                                </View>

                                <View style={styles.transferItem}>
                                    <View style={styles.leftIcon}>
                                        <Text style={{fontSize: 16}}><FontAwesome5 name="long-arrow-alt-down" size={12}
                                                                                   color="green"/></Text>
                                    </View>

                                    <View style={styles.transferContent}>
                                        <Text style={styles.transferDate}>Aug 10, 2021</Text>
                                        <Text style={styles.transferClubs}>FC Barcelona → Paris Saint-Germain</Text>
                                        <Text style={styles.transferValue}>Market Value at time: €80M</Text>
                                    </View>

                                    <View style={styles.transferBadge}>
                                        <Text style={styles.transferBadgeText}>Free Transfer</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    {activeTab === 'Stats' &&
                        (
                            <View>
                                <Text style={styles.sectionTitle}>Current Season</Text>
                                {/* MLS 2024 Stats Box */}
                                <View style={styles.statsBox}>
                                    <Text style={styles.statsBoxLabel}>MLS 2024</Text>
                                    <View style={styles.statsRow}>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>19</Text>
                                            <Text style={styles.statLabel}>Appearances</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>11</Text>
                                            <Text style={styles.statLabel}>Goals</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>9</Text>
                                            <Text style={styles.statLabel}>Assists</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Career Totals */}
                                <Text style={styles.sectionTitle}>Career Totals</Text>
                                <View style={styles.statsRow}>
                                    <View style={styles.careerBox}>
                                        <Text style={styles.statValue}>1069</Text>
                                        <Text style={styles.statLabel}>Appearances</Text>
                                    </View>
                                    <View style={styles.careerBox}>
                                        <Text style={styles.statValue}>821</Text>
                                        <Text style={styles.statLabel}>Goals</Text>
                                    </View>
                                    <View style={styles.careerBox}>
                                        <Text style={styles.statValue}>361</Text>
                                        <Text style={styles.statLabel}>Assists</Text>
                                    </View>
                                </View>

                                {/* Goal Ratio */}
                                <View style={styles.goalRatioBox}>
                                    <Text style={styles.goalRatioText}><FontAwesome6 name="arrow-trend-up" size={12}
                                                                                     color="green"/> Goal ratio: 0.77
                                        goals per game</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
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
    container: {flex: 1, padding: 16, backgroundColor: '#fff'},
    /*header: { flexDirection: 'row', marginBottom: 16 },*/
    /*avatarPlaceholder: {
      width: 80, height: 80, borderRadius: 40,
      backgroundColor: '#ccc', marginRight: 16,
    },*/
    name: {fontSize: 20, fontWeight: 'bold'},
    club: {fontSize: 16},
    country: {fontSize: 16},
    tagRow: {flexDirection: 'row', marginTop: 8},
    tagYellow: {
        backgroundColor: '#FFD700', paddingHorizontal: 8, paddingVertical: 4,
        borderRadius: 8, marginRight: 8,
    },
    tagPurple: {
        backgroundColor: '#B19CD9', paddingHorizontal: 8, paddingVertical: 4,
        borderRadius: 8,
    },

    valueRow: {flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16},
    valueBox: {
        flex: 1, marginHorizontal: 4, padding: 12,
        backgroundColor: '#f1f1f1', borderRadius: 8, alignItems: 'center'
    },
    valueLabel: {fontSize: 14, color: '#888'},
    valueText: {fontSize: 18, fontWeight: 'bold'},
    legacyTag: {color: 'purple', fontSize: 12},

    infoSection: {
        marginVertical: 12,
        // flexDirection: 'row',
        // flex: 1,
    },
    infoItem: {
        marginBottom: 10,
        flex: 20,
    },

    label: {color: '#555', fontSize: 14},
    value: {fontSize: 16},

    tabRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: 20},
    tab: {fontSize: 14, color: '#aaa'},
    activeTab: {fontSize: 14, fontWeight: 'bold', color: '#000', borderBottomWidth: 2},

    chartBox: {
        height: 200, backgroundColor: '#eee', borderRadius: 8,
        justifyContent: 'center', alignItems: 'center', marginTop: 20
    },
    chartTitle: {fontSize: 16, fontWeight: 'bold'},
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    activeTabs: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
    },
    contentContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    graphPlaceholder: {
        height: 100,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    barGroup: {
        marginBottom: 16,
    },
    bar: {
        height: 8,
        backgroundColor: '#000',
        width: '90%',
        borderRadius: 4,
        marginTop: 4,
    },
    transferCard: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8,
    },
    goalRatio: {
        backgroundColor: '#eaffef',
        padding: 8,
        borderRadius: 6,
        color: '#2ecc71',
        marginTop: 12,
        fontWeight: '600',
    },

    legacyBox: {
        backgroundColor: '#eafaf1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginVertical: 16,
    },
    legacyValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'green',
    },
    legacySub: {
        fontSize: 14,
        color: '#666',
    },
    metricHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metricTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    metricValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    metricDescription: {
        fontSize: 12,
        color: '#555',
        marginTop: 2,
        marginBottom: 6,
    },
    barWrapper: {
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    barFill: {
        height: 6,
        backgroundColor: '#000',
        borderRadius: 4,
    },
    subText: {
        color: '#666',
        fontSize: 13,
        marginBottom: 12,
    },

    transferItem: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        alignItems: 'flex-start',
        gap: 12,
        position: 'relative',
    },
    leftIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#d4f8e8',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    transferContent: {
        flex: 1,
    },
    transferDate: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    transferClubs: {
        fontSize: 14,
        marginBottom: 4,
    },
    transferValue: {
        fontSize: 12,
        color: '#777',
    },
    transferBadge: {
        backgroundColor: '#007bff',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    transferBadgeText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '600',
    },
    statsBox: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        marginVertical: 12,
    },
    statsBoxLabel: {
        fontWeight: '600',
        marginBottom: 12,
        fontSize: 14,
        color: '#333',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    statLabel: {
        fontSize: 12,
        color: '#777',
    },
    careerBox: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 20,
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    goalRatioBox: {
        backgroundColor: '#eafdf3',
        padding: 12,
        borderRadius: 10,
        marginTop: 16,
    },
    goalRatioText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 13,
    },
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


