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
    body: "Scheduled maintenance will affect all campus WiFi networks today from 2-4 PM. Please plan accordingly.",
    time: "2 hours ago",
    priority: "high",
    department: "IT Services",
  },
  {
    id: 2,
    title: "🎓 Graduation Ceremony Update",
    body: "Important information about the upcoming graduation ceremony. All graduating students must attend the briefing.",
    time: "4 hours ago",
    priority: "high",
    department: "Student Affairs",
  },
  {
    id: 3,
    title: "📚 Library Extended Hours",
    body: "The main library will be open until 2 AM during exam period starting next week.",
    time: "1 day ago",
    priority: "medium",
    department: "Library Services",
  },
];

const quickFeatures = [
  { id: 1, title: "Academic Calendar", icon: "calendar", color: "#1DA1F2", description: "View important dates" },
  { id: 2, title: "Campus Map", icon: "map", color: "#17BF63", description: "Navigate campus" },
  { id: 3, title: "Student Portal", icon: "school", color: "#794BC4", description: "Access your account" },
  { id: 4, title: "Emergency Contacts", icon: "call", color: "#E0245E", description: "Important numbers" },
];

const trendingTopics = [
  { id: 1, topic: "#OAUExamSeason", posts: "2.3K posts" },
  { id: 2, topic: "#CampusLife", posts: "1.8K posts" },
  { id: 3, topic: "#OAUPride", posts: "1.2K posts" },
  { id: 4, topic: "#StudyGroup", posts: "890 posts" },
];

export default function DashboardTab() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#E0245E";
      case "medium":
        return "#FAD202";
      case "low":
        return "#17BF63";
      default:
        return "#657786";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome back 👋</Text>
          <Text style={styles.headerSubtitle}>Here’s what’s happening on campus</Text>
        </View>

        {/* Important Updates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="alert-circle-outline" size={20} color="#E0245E" />
            <Text style={styles.sectionTitle}>Important Updates</Text>
          </View>
          {importantAnnouncements.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.dot, { backgroundColor: getPriorityColor(item.priority) }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardMeta}>{item.department}</Text>
                </View>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          ))}
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flash-outline" size={20} color="#1DA1F2" />
            <Text style={styles.sectionTitle}>Quick Access</Text>
          </View>
          <View style={styles.grid}>
            {quickFeatures.map((feature) => (
              <TouchableOpacity key={feature.id} style={styles.gridItem}>
                <View style={[styles.iconCircle, { backgroundColor: feature.color }]}>
                  <Ionicons name={feature.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.gridTitle}>{feature.title}</Text>
                <Text style={styles.gridText}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up" size={20} color="#17BF63" />
            <Text style={styles.sectionTitle}>Trending on Campus</Text>
          </View>
          {trendingTopics.map((trend, index) => (
            <TouchableOpacity key={trend.id} style={styles.trendItem}>
              <Text style={styles.trendRank}>#{index + 1}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.trendTopic}>{trend.topic}</Text>
                <Text style={styles.trendPosts}>{trend.posts}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#AAB8C2" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1 },
  header: { padding: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 26, fontWeight: "700", color: "#14171A" },
  headerSubtitle: { fontSize: 15, color: "#657786", marginTop: 2 },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
    color: "#14171A",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
    marginTop: 5,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#14171A" },
  cardMeta: { fontSize: 13, color: "#657786" },
  cardTime: { fontSize: 12, color: "#AAB8C2" },
  cardBody: { fontSize: 14, color: "#14171A", marginTop: 4, lineHeight: 20 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  gridItem: {
    width: (width - 52) / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#14171A",
    marginBottom: 4,
    textAlign: "center",
  },
  gridText: {
    fontSize: 12,
    color: "#657786",
    textAlign: "center",
  },

  trendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: "#F5F8FA",
    borderBottomWidth: 1,
  },
  trendRank: { fontSize: 16, color: "#AAB8C2", fontWeight: "700", width: 30 },
  trendTopic: { fontSize: 16, fontWeight: "600", color: "#14171A" },
  trendPosts: { fontSize: 13, color: "#657786" },
});
