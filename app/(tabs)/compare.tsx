import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {Feather, FontAwesome} from "@expo/vector-icons";

const tabs = ['Stats', 'Attributes', 'Social Impact'];

export default function ComparePlayers() {
    const [activeTab, setActiveTab] = useState('Stats');

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
            <Text style={styles.title}>Compare Players</Text>

            {/* Top Cards */}
            <View style={styles.container}>
                <Text style={styles.title}>Compare Players</Text>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={styles.card}>

                        <Text style={styles.name}>Lionel Messi</Text>
                        <Text style={styles.club}>Inter Miami</Text>

                        <View style={styles.socialRow}>
                            <Feather name="twitter" size={16} color="#1DA1F2" />
                            <Text style={styles.socialText}>52.3M</Text>
                            <FontAwesome name="instagram" size={16} color="#C13584" style={{ marginLeft: 10 }} />
                            <Text style={styles.socialText}>493M</Text>
                        </View>

                        <View style={styles.infoBox}>
                            <Text style={styles.label}>Market Value</Text>
                            <Text style={styles.value}>€120M</Text>
                        </View>

                        <View style={[styles.infoBox, { backgroundColor: '#e6fff2' }]}>
                            <Text style={styles.label}>Legacy Value</Text>
                            <Text style={[styles.value, { color: '#00aa55' }]}>€250M</Text>
                        </View>

                        <View style={styles.removeBtn}>
                            <Text style={styles.removeText}>Remove</Text>
                        </View>
                    </View>
                    <View style={styles.card}>

                        <Text style={styles.name}>Cristiano Ronaldo</Text>
                        <Text style={styles.club}>Al Nassr</Text>

                        <View style={styles.socialRow}>
                            <Feather name="twitter" size={16} color="#1DA1F2" />
                            <Text style={styles.socialText}>108M</Text>
                            <FontAwesome name="instagram" size={16} color="#C13584" style={{ marginLeft: 10 }} />
                            <Text style={styles.socialText}>605M</Text>
                        </View>

                        <View style={styles.infoBox}>
                            <Text style={styles.label}>Market Value</Text>
                            <Text style={styles.value}>€230M</Text>
                        </View>

                        <View style={[styles.infoBox, { backgroundColor: '#e6fff2' }]}>
                            <Text style={styles.label}>Legacy Value</Text>
                            <Text style={[styles.value, { color: '#00aa55' }]}>€320M</Text>
                        </View>

                        <View style={styles.removeBtn}>
                            <Text style={styles.removeText}>Remove</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.addBox}>
                    <Text style={styles.plus}>＋</Text>
                    <Text style={styles.addText}>Add Player</Text>
                </View>

            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            <View style={styles.tabContent}>
                {activeTab === 'Stats' && (
                    <>
                        <Text style={styles.sectionTitle}>Stats Comparison</Text>
                        {[
                            { label: 'Goals', p1: 821, p2: 850 },
                            { label: 'Assists', p1: 361, p2: 273 },
                            { label: 'Appearances', p1: 1047, p2: 1175 },
                            { label: 'Trophies', p1: 42, p2: 34 },
                            { label: 'Rating', p1: 94, p2: 93 },
                        ].map((item, index) => (
                            <BarRow key={index} {...item} />
                        ))}
                    </>
                )}

                {activeTab === 'Attributes' && (
                    <>
                        <Text style={styles.sectionTitle}>Player Attributes</Text>
                        {[
                            { label: 'Pace', p1: 85, p2: 87 },
                            { label: 'Shooting', p1: 92, p2: 95 },
                            { label: 'Passing', p1: 95, p2: 82 },
                            { label: 'Dribbling', p1: 98, p2: 89 },
                            { label: 'Defending', p1: 38, p2: 35 },
                            { label: 'Physical', p1: 68, p2: 78 },
                        ].map((item, index) => (
                            <BarRow key={index} {...item} />
                        ))}
                    </>
                )}

                {activeTab === 'Social Impact' && (
                    <>
                        <Text style={styles.sectionTitle}>Social Media Impact</Text>
                        {[
                            { label: 'Twitter Followers', p1: 52.3, p2: 108, unit: 'M' },
                            { label: 'Instagram Followers', p1: 493, p2: 605, unit: 'M' },
                        ].map((item, index) => (
                            <BarRow key={index} {...item} />
                        ))}
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                Players with larger social media followings often command higher commercial value,
                                which can contribute up to 15–25% of their total legacy value through endorsements,
                                merchandising, and global influence.
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const BarRow = ({ label, p1, p2, unit = '' }: { label: string; p1: number; p2: number; unit?: string }) => {
    const max = Math.max(p1, p2);
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>{label}</Text>
            <View style={{ height: 6, backgroundColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ width: `${(p1 / max) * 100}%`, backgroundColor: 'blue', height: '100%' }} />
                <View style={{ width: `${(p2 / max) * 100}%`, backgroundColor: 'green', height: '100%', position: 'absolute' }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{p1}{unit}</Text>
                <Text>{p2}{unit}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fafafa',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },


    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
    playerCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    addBox: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        backgroundColor: '#fafafa',
    },
    plus: {
        fontSize: 32,
        color: '#aaa',
        marginBottom: 8,
    },
    addText: {
        fontSize: 16,
        color: '#666',
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    club: {
        color: '#777',
        marginBottom: 10,
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    socialText: {
        fontSize: 14,
        marginLeft: 4,
        marginRight: 10,
        color: '#333',
    },
    infoBox: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
    },
    label: {
        fontSize: 12,
        color: '#777',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeBtn: {
        marginTop: 12,
        backgroundColor: '#eee',
        paddingVertical: 6,
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
    },
    removeText: {
        fontWeight: '500',
    },
    cardsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        gap: 10,
    },

    playerName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    marketBox: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 8,
        marginBottom: 6,
    },
    marketLabel: {
        fontSize: 11,
        color: '#555',
    },
    marketValue: {
        fontWeight: 'bold',
    },
    legacyBox: {
        backgroundColor: '#eafdf3',
        padding: 10,
        borderRadius: 8,
        marginBottom: 6,
    },
    legacyValue: {
        fontWeight: 'bold',
        color: '#27ae60',
    },


    tabContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
    },
    tabText: {
        color: '#777',
    },
    activeTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    tabContent: {
        padding: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 12,
        color: '#444',
    },
});