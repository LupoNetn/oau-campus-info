import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const announcements = [
  {
    id: 1,
    title: "📚 Library Extended Hours",
    body: "The university library will be open until 2 AM during exams next week. Make use of this for better prep!",
    department: "Library Services",
    faculty: "University Services",
    date: "2024-01-15",
    time: "2h ago",
    priority: "high",
    type: "announcement",
  },
  {
    id: 2,
    title: "🎓 AI in Modern Apps - Seminar",
    body: "Join the CS dept. seminar with Dr. Sarah Johnson from MIT. Learn, connect, and enjoy refreshments!",
    department: "Computer Science",
    faculty: "Technology",
    date: "2024-01-16",
    time: "4h ago",
    priority: "medium",
    type: "event",
  },
  {
    id: 3,
    title: "💼 Career Fair Opens Soon!",
    body: "Over 50 companies are attending. Don’t miss this chance to kickstart your career.",
    department: "Career Services",
    faculty: "Student Affairs",
    date: "2024-01-20",
    time: "3d ago",
    priority: "high",
    type: "event",
  },
];

const filters = [
  { id: "all", label: "All", icon: "apps-outline" },
  { id: "faculty", label: "Faculty", icon: "school-outline" },
  { id: "department", label: "Department", icon: "business-outline" },
  { id: "events", label: "Events", icon: "calendar-outline" },
];

export default function AnnouncementsTab() {
  const [selected, setSelected] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filtered = {
    all: announcements,
    events: announcements.filter((a) => a.type === "event"),
    faculty: announcements.filter((a) => a.faculty === "Technology"),
    department: announcements.filter((a) => a.department === "Computer Science"),
  }[selected];

  const getColor = (priority: string) =>
    priority === "high" ? "#E0245E" : priority === "medium" ? "#FAD202" : "#17BF63";

  const getIcon = (priority: string) =>
    priority === "high"
      ? "alert-circle"
      : priority === "medium"
      ? "information-circle"
      : "checkmark-done";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#E6F0FA" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>📢 Campus Announcements</Text>
        <Text style={styles.headerSub}>Stay updated. Stay ahead.</Text>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterBtn, selected === f.id && styles.activeFilter]}
              onPress={() => setSelected(f.id)}
            >
              <Ionicons
                name={f.icon as any}
                size={16}
                color={selected === f.id ? "#fff" : "#657786"}
              />
              <Text style={[styles.filterText, selected === f.id && { color: "#fff" }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.cardWrap}>
          {filtered.map((a) => (
            <View key={a.id} style={styles.card}>
              <View style={[styles.priorityBar, { backgroundColor: getColor(a.priority) }]} />
              <View style={styles.cardInner}>
                <View style={styles.topRow}>
                  <Ionicons
                    name={getIcon(a.priority) as any}
                    size={18}
                    color={getColor(a.priority)}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.title}>{a.title}</Text>
                </View>
                <Text style={styles.body}>{a.body}</Text>
                <View style={styles.metaWrap}>
                  <View style={styles.badgeGroup}>
                    <Text style={styles.badge}>{a.department}</Text>
                    <Text style={styles.badgeAlt}>{a.faculty}</Text>
                  </View>
                  <Text style={styles.time}>{a.time}</Text>
                </View>
              </View>
            </View>
          ))}
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="document-text-outline" size={48} color="#999" />
              <Text style={styles.emptyTitle}>No announcements</Text>
              <Text style={styles.emptyText}>Try another filter or check back later.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "#E6F0FA",
    borderBottomWidth: 1,
    borderBottomColor: "#DDE6EE",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F1419",
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 14,
    color: "#3C3C43",
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1E8ED",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#1DA1F2",
  },
  filterText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#657786",
  },
  cardWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  priorityBar: {
    width: 6,
  },
  cardInner: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#14171A",
    flex: 1,
    flexWrap: "wrap",
  },
  body: {
    fontSize: 14,
    color: "#14171A",
    marginBottom: 10,
    lineHeight: 20,
  },
  metaWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#E1E8ED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: "#657786",
    marginRight: 6,
  },
  badgeAlt: {
    backgroundColor: "#C8E6F8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: "#1DA1F2",
  },
  time: {
    fontSize: 12,
    color: "#657786",
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 14,
    color: "#657786",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
