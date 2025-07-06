import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

const TABS = ['Trending', 'Positions', 'Legends', 'Stats'];

export default function DiscoverPlayers() {
    const [activeTab, setActiveTab] = useState('Trending');

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Discover Players</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={{marginRight: 8}}/>
                <TextInput placeholder="Search players, clubs, positions..." style={styles.searchInput}/>
                <Ionicons name="filter" size={20} color="#666"/>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}>
                        <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {activeTab === 'Trending' && (
                    <>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="trending-up" size={24} color="green"
                                                    style={{marginRight: 6}}/>
                            <Text style={styles.sectionTitle}>Trending Players</Text>
                        </View>
                        {[
                            ['Cristiano Ronaldo', 'Al Nassr', '€15M', '€930M', '@cristiano'],
                            ['Lionel Messi', 'Inter Miami', '€25M', '€925M', '@messi'],
                            ['Kylian Mbappé', 'Real Madrid', '€180M', '€610M', '@mbape'],
                            ['Erling Haaland', 'Manchester City', '€170M', '€535M', '@haaland']
                        ].map(([name, club, market, legacy, inst,]) => (
                            <View key={name} style={styles.card}>
                                <Ionicons name="person-circle-outline" size={48} color="#ccc"/>
                                <Text style={styles.playerName}>{name}</Text>
                                <Text style={styles.subText}>{club}</Text>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.marketValue}>Market Value {market}</Text>
                                    <Text style={styles.legacyValue}>Legacy Value {legacy}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 8
                                }}>
                                    <FontAwesome name="instagram" size={16} color="#E1306C" style={{marginRight: 4}}/>
                                    <Text style={{color: '#666', fontSize: 14}}>{inst}</Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}

                {activeTab === 'Positions' && (
                    <>
                        <Text style={styles.sectionTitle}>Top Forwards</Text>
                        {[
                            ['Cristiano Ronaldo', 'Al Nassr', '€15M', '€930M', '@cristiano'],
                            ['Lionel Messi', 'Inter Miami', '€25M', '€925M', '@messi'],
                            ['Kylian Mbappé', 'Real Madrid', '€180M', '€610M', '@mbape'],
                            ['Erling Haaland', 'Manchester City', '€170M', '€535M', '@haaland']
                        ].map(([name, club, market, legacy, inst,]) => (
                            <View key={name} style={styles.card}>
                                <View style={styles.rowBetween}>
                                    <Ionicons name="person-circle-outline" size={48} color="#ccc"/>
                                    <Text style={{
                                        backgroundColor: '#fcc453',
                                        textAlign: 'center',
                                        height: 20,
                                        width: 55,
                                        borderRadius: 10,
                                        color: '#ffffff'
                                    }}>legend</Text>
                                </View>
                                <Text style={styles.playerName}>{name}</Text>
                                <Text style={styles.subText}>{club}</Text>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.marketValue}>Market Value {market}</Text>
                                    <Text style={styles.legacyValue}>Legacy Value {legacy}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 8
                                }}>
                                    <FontAwesome name="instagram" size={16} color="#E1306C" style={{marginRight: 4}}/>
                                    <Text style={{color: '#666', fontSize: 14}}>{inst}</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={styles.sectionTitle}>Top Midfielders</Text>
                        {[
                            ['Cristiano Ronaldo', 'Al Nassr', '€15M', '€930M', '@cristiano'],
                            ['Lionel Messi', 'Inter Miami', '€25M', '€925M', '@messi'],
                            ['Kylian Mbappé', 'Real Madrid', '€180M', '€610M', '@mbape'],
                            ['Erling Haaland', 'Manchester City', '€170M', '€535M', '@haaland']
                        ].map(([name, club, market, legacy, inst,]) => (
                            <View key={name} style={styles.card}>
                                <View style={styles.rowBetween}>
                                    <Ionicons name="person-circle-outline" size={48} color="#ccc"/>
                                    <Text style={{
                                        backgroundColor: '#fcc453',
                                        textAlign: 'center',
                                        height: 20,
                                        width: 55,
                                        borderRadius: 10,
                                        color: '#ffffff'
                                    }}>legend</Text>
                                </View>
                                <Text style={styles.playerName}>{name}</Text>
                                <Text style={styles.subText}>{club}</Text>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.marketValue}>Market Value {market}</Text>
                                    <Text style={styles.legacyValue}>Legacy Value {legacy}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 8
                                }}>
                                    <FontAwesome name="instagram" size={16} color="#E1306C" style={{marginRight: 4}}/>
                                    <Text style={{color: '#666', fontSize: 14}}>{inst}</Text>
                                </View>
                            </View>
                        ))}


                        <Text style={styles.sectionTitle}>Top Defenders</Text>
                        {[
                            ['Cristiano Ronaldo', 'Al Nassr', '€15M', '€930M', '@cristiano'],
                            ['Lionel Messi', 'Inter Miami', '€25M', '€925M', '@messi'],
                        ].map(([name, club, market, legacy, inst,]) => (
                            <View key={name} style={styles.card}>
                                <View style={styles.rowBetween}>
                                    <Ionicons name="person-circle-outline" size={48} color="#ccc"/>
                                    <Text style={{
                                        backgroundColor: '#fcc453',
                                        textAlign: 'center',
                                        height: 20,
                                        width: 55,
                                        borderRadius: 10,
                                        color: '#ffffff'
                                    }}>legend</Text>
                                </View>
                                <Text style={styles.playerName}>{name}</Text>
                                <Text style={styles.subText}>{club}</Text>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.marketValue}>Market Value {market}</Text>
                                    <Text style={styles.legacyValue}>Legacy Value {legacy}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 8
                                }}>
                                    <FontAwesome name="instagram" size={16} color="#E1306C" style={{marginRight: 4}}/>
                                    <Text style={{color: '#666', fontSize: 14}}>{inst}</Text>
                                </View>
                            </View>
                        ))}


                        <Text style={styles.sectionTitle}>Top Goalkeepers</Text>
                        {[
                            ['Cristiano Ronaldo', 'Al Nassr', '€15M', '€930M', '@cristiano'],
                        ].map(([name, club, market, legacy, inst,]) => (
                            <View key={name} style={styles.card}>
                                <View style={styles.rowBetween}>
                                    <Ionicons name="person-circle-outline" size={48} color="#ccc"/>
                                    <Text style={{
                                        backgroundColor: '#fcc453',
                                        textAlign: 'center',
                                        height: 20,
                                        width: 55,
                                        borderRadius: 10,
                                        color: '#ffffff'
                                    }}>legend</Text>
                                </View>
                                <Text style={styles.playerName}>{name}</Text>
                                <Text style={styles.subText}>{club}</Text>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.marketValue}>Market Value {market}</Text>
                                    <Text style={styles.legacyValue}>Legacy Value {legacy}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 8
                                }}>
                                    <FontAwesome name="instagram" size={16} color="#E1306C" style={{marginRight: 4}}/>
                                    <Text style={{color: '#666', fontSize: 14}}>{inst}</Text>
                                </View>
                            </View>
                        ))}

                    </>
                )}

                {activeTab === 'Legends' && (
                    <>
                        <Text style={styles.sectionTitle}>Hall of Fame</Text>
                        <TouchableOpacity style={styles.hallButton}>
                            <Text style={styles.hallButtonText}>Visit Hall of Fame</Text>
                        </TouchableOpacity>

                        <Text style={styles.sectionTitle}>Retired Legends</Text>
                        {/* Cards for Pelé, Maradona etc */}
                    </>
                )}

                {activeTab === 'Stats' && (
                    <>
                        <View style={styles.gridRow}>
                            <View style={styles.gridBox}>
                                <Text style={styles.sectionTitle}>Highest Legacy Value</Text>
                                {/* Pelé, Maradona, Ronaldo */}
                            </View>
                            <View style={styles.gridBox}>
                                <Text style={styles.sectionTitle}>Highest Market Value</Text>
                                {/* Mbappé, Haaland, Bellingham */}
                            </View>
                        </View>

                        <View style={styles.gridRow}>
                            <View style={styles.gridBox}>
                                <Text style={styles.sectionTitle}>Most Goals</Text>
                                {/* Pelé, Ronaldo, Messi */}
                            </View>
                            <View style={styles.gridBox}>
                                <Text style={styles.sectionTitle}>Most Appearances</Text>
                                {/* Pelé, Ronaldo, Messi */}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff', paddingTop: 35},
    header: {fontSize: 20, fontWeight: 'bold', color: 'green', padding: 16},
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        margin: 16,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center'
    },
    searchInput: {flex: 1, fontSize: 16},
    tabsContainer: {flexDirection: 'row', backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    tabButton: {padding: 12, flex: 1, alignItems: 'center'},
    activeTab: {borderBottomColor: 'black', borderBottomWidth: 2},
    tabText: {color: '#888'},
    activeTabText: {fontWeight: 'bold', color: 'black'},
    content: {padding: 16},
    sectionTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 8},
    card: {backgroundColor: '#f9f9f9', padding: 16, borderRadius: 10, marginBottom: 12},
    playerName: {fontWeight: 'bold', fontSize: 16, marginTop: 4},
    subText: {color: '#666', fontSize: 13},
    rowBetween: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 8},
    marketValue: {fontWeight: '600', backgroundColor: '#e3e1e1', padding: 15, borderRadius: 10, marginRight: 5},
    legacyValue: {fontWeight: '600', color: 'green', padding: 15, backgroundColor: '#d4fce7', borderRadius: 10},
    hallButton: {backgroundColor: '#f0ad00', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16},
    hallButtonText: {color: '#fff', fontWeight: 'bold'},
    gridRow: {flexDirection: 'row', gap: 8, marginBottom: 12},
    gridBox: {flex: 1, backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8}
});