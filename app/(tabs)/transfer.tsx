// TransferMarket.tsx
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {green} from "react-native-reanimated/lib/typescript/Colors";

const TABS = ['Market', 'Rumors', 'History'];

export default function TransferMarket() {
    const [activeTab, setActiveTab] = useState('Market');

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Transfer Market</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={{marginRight: 8}}/>
                <TextInput placeholder="Search players..." style={styles.searchInput}/>
                <Ionicons name="filter" size={20} color="#666"/>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}>
                        <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.content}>
                {activeTab === 'Market' && (
                    <>
                        <Text style={styles.sectionTitle}>Featured Transfer</Text>
                        <View style={styles.featuredCard}>
                            <Ionicons name="person-circle-outline" size={48} color="#ccc"/>
                            <View>
                                <Text style={styles.playerName}>Erling Haaland</Text>
                                <Text style={styles.subText}>Manchester City</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <Text style={styles.marketValueNumber}>€170M </Text>
                                    <Text style={styles.marketValue}>Market Value </Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Top Market Values</Text>
                        {[
                            ['Mohamed Salah', 'Liverpool FC • Right Winger', '€55M'],
                            ['Lionel Messi', 'Inter Miami • Right Winger', '€25M'],
                            ['Karim Benzema', 'Al-Ittihad • Centre-Forward', '€20M'],
                            ['Cristiano Ronaldo', 'Al Nassr • Centre-Forward', '€15M'],
                            ['Robert Lewandowski', 'FC Barcelona • Centre-Forward', '€15M'],
                        ].map(([name, team, value]) => (
                            <View key={name} style={styles.rowItem}>
                                <Ionicons name="person-circle-outline" size={36} color="#ccc"/>
                                <View style={{flex: 1}}>
                                    <Text>{name}</Text>
                                    <Text style={styles.subText}>{team}</Text>
                                </View>
                                <Text style={[styles.marketValue, {color: 'green'} ]}>{value}</Text>
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Recent Transfers</Text>
                        {[
                            ['Kylian Mbappé', 'PSG → Real Madrid', 'Free Transfer', 'Jun 2024'],
                            ['Declan Rice', 'West Ham → Arsenal', '€116.6M', 'Jul 2023'],
                            ['Jude Bellingham', 'Dortmund → Real Madrid', '€103M', 'Jul 2023'],
                        ].map(([name, move, value, date]) => (
                            <View key={name} style={styles.rowItem}>
                                <Ionicons name="person-circle-outline" size={36} color="#ccc"/>
                                <View style={{flex: 1}}>
                                    <Text>{name}</Text>
                                    <Text style={styles.subText}>{move}</Text>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.marketValue}>{value}</Text>
                                    <Text style={styles.subText}>{date}</Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}

                {activeTab === 'Rumors' && (
                    <>
                        <Text style={styles.sectionTitle}>Transfer Rumors</Text>
                        {[
                            ['Victor Osimhen', 'Napoli • Forward', 'Chelsea and PSG bidding war exceeding €100M.', 'Medium', '2 days ago'],
                            ['Florian Wirtz', 'Bayer Leverkusen • Midfielder', 'Bayern and Man City monitoring. Valued at €130M.', 'High', 'Yesterday'],
                            ['Erling Haaland', 'Manchester City • Forward', 'Real Madrid preparing record offer for 2025.', 'Low', '5 days ago'],
                        ].map(([name, position, desc, reliability, updated]) => (
                            <View key={name} style={styles.rumorCard}>
                                <Ionicons name="person-circle-outline" size={40} color="#ccc"/>
                                <View style={{flex: 1}}>
                                    <Text>{name}</Text>
                                    <Text style={styles.subText}>{position}</Text>
                                    <Text style={{marginTop: 6}}>{desc}</Text>
                                    <Text style={styles.subText}>Reliability: {reliability}</Text>
                                </View>
                                <Text style={styles.subText}>Updated: {updated}</Text>
                            </View>
                        ))}
                    </>
                )}

                {activeTab === 'History' && (
                    <>
                        <Text style={styles.sectionTitle}>Biggest Transfers</Text>
                        {[
                            ['Neymar', 'Barcelona → PSG (2017)', '€222M'],
                            ['Kylian Mbappé', 'Monaco → PSG (2018)', '€180M'],
                            ['Philippe Coutinho', 'Liverpool → Barcelona (2018)', '€145M'],
                            ['Ousmane Dembélé', 'Dortmund → Barcelona (2017)', '€140M'],
                        ].map(([name, move, value]) => (
                            <View key={name} style={styles.rowItem}>
                                <Ionicons name="person-circle-outline" size={36} color="#ccc"/>
                                <View style={{flex: 1}}>
                                    <Text>{name}</Text>
                                    <Text style={styles.subText}>{move}</Text>
                                </View>
                                <Text style={styles.marketValue}>{value}</Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'},
    header: {padding: 16, paddingTop: 48, backgroundColor: '#fff'},
    title: {fontSize: 20, fontWeight: 'bold'},
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        margin: 16,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    playerName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    searchInput: {flex: 1, fontSize: 16},
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f9f9f9',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    tabButton: {padding: 12, flex: 1, alignItems: 'center'},
    activeTab: {borderBottomColor: 'black', borderBottomWidth: 2},
    tabText: {color: '#888'},
    activeTabText: {fontWeight: 'bold', color: 'black'},
    content: {padding: 16},
    sectionTitle: {fontSize: 16, fontWeight: 'bold', marginVertical: 12},
    featuredCard: {
        flexDirection: 'row',
        gap: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        marginBottom: 16,
    },
    rowItem: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    marketValue: {
        fontWeight: '600',
        color: 'black',
    },
    marketValueNumber: {
        fontWeight: '600',
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 20,
        marginRight: 5,
        width: 50,
    },
    subText: {color: '#666', fontSize: 13},
    rumorCard: {
        flexDirection: 'row',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        marginBottom: 16,
    },
});