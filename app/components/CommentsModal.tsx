import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostsContext, Comment } from "../context/PostsContext";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

interface Props {
  visible: boolean;
  onClose: () => void;
  postId: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CommentsModal: React.FC<Props> = ({ visible, onClose, postId }) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [savedComments, setSavedComments] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const scrollRef = useRef<ScrollView>(null);
  const { fetchComments, handleComment, comments, postingComment } =
    usePostsContext();

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const maxTranslate = 80; // fully open
  const halfTranslate = SCREEN_HEIGHT / 2;

  useEffect(() => {
    if (visible) {
      fetchComments(postId);
      translateY.value = withSpring(halfTranslate, { damping: 20 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT);
      setReplyingTo(null);
    }
  }, [visible]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = Math.max(
        maxTranslate,
        ctx.startY + event.translationY
      );
    },
    onEnd: () => {
      if (translateY.value > SCREEN_HEIGHT * 0.75) {
        runOnJS(onClose)();
      } else if (translateY.value < SCREEN_HEIGHT / 4) {
        translateY.value = withSpring(maxTranslate, { damping: 20 });
      } else {
        translateY.value = withSpring(halfTranslate, { damping: 20 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const postComments: Comment[] = comments[Number(postId)] || [];

  const handleLike = (commentId: number) => {
    setLikedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSave = (commentId: number) => {
    setSavedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const send = async () => {
    if (!text.trim()) return;
    await handleComment(postId, text, replyingTo?.id);
    setText("");
    setReplyingTo(null);
    await fetchComments(postId);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment);
    setText(`@${comment.author?.username ?? "Anonymous"} `);
  };

  const renderComment = (c: Comment, depth = 0) => (
    <View key={c.id} style={[styles.commentRow, { marginLeft: depth * 16 }]}>
      <Image
        source={{ uri: c.author?.avatar || "https://via.placeholder.com/40" }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.author}>{c.author?.username ?? "Anonymous"}</Text>
          <Text style={styles.timestamp}>
            {new Date(c.created_at || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Text style={styles.content}>{c.content}</Text>
        <View style={styles.actions}>
          <Pressable onPress={() => handleReply(c)} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={18} color="#1d9bf0" />
            <Text style={styles.actionText}>Reply</Text>
          </Pressable>
          <Pressable
            onPress={() => handleLike(c.id)}
            style={styles.actionButton}
          >
            <Ionicons
              name={likedComments.includes(c.id) ? "heart" : "heart-outline"}
              size={18}
              color={likedComments.includes(c.id) ? "#f91880" : "#1d9bf0"}
            />
            <Text style={styles.actionText}>Like</Text>
          </Pressable>
          <Pressable
            onPress={() => handleSave(c.id)}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons
              name={
                savedComments.includes(c.id) ? "bookmark" : "bookmark-outline"
              }
              size={18}
              color="#1d9bf0"
            />
            <Text style={styles.actionText}>Save</Text>
          </Pressable>
        </View>
        {c.replies?.map((r) => renderComment(r, depth + 1))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.headerButton}>
              <Ionicons name="arrow-back" color="#fff" size={24} />
            </Pressable>
            <Text style={styles.title}>Comments</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {postComments.length === 0 ? (
              <Text style={styles.empty}>
                No comments yet. Start the conversation!
              </Text>
            ) : (
              postComments.map((c) => renderComment(c))
            )}
          </ScrollView>

          <View
            style={[
              styles.inputBar,
              { marginBottom: Platform.OS === "ios" ? insets.bottom + 12 : 12 },
            ]}
          >
            {replyingTo && (
              <View style={styles.replyingTo}>
                <Text style={styles.replyingToText}>
                  Replying to @{replyingTo.author?.username ?? "Anonymous"}
                </Text>
                <Pressable onPress={() => setReplyingTo(null)}>
                  <Ionicons name="close" size={16} color="#6b7280" />
                </Pressable>
              </View>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={
                  replyingTo ? "Write your reply..." : "Add a comment..."
                }
                placeholderTextColor="#6b7280"
                value={text}
                onChangeText={setText}
                multiline
                maxLength={280}
                autoFocus
              />
              <Text style={styles.charCount}>{text.length}/280</Text>
              <Pressable
                onPress={send}
                disabled={postingComment || !text.trim()}
                style={[styles.send, { opacity: text.trim() ? 1 : 0.5 }]}
              >
                {postingComment ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Ionicons name="send" size={20} color="#fff" />
                )}
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </KeyboardAvoidingView>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    paddingHorizontal: 12,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#888",
    alignSelf: "center",
    borderRadius: 2.5,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  headerButton: { padding: 6, borderRadius: 50, backgroundColor: "#1a1a1a" },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  scrollContent: { paddingVertical: 12, paddingBottom: 20 },
  empty: {
    color: "#6b7280",
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  commentRow: {
    flexDirection: "row",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#1d9bf033",
  },
  commentContent: { flex: 1 },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  author: { color: "#1d9bf0", fontWeight: "600", fontSize: 15 },
  timestamp: { color: "#6b7280", fontSize: 12 },
  content: { color: "#e7e9ea", fontSize: 15, lineHeight: 20, marginBottom: 6 },
  actions: { flexDirection: "row", gap: 12 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  actionText: {
    color: "#1d9bf0",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "500",
  },
  inputBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#2f3336",
  },
  replyingTo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  replyingToText: { color: "#6b7280", fontSize: 13 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 4,
  },
  charCount: { color: "#6b7280", fontSize: 12, marginHorizontal: 8 },
  send: {
    backgroundColor: "#1d9bf0",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#1d9bf0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
