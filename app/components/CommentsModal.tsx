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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePosts, { Comment } from "../hooks/usePosts";

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  postId: number;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ visible, onClose, postId }) => {
  const [comment, setComment] = useState("");
  const insets = useSafeAreaInsets();
  const { fetchComments, handleComment, comments } = usePosts();

  useEffect(() => {
    if (postId && visible) {
      fetchComments(postId);
    }
  }, [postId, visible]);

  const handleSend = async () => {
    if (!comment.trim()) return;
    await handleComment(postId, comment);
    setComment("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 0}
      >
        <View style={[styles.container, { paddingTop: Platform.OS === "ios" ? insets.top + 10 : 30 }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Comments</Text>
            <View style={{ width: 30 }} />
          </View>

          {/* Comments List */}
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {(comments[postId] || []).map((c: Comment) => (
              <View key={c.id} style={styles.commentCard}>
                <Text style={styles.commentAuthor}>
                  {c.author?.username ?? "Anonymous"}
                </Text>
                <Text style={styles.commentText}>{c.content}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={[styles.inputWrapper, { marginBottom: Platform.OS === "ios" ? insets.bottom + 15 : 15 }]}>
            <TextInput
              style={styles.textInput}
              placeholder="Write a comment..."
              placeholderTextColor="#aaa"
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={22} color="#fff" />
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
  headerButton: { padding: 4 },
  title: { color: "#ffffff", fontSize: 18, textAlign: "center", flex: 1, fontWeight: "600" },
  scrollContent: { flexGrow: 1 },
  commentCard: { backgroundColor: "#161b22", padding: 10, borderRadius: 8, marginBottom: 10 },
  commentAuthor: { color: "#58a6ff", fontWeight: "600" },
  commentText: { color: "#c9d1d9", marginTop: 4 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#161b22", borderRadius: 25, paddingHorizontal: 15, paddingVertical: 8 },
  textInput: { flex: 1, color: "white", fontSize: 16, maxHeight: 100 },
  sendButton: { marginLeft: 10, backgroundColor: "#0d1117", padding: 8, borderRadius: 20 },
});
