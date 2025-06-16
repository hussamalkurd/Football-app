import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function ProfileScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();


    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          {name}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Player ID: {id}
        </ThemedText>
      </ThemedView>
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
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
}); 