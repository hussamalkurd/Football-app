import { StyleSheet, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F4FD', dark: '#1A3A4A' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#4A90E2"
          name="person.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      
      {/* Profile Header */}
      <ThemedView style={styles.profileHeader}>
        <ThemedView style={styles.avatarContainer}>
          <IconSymbol size={80} name="person.circle.fill" color="#4A90E2" />
        </ThemedView>
        <ThemedView style={styles.profileInfo}>
          <ThemedText type="subtitle">John Doe</ThemedText>
          <ThemedText>Football Fan</ThemedText>
          <ThemedText>Member since 2023</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText>Manage your football app preferences and account settings.</ThemedText>
      
      <Collapsible title="Favorite Teams">
        <ThemedText>
          Manage your favorite football teams to get personalized updates and notifications.
        </ThemedText>
        <ThemedView style={styles.favoriteTeamsContainer}>
          <ThemedView style={styles.teamItem}>
            <ThemedText type="defaultSemiBold">Manchester United</ThemedText>
            <ThemedText>Premier League</ThemedText>
          </ThemedView>
          <ThemedView style={styles.teamItem}>
            <ThemedText type="defaultSemiBold">Real Madrid</ThemedText>
            <ThemedText>La Liga</ThemedText>
          </ThemedView>
        </ThemedView>
      </Collapsible>
      
      <Collapsible title="Notifications">
        <ThemedText>
          Customize your notification preferences for matches, scores, and team updates.
        </ThemedText>
        <ThemedView style={styles.settingItem}>
          <ThemedText>Match Alerts</ThemedText>
          <IconSymbol size={20} name="bell.fill" color="#4A90E2" />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedText>Score Updates</ThemedText>
          <IconSymbol size={20} name="bell.fill" color="#4A90E2" />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedText>Team News</ThemedText>
          <IconSymbol size={20} name="bell.slash" color="#999" />
        </ThemedView>
      </Collapsible>
      
      <Collapsible title="Account Settings">
        <ThemedText>
          Manage your account information and privacy settings.
        </ThemedText>
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText>Edit Profile</ThemedText>
          <IconSymbol size={20} name="chevron.right" color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText>Change Password</ThemedText>
          <IconSymbol size={20} name="chevron.right" color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText>Privacy Settings</ThemedText>
          <IconSymbol size={20} name="chevron.right" color="#999" />
        </TouchableOpacity>
      </Collapsible>
      
      <Collapsible title="App Settings">
        <ThemedText>
          Customize your app experience and preferences.
        </ThemedText>
        <ThemedView style={styles.settingItem}>
          <ThemedText>Dark Mode</ThemedText>
          <IconSymbol size={20} name="moon.fill" color="#4A90E2" />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedText>Language</ThemedText>
          <ThemedText>English</ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText>About</ThemedText>
          <IconSymbol size={20} name="chevron.right" color="#999" />
        </TouchableOpacity>
      </Collapsible>
    </ParallaxScrollView>
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
}); 