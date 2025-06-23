import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLeagues, usePlayers, useTeams } from '@/hooks/useFootballApi';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  favoriteTeams: number[];
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
  };
  statistics: {
    matchesWatched: number;
    predictionsMade: number;
    accuracy: number;
    favoriteLeague: string;
  };
}

export default function ProfileScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  
  const [profile, setProfile] = useState<UserProfile>({
    id: id || '12345',
    name: name || 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/100',
    joinDate: 'January 2024',
    favoriteTeams: [33, 541, 157], // Manchester United, Real Madrid, Bayern Munich
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'English',
      timezone: 'UTC+0'
    },
    statistics: {
      matchesWatched: 156,
      predictionsMade: 89,
      accuracy: 78,
      favoriteLeague: 'Premier League'
    }
  });

  const [preferences, setPreferences] = useState(profile.preferences);

  // Fetch API data
  const { data: players, loading: playersLoading, error: playersError } = usePlayers({ search: profile.name });
  const { data: teams, loading: teamsLoading, error: teamsError } = useTeams({ country: 'England' });
  const { data: leagues, loading: leaguesLoading, error: leaguesError } = useLeagues({ country: 'England' });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode
  ) => (
    <TouchableOpacity style={styles.settingItem}>
      <ThemedView style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#4A90E2" />
        <ThemedView style={styles.settingText}>
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
          {subtitle && <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>}
        </ThemedView>
      </ThemedView>
      {rightComponent}
    </TouchableOpacity>
  );

  const renderLoadingState = () => (
    <ThemedView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <ThemedText style={styles.loadingText}>Loading profile data...</ThemedText>
    </ThemedView>
  );

  const renderErrorState = (error: string) => (
    <ThemedView style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
      <ThemedText style={styles.errorText}>Error loading data</ThemedText>
      <ThemedText style={styles.errorSubtext}>{error}</ThemedText>
    </ThemedView>
  );

  if (playersLoading || teamsLoading || leaguesLoading) {
    return renderLoadingState();
  }

  if (playersError || teamsError || leaguesError) {
    return renderErrorState(playersError || teamsError || leaguesError || 'Unknown error');
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <ThemedView style={styles.profileHeader}>
        <ThemedView style={styles.avatarContainer}>
          <ThemedView style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.profileInfo}>
          <ThemedText type="title" style={styles.profileName}>
            {profile.name}
          </ThemedText>
          <ThemedText style={styles.profileEmail}>{profile.email}</ThemedText>
          <ThemedText style={styles.profileJoinDate}>
            Member since {profile.joinDate}
          </ThemedText>
          {players && players.length > 0 && (
            <ThemedText style={styles.playerInfo}>
              Player ID: {players[0].id} • Age: {players[0].age}
            </ThemedText>
          )}
        </ThemedView>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </ThemedView>

      {/* API Data Section */}
      {players && players.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Player Information
          </ThemedText>
          <ThemedView style={styles.playerCard}>
            <ThemedText style={styles.playerName}>{players[0].name}</ThemedText>
            <ThemedText style={styles.playerDetails}>
              {players[0].firstname} {players[0].lastname}
            </ThemedText>
            <ThemedText style={styles.playerDetails}>
              Nationality: {players[0].nationality.name}
            </ThemedText>
            <ThemedText style={styles.playerDetails}>
              Age: {players[0].age} • Height: {players[0].height || 'N/A'}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}

      {/* Statistics Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Your Statistics
        </ThemedText>
        <ThemedView style={styles.statsGrid}>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{profile.statistics.matchesWatched}</ThemedText>
            <ThemedText style={styles.statLabel}>Matches Watched</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{profile.statistics.predictionsMade}</ThemedText>
            <ThemedText style={styles.statLabel}>Predictions</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{profile.statistics.accuracy}%</ThemedText>
            <ThemedText style={styles.statLabel}>Accuracy</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{profile.statistics.favoriteLeague}</ThemedText>
            <ThemedText style={styles.statLabel}>Favorite League</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Available Teams Section */}
      {teams && teams.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Available Teams ({teams.length})
          </ThemedText>
          <ThemedView style={styles.teamsContainer}>
            {teams.slice(0, 5).map((team) => (
              <ThemedView key={team.id} style={styles.teamItem}>
                <ThemedView style={styles.teamInfo}>
                  <ThemedText style={styles.teamName}>{team.name}</ThemedText>
                  <ThemedText style={styles.teamLeague}>{team.country}</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.addTeamButton}>
                  <Ionicons name="add-circle" size={20} color="#4A90E2" />
                </TouchableOpacity>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      )}

      {/* Available Leagues Section */}
      {leagues && leagues.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Available Leagues ({leagues.length})
          </ThemedText>
          <ThemedView style={styles.leaguesContainer}>
            {leagues.slice(0, 3).map((league) => (
              <ThemedView key={league.id} style={styles.leagueItem}>
                <ThemedText style={styles.leagueName}>{league.name}</ThemedText>
                <ThemedText style={styles.leagueCountry}>{league.country.name}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      )}

      {/* Settings Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Settings
        </ThemedText>
        
        {renderSettingItem(
          'notifications',
          'Push Notifications',
          'Get alerts for matches and updates',
          <Switch
            value={preferences.notifications}
            onValueChange={() => togglePreference('notifications')}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
            thumbColor={preferences.notifications ? '#fff' : '#f4f3f4'}
          />
        )}

        {renderSettingItem(
          'moon',
          'Dark Mode',
          'Switch to dark theme',
          <Switch
            value={preferences.darkMode}
            onValueChange={() => togglePreference('darkMode')}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
            thumbColor={preferences.darkMode ? '#fff' : '#f4f3f4'}
          />
        )}

        {renderSettingItem(
          'language',
          'Language',
          preferences.language,
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}

        {renderSettingItem(
          'time',
          'Timezone',
          preferences.timezone,
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}
      </ThemedView>

      {/* Account Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Account
        </ThemedText>
        
        {renderSettingItem(
          'person',
          'Edit Profile',
          'Update your personal information',
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}

        {renderSettingItem(
          'lock-closed',
          'Privacy Settings',
          'Manage your privacy preferences',
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}

        {renderSettingItem(
          'help-circle',
          'Help & Support',
          'Get help and contact support',
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}

        {renderSettingItem(
          'document-text',
          'Terms of Service',
          'Read our terms and conditions',
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}

        {renderSettingItem(
          'shield-checkmark',
          'Privacy Policy',
          'Read our privacy policy',
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}
      </ThemedView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#ff6b6b" />
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  profileJoinDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  playerInfo: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  playerCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  playerDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  teamsContainer: {
    gap: 12,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  teamLeague: {
    fontSize: 14,
    color: '#666',
  },
  addTeamButton: {
    padding: 4,
  },
  leaguesContainer: {
    gap: 12,
  },
  leagueItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  leagueCountry: {
    fontSize: 14,
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});
