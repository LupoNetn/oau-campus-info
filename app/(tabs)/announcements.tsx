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
import CommentsModal from "../components/CommentsModal";
import Header from "../components/Header";

const CLOUDINARY_CLOUD_NAME = "dbpb7sjus";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/`;

interface PostType {
  id?: string | number;
  pk?: string | number;
  title?: string;
  heading?: string;
  content?: string;
  body?: string;
  text?: string;
  image?: string;
  author?: { username?: string; name?: string } | string;
  created_at?: string;
  date?: string;
  published_at?: string;
  timestamp?: string;
  likes_count?: number;
  liked?: boolean;
}

const formatDate = (dateRaw: string): string => {
  try {
    return new Date(dateRaw).toDateString();
  } catch {
    return String(dateRaw);
  }
};

const getImageUri = (image?: string | null): string | null => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("image/upload/")) return CLOUDINARY_BASE_URL + image;
  return CLOUDINARY_BASE_URL + "image/upload/" + image;
};

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Ionicons name={icon} size={18} color="#8b949e" />
    {label && <Text style={styles.actionText}>{label}</Text>}
  </TouchableOpacity>
);

interface AnnouncementCardProps {
  post: PostType;
  index: number;
  onOpenComments: (postId: string | number) => void;
  onLike: (postId: number) => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  post,
  index,
  onOpenComments,
  onLike,
}) => {
  const id = post.id ?? post.pk ?? index;
  const title = post.title ?? post.heading ?? "";
  const body = post.content ?? post.body ?? post.text ?? "";
  const img = getImageUri(post.image);
  const author =
    typeof post.author === "string"
      ? post.author
      : post.author?.username ?? post.author?.name ?? "Unknown";
  const dateRaw =
    post.created_at ?? post.date ?? post.published_at ?? post.timestamp ?? null;
  const dateString = dateRaw ? formatDate(dateRaw) : "";

  return (
    <View key={String(id)} style={styles.announcementCard}>
      <Ionicons name="person-circle" size={40} color="#f0f6fc" style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>

        {title ? <Text style={[styles.body, styles.title]}>{title}</Text> : null}
        <Text style={styles.body}>{body}</Text>

        {img && (
          <Image source={{ uri: img }} style={styles.postImage} resizeMode="cover" />
        )}

        <View style={styles.actionsRow}>
          <ActionButton icon="chatbubble-outline" label="Reply" onPress={() => onOpenComments(id)} />
          <TouchableOpacity style={styles.actionBtn} onPress={() => onLike(Number(id))}>
            <Ionicons
              name={post.liked ? "heart" : "heart-outline"}
              size={18}
              color={post.liked ? "red" : "#8b949e"}
            />
            <Text style={styles.actionText}>{post.likes_count ?? 0}</Text>
          </TouchableOpacity>
          <ActionButton icon="bookmark-outline" />
        </View>
      </View>
    </View>
  );
};

const Announcements: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { fetching, posts, fetchPosts, fetchLikes, handleLike } = usePosts();
  const [visible, setVisible] = useState<boolean>(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | number | null>(null);

  useEffect(() => {
    (async () => {
      await fetchPosts();
      await fetchLikes();
    })();
  }, []);

  const onRefresh = useCallback(() => {
    fetchPosts();
    fetchLikes();
  }, [fetchPosts, fetchLikes]);

  const openModal = () => setVisible(true);

  const handleModalClose = () => {
    setVisible(false);
    fetchPosts();
    fetchLikes();
  };

  const handleCommentsModalClose = () => {
    setCommentsModalVisible(false);
    setSelectedPostId(null);
  };

  const handleOpenComments = (postId: string | number) => {
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
  };

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
      {/* Header */}
      <Header openModal={openModal} />

      {/* Posts */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={onRefresh} tintColor="#58a6ff" />
        }
      >
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <AnnouncementCard
              key={String(i)}
              post={post}
              index={i}
              onOpenComments={handleOpenComments}
              onLike={handleLike}
            />
          ))
        ) : (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#8b949e" }}>No announcements yet.</Text>
          </View>
        )}
      </ScrollView>

      {/* Create Announcement */}
      <AnnouncementsModal
        visible={visible}
        onRequestClose={handleModalClose}
      />

      {/* Comments */}
      <CommentsModal
        visible={commentsModalVisible}
        onClose={handleCommentsModalClose}
        postId={selectedPostId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#0d1117", flex: 1, paddingTop: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0d1117" },
  loadingText: { color: "#fff", fontSize: 16, marginTop: 10 },
  announcementCard: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  avatar: { marginRight: 12 },
  content: { flex: 1 },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  author: { color: "#f0f6fc", fontWeight: "bold", fontSize: 15 },
  dot: { color: "#8b949e", marginHorizontal: 6 },
  date: { color: "#8b949e", fontSize: 13 },
  body: { color: "#c9d1d9", fontSize: 15, lineHeight: 20, marginBottom: 10 },
  title: { fontWeight: "700", marginBottom: 6 },
  postImage: { width: "100%", height: 200, borderRadius: 10, marginTop: 8, marginBottom: 15 },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", paddingRight: 30 },
  actionBtn: { flexDirection: "row", alignItems: "center" },
  actionText: { color: "#8b949e", fontSize: 13, marginLeft: 4 },
});

export default Announcements;
