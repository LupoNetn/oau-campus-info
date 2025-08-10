import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import AnnouncementsModal from "../components/AnnouncementsModal";

const CLOUDINARY_CLOUD_NAME = "dbpb7sjus";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/`;

const Announcements = () => {
  const { user, loading: authLoading } = useAuth();
  const { fetching, posts, fetchPosts } = usePosts();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openModal = () => setVisible(true);

  const handleModalClose = () => {
    setVisible(false);
    fetchPosts();
  };

  // Compose correct image URI
  const getImageUri = (image) => {
    if (!image) return null;

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("image/upload/")) {
      return CLOUDINARY_BASE_URL + image;
    }

    return CLOUDINARY_BASE_URL + "image/upload/" + image;
  };

  const AnnouncementCard = ({ post, index }) => {
    const id = post.id ?? post.pk ?? index;
    const title = post.title ?? post.heading ?? "";
    const body = post.content ?? post.body ?? post.text ?? "";
    const img = getImageUri(post.image);
    const author = post.author?.username ?? post.author?.name ?? post.author ?? "Unknown";
    const dateRaw = post.created_at ?? post.date ?? post.published_at ?? post.timestamp ?? null;
    const dateString = dateRaw ? formatDate(dateRaw) : "";

    return (
      <View key={id} style={styles.announcementCard}>
        <Ionicons name="person-circle" size={40} color="#f0f6fc" style={styles.avatar} />
        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.date}>{dateString}</Text>
          </View>

          {title ? <Text style={[styles.body, styles.title]}>{title}</Text> : null}
          <Text style={styles.body}>{body}</Text>

          {img ? (
            <Image
              source={{ uri: img }}
              style={styles.postImage}
              resizeMode="cover"
            />
          ) : null}

          <ActionsRow />
        </View>
      </View>
    );
  };

  const ActionsRow = () => (
    <View style={styles.actionsRow}>
      <ActionButton icon="chatbubble-outline" label="Reply" />
      <ActionButton icon="repeat-outline" label="Repost" />
      <ActionButton icon="heart-outline" label="Like" />
      <ActionButton icon="bookmark-outline" />
    </View>
  );

  if (authLoading || fetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading announcements…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderActions user={user} openModal={openModal} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={onRefresh} tintColor="#58a6ff" />
        }
      >
        {posts.length > 0 ? (
          posts.map((post, i) => <AnnouncementCard key={i} post={post} index={i} />)
        ) : (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#8b949e" }}>No announcements yet.</Text>
          </View>
        )}
      </ScrollView>

      <AnnouncementsModal visible={visible} onClose={handleModalClose} onRequestClose={handleModalClose} />
    </View>
  );
};

const HeaderActions = ({ user, openModal }) => (
  <View style={styles.headerContainer}>
    <Ionicons name="person-circle-outline" size={25} color="#f0f6fc" />
    <Ionicons name="school" size={25} color="#f0f6fc" />
    {user?.role === "broadcaster" ? (
      <TouchableOpacity onPress={openModal}>
        <Ionicons name="create-outline" size={25} color="#f0f6fc" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={25} color="#f0f6fc" />
      </TouchableOpacity>
    )}
  </View>
);

const ActionButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Ionicons name={icon} size={18} color="#8b949e" />
    {label && <Text style={styles.actionText}>{label}</Text>}
  </TouchableOpacity>
);

const formatDate = (dateRaw) => {
  try {
    return new Date(dateRaw).toDateString();
  } catch {
    return String(dateRaw);
  }
};

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
    marginTop: 10,
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
  title: {
    fontWeight: "700",
    marginBottom: 6,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 8,
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

export default Announcements;
