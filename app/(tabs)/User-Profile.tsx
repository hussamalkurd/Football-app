import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                <View style={styles.rowItem}>
                  <FontAwesome name="user-circle" size={20} color="black" />
                  <Text style={styles.playerName}>Lionel Messi</Text>
                  <FontAwesome name="star-o" size={24} color="#f1c40f" style={{ marginLeft: 'auto' }} />
                </View>
                <View style={styles.rowItem}>
                  <FontAwesome name="user-circle" size={20} color="black" />
                  <Text style={styles.playerName}>Cristiano Ronaldo</Text>
                  <FontAwesome name="star-o" size={24} color="#f1c40f" style={{ marginLeft: 'auto' }} />
                </View>
                <View style={styles.rowItem}>
                  <FontAwesome name="user-circle" size={20} color="black" />
                  <Text style={styles.playerName}>Kylian Mbappé</Text>
                  <FontAwesome name="star-o" size={24} color="#f1c40f" style={{ marginLeft: 'auto' }} />
                </View>
              </>
          )}
          {activeTab === 'Activity' && (
              <>
                <View style={styles.rowItem}>
                  <FontAwesome name="user-circle" size={20} color="black" />
                  <Text style={styles.activityText}>Viewed Mbappé&apos;s profile</Text>
                </View>
                <View style={styles.rowItem}>
                  <Ionicons name="stats-chart-outline" size={24} color="black" />
                  <Text style={styles.activityText}>Compared Messi & Ronaldo</Text>
                </View>
                <View style={styles.rowItem}>
                  <AntDesign name="staro" size={24} color="black" />
                  <Text style={styles.activityText}>You added Erling Haaland to favorites</Text>
                </View>
              </>
          )}
          {activeTab === 'Lists' && (
              <>
                <View style={styles.textContainer}>
                  <View style={[styles.iconBox]}>
                    <FontAwesome name="trophy" size={18} />
                  </View>
                  <Text style={styles.title}>My Top 10 Strikers</Text>
                  <Text style={styles.count}>10 players</Text>
                </View>
                <View style={styles.textContainer}>
                  <View style={[styles.iconBox]}>
                    <FontAwesome name="trophy" size={18} />
                  </View>
                  <Text style={styles.title}>Premier League Stars</Text>
                  <Text style={styles.count}>8 players</Text>
                </View>
                <View style={styles.textContainer}>
                  <View style={[styles.iconBox]}>
                    <FontAwesome name="trophy" size={18} />
                  </View>
                  <Text style={styles.title}>Future Ballon d&apos;Or Winners</Text>
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
    backgroundColor: '#f7f9fa',
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#1a2e35',
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#eafaf1',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#1a2e35',
    marginRight: 8,
  },
  count: {
    fontSize: 12,
    color: '#888',
    marginLeft: 'auto',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  joined: {
    color: '#b2c9d6',
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#fff',
    color: '#1a2e35',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    fontSize: 13,
    marginTop: 8,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: -28,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 2,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a2e35',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#eafaf1',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#27ae60',
  },
  tabText: {
    color: '#27ae60',
    fontWeight: '500',
    fontSize: 15,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabContent: {
    padding: 20,
    gap: 12,
  },
  upgradeBox: {
    margin: 20,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  upgradeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 17,
    color: '#1a2e35',
  },
  upgradeDesc: {
    fontSize: 13,
    marginBottom: 12,
    color: '#555',
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a2e35',
    marginLeft: 10,
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1a2e35',
    marginLeft: 10,
  },
});