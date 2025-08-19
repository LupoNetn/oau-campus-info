import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePosts, { Comment } from "../hooks/usePosts";

interface Props {
  visible: boolean;
  onClose: () => void;
  postId: number;
}

const CommentsModal: React.FC<Props> = ({ visible, onClose, postId }) => {
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const { fetchComments, handleComment, comments, postingComment } = usePosts();

  useEffect(() => {
    if (postId && visible) fetchComments(postId);
  }, [postId, visible]);

  const send = async () => {
    if (!text.trim()) return;
    await handleComment(postId, text);
    setText(""); // clear input
  };

  const postComments = comments[postId] || [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 0}
      >
        <View style={[styles.container, { paddingTop: Platform.OS === "ios" ? insets.top + 10 : 30 }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" color="white" size={28} />
            </TouchableOpacity>
            <Text style={styles.title}>Comments</Text>
            <View style={{ width: 28 }} />
          </View>

          {/* Comments */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {postComments.length === 0 ? (
              <Text style={styles.empty}>No comments yet</Text>
            ) : (
              postComments.map((c: Comment) => (
                <View key={c.id} style={styles.commentCard}>
                  <Text style={styles.author}>{c.author?.username ?? "Anonymous"}</Text>
                  <Text style={styles.content}>{c.content}</Text>
                </View>
              ))
            )}
          </ScrollView>

          {/* Input */}
          <View style={[styles.inputBar, { marginBottom: Platform.OS === "ios" ? insets.bottom + 15 : 15 }]}>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              placeholderTextColor="#888"
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity onPress={send} disabled={postingComment} style={styles.send}>
              {postingComment ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Ionicons name="send" size={22} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1117", paddingHorizontal: 15 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  title: { color: "#fff", fontSize: 18, fontWeight: "600" },
  empty: { color: "#aaa", fontStyle: "italic", textAlign: "center", marginTop: 20 },
  commentCard: { backgroundColor: "#161b22", padding: 10, borderRadius: 8, marginBottom: 10 },
  author: { color: "#58a6ff", fontWeight: "600" },
  content: { color: "#c9d1d9", marginTop: 4 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161b22",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  input: { flex: 1, color: "white", fontSize: 15, maxHeight: 100 },
  send: { marginLeft: 10, backgroundColor: "#238636", padding: 10, borderRadius: 20 },
});
