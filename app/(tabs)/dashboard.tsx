import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const importantAnnouncements = [
  {
    id: 1,
    title: "🚨 Emergency: Campus WiFi Maintenance",
    body: "Scheduled maintenance will affect all campus WiFi networks today from 2–4 PM.",
    time: "2 hours ago",
    priority: "high",
    department: "IT Services",
  },
  {
    id: 2,
    title: "🎓 Graduation Ceremony Update",
    body: "All graduating students must attend the briefing. Check the portal for times.",
    time: "4 hours ago",
    priority: "high",
    department: "Student Affairs",
  },
  {
    id: 3,
    title: "📚 Library Extended Hours",
    body: "Main library open till 2 AM during exams next week.",
    time: "1 day ago",
    priority: "medium",
    department: "Library Services",
  },
  {
    id: 4,
    title: "🚌 Shuttle Route Changes",
    body: "New pickup points for night shuttle services around hostel area.",
    time: "3 days ago",
    priority: "medium",
    department: "Transport Unit",
  },
  {
    id: 5,
    title: "💡 Electrical Maintenance",
    body: "Power supply to be briefly interrupted in FST building during repairs.",
    time: "6 hours ago",
    priority: "low",
    department: "Facilities Management",
  },
];

const trendingTopics = [
  { id: 1, tag: "#OAUHackathon", posts: 137 },
  { id: 2, tag: "#FuelSubsidy", posts: 208 },
  { id: 3, tag: "#LibraryAfterDark", posts: 81 },
  { id: 4, tag: "#TechWeek2025", posts: 190 },
  { id: 5, tag: "#FinalYearVibes", posts: 122 },
];

const quickFeatures = [
  { id: 1, title: "Calendar", icon: "calendar", color: "#1DA1F2" },
  { id: 2, title: "Map", icon: "map", color: "#17BF63" },
  { id: 3, title: "Portal", icon: "school", color: "#794BC4" },
  { id: 4, title: "Hotlines", icon: "call", color: "#E0245E" },
];

const faculties = [
  "Science", "Technology", "Law", "Administration", "Arts",
  "Social Sciences", "Education", "Health Sciences", "Pharmacy",
  "Agriculture", "Environmental Design"
];

export default function DashboardTab() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "#E0245E";
      case "medium": return "#FAD202";
      case "low": return "#17BF63";
      default: return "#657786";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Welcome */}
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeTitle}>Welcome back 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Explore the latest updates on campus
          </Text>
        </View>

        {/* Faculty Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.facultyScroll}>
          {faculties.map((faculty, index) => (
            <TouchableOpacity key={index} style={styles.facultyBtn}>
              <Text style={styles.facultyText}>{faculty}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Access */}
        <View style={styles.quickAccessContainer}>
          {quickFeatures.map((feature) => (
            <TouchableOpacity key={feature.id} style={styles.quickAccessItem}>
              <Ionicons name={feature.icon} size={20} color={feature.color} />
              <Text style={styles.quickAccessLabel}>{feature.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Important Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="alert-circle" size={20} color="#E0245E" />
            <Text style={styles.sectionTitle}>Important Updates</Text>
          </View>
          {importantAnnouncements.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <View
                  style={[
                    styles.priorityDot,
                    { backgroundColor: getPriorityColor(announcement.priority) },
                  ]}
                />
                <View style={styles.announcementMeta}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <Text style={styles.announcementDepartment}>
                    {announcement.department}
                  </Text>
                </View>
                <Text style={styles.announcementTime}>{announcement.time}</Text>
              </View>
              <Text style={styles.announcementBody}>{announcement.body}</Text>
            </View>
          ))}
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flame" size={20} color="#FAD202" />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>
          {trendingTopics.map((topic) => (
            <View key={topic.id} style={styles.trendingItem}>
              <View style={{
                flexDirection: 'row',
                gap: 10,
              }}>
                <Ionicons name='trending-up' size={24} color="#58a6ff"/>
                <Text style={styles.trendingTag}>{topic.tag}</Text>
              </View>
              <Text style={styles.trendingPosts}>{topic.posts} posts</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
  },
  welcomeHeader: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f0f6fc",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#8b949e",
    marginTop: 4,
  },
  facultyScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  facultyBtn: {
    backgroundColor: "#21262d",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  facultyText: {
    color: "#c9d1d9",
    fontSize: 13,
  },
  quickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  quickAccessItem: {
    alignItems: "center",
  },
  quickAccessLabel: {
    color: "#8b949e",
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f0f6fc",
    marginLeft: 8,
  },
  announcementCard: {
    backgroundColor: "#161b22",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    padding: 14,
    borderColor: "#30363d",
    borderWidth: 1,
  },
  announcementHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 8,
  },
  announcementMeta: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f6fc",
  },
  announcementDepartment: {
    fontSize: 12,
    color: "#8b949e",
  },
  announcementTime: {
    fontSize: 12,
    color: "#8b949e",
  },
  announcementBody: {
    fontSize: 13,
    color: "#c9d1d9",
    lineHeight: 20,
    marginTop: 4,
  },
  trendingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#161b22",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomColor: "#30363d",
    borderBottomWidth: 1,
  },
  trendingTag: {
    color: "#58a6ff",
    fontSize: 14,
  },
  trendingPosts: {
    color: "#8b949e",
    fontSize: 12,
  },
});
