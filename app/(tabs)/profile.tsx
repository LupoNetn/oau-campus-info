import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const profile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
        <Text style={styles.headerText}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="#ffffff" />
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Daniel Lupo</Text>
        <Text style={styles.username}>@danlupo</Text>
        <Text style={styles.bio}>
          Peer learning advocate. Building the future of education, one collab at a time. 🚀
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>23</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>102</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>88</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="pencil-outline" size={18} color="white" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-social-outline" size={18} color="white" />
          <Text style={styles.actionText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Posts or Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
        <View style={styles.postCard}>
          <Text style={styles.postTitle}>🚀 Launched a new session on Next.js!</Text>
          <Text style={styles.postTime}>2h ago</Text>
        </View>
        <View style={styles.postCard}>
          <Text style={styles.postTitle}>🔥 Tips for async JS in learning groups</Text>
          <Text style={styles.postTime}>1 day ago</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  username: {
    color: '#8b949e',
    fontSize: 14,
    marginBottom: 8,
  },
  bio: {
    color: '#c9d1d9',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#161b22',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#8b949e',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#238636',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  postCard: {
    backgroundColor: '#161b22',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    color: '#c9d1d9',
    fontSize: 14,
    marginBottom: 4,
  },
  postTime: {
    color: '#8b949e',
    fontSize: 12,
  },
});
