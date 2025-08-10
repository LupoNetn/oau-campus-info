// Announcements.jsx
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import useAuth from "../hooks/useAuth";
import AnnouncementsModal from "../components/AnnouncementsModal";
import * as SecureStore from "expo-secure-store";

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
];

const Announcements = () => {
  const { user, loading: authLoading } = useAuth();
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);          // was null / named post before — must be array
  const [fetching, setFetching] = useState(false);

  // Fetch posts from API (GET)
  const fetchPosts = async () => {
    console.log("[Announcements] fetchPosts: start");
    setFetching(true);
    try {
      const token = await SecureStore.getItemAsync("access_token"); // adjust key if different
      console.log("[Announcements] token present:", !!token);

      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      console.log("[Announcements] Fetching posts with headers:", Object.keys(headers));
      const response = await fetch("https://campus-info.onrender.com/v1/post/posts/", {
        method: "GET",
        headers,
      });

      console.log("[Announcements] response.status:", response.status, "ok:", response.ok);

      // Try parse JSON; some APIs return [] or { results: [] }
      const data = await response.json().catch((err) => {
        console.warn("[Announcements] JSON parse error:", err);
        return null;
      });

      console.log("[Announcements] raw data:", data);

      if (!response.ok) {
        // If backend returned error object
        const errText = typeof data === "object" ? JSON.stringify(data) : String(data);
        throw new Error(`API error: ${response.status} - ${errText}`);
      }

      // If API wraps results e.g. { results: [...] }
      const normalized = Array.isArray(data) ? data : data?.results ?? [];
      console.log("[Announcements] normalized posts length:", normalized.length);

      setPosts(normalized);
    } catch (err) {
      console.warn("[Announcements] fetchPosts error:", err);
      // fallback to demo data so UI doesn't break (optional)
      // setPosts(demoAnnouncements);
    } finally {
      setFetching(false);
      console.log("[Announcements] fetchPosts: finished");
    }
  };

  // run once on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Refresh handler for pull-to-refresh
  const onRefresh = async () => {
    await fetchPosts();
  };

  // header icon click
  const renderHeaderIcon = () => {
    if (user?.role === "broadcaster") {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log("[Announcements] open modal");
            setVisible(true);
          }}
        >
          <Ionicons name="create-outline" size={25} color="#f0f6fc" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={25} color="#f0f6fc" />
      </TouchableOpacity>
    );
  };

  // modal close and refresh posts
  const handleModalClose = () => {
    console.log("[Announcements] modal closed - refreshing posts");
    setVisible(false);
    fetchPosts();
  };

  if (authLoading || fetching) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading announcements…</Text>
        <Text style={{ color: "#8b949e", marginTop: 8 }}>Check console for debug logs.</Text>
      </View>
    );
  }

  console.log("[Announcements] render - posts length:", posts.length);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Ionicons name="person-circle-outline" size={25} color="#f0f6fc" />
        <Ionicons name="school" size={25} color="#f0f6fc" />
        {renderHeaderIcon()}
      </View>

      {/* Announcements list with pull-to-refresh */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefresh} tintColor="#58a6ff" />}
      >
        {posts && posts.length > 0 ? (
          posts.map((p, i) => {
            // defensive mapping in case API shape differs
            const id = p.id ?? p.pk ?? i;
            const title = p.title ?? p.heading ?? "";
            const body = p.content ?? p.body ?? p.text ?? "";
            const author = p.author?.username ?? p.author?.name ?? p.author ?? "Unknown";
            const dateRaw = p.created_at ?? p.date ?? p.published_at ?? p.timestamp ?? null;
            let dateString = "";
            if (dateRaw) {
              try {
                dateString = new Date(dateRaw).toDateString();
              } catch (e) {
                dateString = String(dateRaw);
              }
            }

            return (
              <View key={id} style={styles.announcementCard}>
                <Ionicons name="person-circle" size={40} color="#f0f6fc" style={styles.avatar} />
                <View style={styles.content}>
                  <View style={styles.metaRow}>
                    <Text style={styles.author}>{author}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.date}>{dateString}</Text>
                  </View>

                  {/* show title if present, otherwise body */}
                  {title ? <Text style={[styles.body, { fontWeight: "700", marginBottom: 6 }]}>{title}</Text> : null}
                  <Text style={styles.body}>{body}</Text>

                  {/* Interaction Buttons */}
                  <View style={styles.actionsRow}>
                    <ActionButton icon="chatbubble-outline" label="Reply" />
                    <ActionButton icon="repeat-outline" label="Repost" />
                    <ActionButton icon="heart-outline" label="Like" />
                    <ActionButton icon="bookmark-outline" />
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          // no posts
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#8b949e" }}>No announcements yet.</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal (pass both props for compatibility) */}
      <AnnouncementsModal
        visible={visible}
        onClose={handleModalClose}
        onRequestClose={handleModalClose}
      />
    </View>
  );
};

const ActionButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Ionicons name={icon} size={18} color="#8b949e" />
    {label && <Text style={styles.actionText}>{label}</Text>}
  </TouchableOpacity>
);

export default Announcements;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0d1117",
    flex: 1,
    paddingTop: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1117",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  announcementCard: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  avatar: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  author: {
    color: "#f0f6fc",
    fontWeight: "bold",
    fontSize: 15,
  },
  dot: {
    color: "#8b949e",
    marginHorizontal: 6,
  },
  date: {
    color: "#8b949e",
    fontSize: 13,
  },
  body: {
    color: "#c9d1d9",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 30,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    color: "#8b949e",
    fontSize: 13,
    marginLeft: 4,
  },
});
