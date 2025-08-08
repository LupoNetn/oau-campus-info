import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const demoAnnouncements = [
  {
    id: 1,
    title: "Class Resumes Monday",
    body: "All 200 level students should resume lectures by 8 AM on Monday. No excuses will be tolerated.",
    author: "Faculty Officer",
    date: "2025-08-06",
  },
  {
    id: 2,
    title: "Mid-Semester Test",
    body: "The mid-semester test for MTH 102 will hold on Thursday, August 10th, at ETF Hall A by 9:00 AM.",
    author: "Department of Mathematics",
    date: "2025-08-05",
  },
  {
    id: 3,
    title: "Hostel Clean-Up",
    body: "All occupants of Fajuyi Hall are to participate in the hostel clean-up this Saturday by 7 AM.",
    author: "Hall Warden",
    date: "2025-08-04",
  },
  {
    id: 4,
    title: "Departmental Meeting",
    body: "There will be a departmental meeting for all 400 level students on Friday by 2 PM in Room 205.",
    author: "HOD, Computer Science",
    date: "2025-08-03",
  },
];

const Announcements = () => {
  return (
    <View style={styles.container}>
      {/* Header (Your icons) */}
      <View style={styles.headerContainer}>
        <Ionicons name="person-circle-outline" size={25} color="#f0f6fc" />
        <Ionicons name="school" size={25} color="#f0f6fc" />
        <Ionicons name="settings-outline" size={25} color="#f0f6fc" />
      </View>

      <ScrollView>
        {demoAnnouncements.map((post) => (
          <View key={post.id} style={styles.tweetContainer}>
            <Ionicons
              name="person-circle"
              size={40}
              color="#f0f6fc"
              style={styles.avatar}
            />

            <View style={styles.tweetContent}>
              <View style={styles.metaRow}>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.date}>
                  {new Date(post.date).toDateString()}
                </Text>
              </View>

              <Text style={styles.body}>{post.body}</Text>

              {/* Interaction buttons */}
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="chatbubble-outline" size={18} color="#8b949e" />
                  <Text style={styles.actionText}>Reply</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="repeat-outline" size={18} color="#8b949e" />
                  <Text style={styles.actionText}>Repost</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="heart-outline" size={18} color="#8b949e" />
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="bookmark-outline" size={18} color="#8b949e" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d1117',
    flex: 1,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tweetContainer: {
    marginBottom: 26,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  avatar: {
    marginRight: 12,
  },
  tweetContent: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  author: {
    color: '#f0f6fc',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dot: {
    color: '#8b949e',
    marginHorizontal: 6,
  },
  date: {
    color: '#8b949e',
    fontSize: 13,
  },
  body: {
    color: '#c9d1d9',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#8b949e',
    fontSize: 13,
    marginLeft: 4,
  },
});
