// ModernAnnouncementsModal.jsx
// ModernAnnouncementsModal.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import usePosts from '../hooks/usePosts'

const AnnouncementsModal = ({ visible, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
   const {handlePost,loading} = usePosts()

  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 9 }).start();
    } else {
      Animated.timing(scale, { toValue: 0.85, duration: 140, useNativeDriver: true }).start();
    }
  }, [visible, scale]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMedia(null);
    setLoading(false);
  };

  const close = () => {
    resetForm();
    onClose && onClose();
  };

    // Functions to get imge from user device
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };
  // End of imae Functions

  const removeMedia = () => setMedia(null);

  // Function for creating posts
 const handlePostCreation = async () => {
  await handlePost({title,content,image: media})
  resetForm();
  oRequestClose && onRequestClose();

 }

  const CHAR_LIMIT = 2000;
  const remaining = CHAR_LIMIT - content.length;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Ionicons name="person-circle" size={36} color="#c9d1d9" />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.headerTitle}>Announce to Campus</Text>
                  <Text style={styles.headerSub}>Visible to everyone • Tap to change</Text>
                </View>
              </View>

              <TouchableOpacity onPress={onRequestClose} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color="#c9d1d9" />
              </TouchableOpacity>
            </View>

            <View style={styles.titleBlock}>
              <Ionicons name="megaphone-outline" size={20} color="#58a6ff" style={{ marginRight: 12 }} />
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Write a short, punchy title"
                placeholderTextColor="#8b949e"
                style={styles.titleInput}
                returnKeyType="next"
                maxLength={120}
              />
            </View>

            <View style={styles.contentBlock}>
              <TextInput
                value={content}
                onChangeText={(t) => setContent(t)}
                placeholder="Share details — keep it concise and useful."
                placeholderTextColor="#8b949e"
                style={[styles.contentInput]}
                multiline
                textAlignVertical="top"
                maxLength={CHAR_LIMIT}
              />

              <View style={styles.contentFooter}>
                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={takePhoto} style={styles.iconBtn}>
                    <Ionicons name="camera-outline" size={18} color="#8b949e" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pickImage} style={styles.iconBtn}>
                    <Ionicons name="images-outline" size={18} color="#8b949e" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.charCount}>{remaining}</Text>
              </View>
            </View>

            {media ? (
              <View style={styles.mediaPreview}>
                <Image source={{ uri: media }} style={styles.mediaImage} />
                <TouchableOpacity style={styles.mediaRemove} onPress={removeMedia}>
                  <Ionicons name="trash-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.8} style={styles.mediaPlaceholder} onPress={pickImage}>
                <Ionicons name="cloud-upload-outline" size={26} color="#58a6ff" />
                <Text style={styles.mediaPlaceholderText}>Add image (optional)</Text>
              </TouchableOpacity>
            )}

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={resetForm}>
                <Ionicons name="trash-outline" size={16} color="#c9d1d9" />
                <Text style={styles.secondaryText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePostCreation} activeOpacity={0.9} disabled={loading || !title.trim() || !content.trim()}>
                <LinearGradient
                  colors={(!title.trim() || !content.trim()) ? ["#444759", "#36393f"] : ["#2da44e", "#238636"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={[styles.postBtn, (!title.trim() || !content.trim()) && { opacity: 0.6 }]}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.postText}>Post Announcement</Text>}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AnnouncementsModal;



const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2,6,23,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 760,
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#0d1117",
    borderWidth: 1,
    borderColor: "#21262d",
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    color: "#f0f6fc",
    fontWeight: "600",
  },
  headerSub: {
    fontSize: 12,
    color: "#8b949e",
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "transparent",
  },

  titleBlock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#071017",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#192227",
  },
  titleInput: {
    color: "#f0f6fc",
    fontSize: 16,
    flex: 1,
  },

  contentBlock: {
    backgroundColor: "#071017",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#192227",
    padding: 12,
    marginBottom: 12,
  },
  contentInput: {
    minHeight: 90,
    maxHeight: 300,
    color: "#c9d1d9",
    fontSize: 15,
  },
  contentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    backgroundColor: "#0d1117",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#161b22",
  },
  charCount: {
    color: "#8b949e",
    fontSize: 12,
  },

  mediaPlaceholder: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#22272b",
    borderRadius: 12,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#071018",
  },
  mediaPlaceholderText: {
    color: "#8b949e",
    marginTop: 8,
  },

  mediaPreview: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  mediaImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  mediaRemove: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
  mediaEdit: {
    position: "absolute",
    top: 10,
    right: 54,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 8,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#21262d",
    backgroundColor: "#071017",
  },
  secondaryText: {
    color: "#c9d1d9",
    marginLeft: 8,
    fontWeight: "600",
  },

  postBtn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  postText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
