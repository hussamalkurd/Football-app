import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import {AntDesign, Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";

const TABS = ['Favorites', 'Activity', 'Lists'];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('Favorites');

  return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome name="user-circle" size={80} color="white" />          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.joined}>Joined January 2023</Text>
          <Text style={styles.badge}>Basic Member</Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <StatBox label="Favorites" count={12} />
          <StatBox label="Comparisons" count={5} />
          <StatBox label="Lists" count={3} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
              <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
              >
                <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
              </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'Favorites' && (
              <>
                <Text><FontAwesome name="user-circle" size={20} color="black" /> Lionel Messi <FontAwesome name="star-o" size={24} color="#f1c40f" style={{ marginLeft:100}} /></Text>
                <Text><FontAwesome name="user-circle" size={20} color="black" /> Cristiano Ronaldo <FontAwesome name="star-o" size={24} color="#f1c40f" style={{ marginLeft:100}} /></Text>
                <Text><FontAwesome name="user-circle" size={20} color="black" /> Kylian Mbappé <FontAwesome name="star-o" size={24} color="#f1c40f" style={{ marginLeft:100}} /></Text>
              </>
          )}
          {activeTab === 'Activity' && (
              <>
                <Text> <FontAwesome name="user-circle" size={20} color="black" /> Viewed Mbappé's profile</Text>
                <Text><Ionicons name="stats-chart-outline" size={24} color="black" /> Compared Messi & Ronaldo</Text>
                <Text><AntDesign name="staro" size={24} color="black" /> You added Erling Haaland to favorites</Text>
              </>
          )}
          {activeTab === 'Lists' && (
              <>


                {/* Texts */}
                <View style={styles.textContainer}>
                  {/* Icon Box */}
                  <View style={[styles.iconBox,]}>
                    <FontAwesome name="trophy" size={18} />
                  </View>
                  <Text style={styles.title}>My Top 10 Strikers</Text>
                  <Text style={styles.count}>10 players</Text>
                </View>
                <View style={styles.textContainer}>
                  {/* Icon Box */}
                  <View style={[styles.iconBox,]}>
                    <FontAwesome name="trophy" size={18} />
                  </View>
                  <Text style={styles.title}>Premier League Stars</Text>
                  <Text style={styles.count}>8 players</Text>
                </View>
                <View style={styles.textContainer}>
                  {/* Icon Box */}
                  <View style={[styles.iconBox,]}>
                    <FontAwesome name="trophy" size={18} />
                  </View>
                  <Text style={styles.title}>Future Ballon d'Or Winners</Text>
                  <Text style={styles.count}>5 players</Text>
                </View>
              </>
          )}
        </View>

        {/* Upgrade Section */}
        <View style={styles.upgradeBox}>
          <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
          <Text style={styles.upgradeDesc}>
            Get access to all Pro Tools and advanced statistics to analyze players like never before.
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

const StatBox = ({ label, count }: { label: string; count: number }) => (
    <View style={styles.statBox}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  count: {
    fontSize: 12,
    color: '#666',
  },
  ar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: '#eee', // fallback if image fails
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  joined: {
    color: '#e0f2e9',
  },
  badge: {
    backgroundColor: '#27ae60',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomColor: '#27ae60',
    borderBottomWidth: 2,
  },
  tabText: {
    color: '#888',
  },
  activeTabText: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 16,
    gap: 12,
  },
  upgradeBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#eafaf1',
    borderRadius: 8,
  },
  upgradeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  upgradeDesc: {
    fontSize: 12,
    marginBottom: 12,
    color: '#333',
  },
  upgradeButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});