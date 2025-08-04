import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function BuzzTab() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState("General");

  const characterCount = newPostText.length;
  const maxCharacters = 280;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleSubmitPost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      user: {
        name: "You",
        handle: "@you",
        avatar: "👤",
        department: "Student",
      },
      content: newPostText,
      time: "now",
      image: selectedImage,
      category,
      likes: 0,
      comments: 0,
      retweets: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setSelectedImage(null);
    setCategory("General");
    setShowNewPostModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Buzz</Text>
        <TouchableOpacity onPress={() => setShowNewPostModal(true)}>
          <Ionicons name="create-outline" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.avatar}>{post.user.avatar}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{post.user.name}</Text>
                <Text style={styles.userHandle}>{post.user.handle}</Text>
                <Text style={styles.categoryLabel}>{post.category}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
            <View style={styles.actionsRow}>
              <Ionicons name="heart-outline" size={18} color="#657786" />
              <Ionicons name="chatbubble-outline" size={18} color="#657786" style={styles.iconSpacing} />
              <Ionicons name="repeat-outline" size={18} color="#657786" style={styles.iconSpacing} />
              <Ionicons name="share-outline" size={18} color="#657786" style={styles.iconSpacing} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Post Modal */}
      <Modal visible={showNewPostModal} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowNewPostModal(false)}>
              <Ionicons name="close" size={24} color="#657786" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Post</Text>
            <TouchableOpacity
              style={[
                styles.postButton,
                { opacity: newPostText && characterCount <= maxCharacters ? 1 : 0.4 },
              ]}
              onPress={handleSubmitPost}
              disabled={!newPostText || characterCount > maxCharacters}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              placeholder="What's happening on campus?"
              placeholderTextColor="#657786"
              multiline
              value={newPostText}
              onChangeText={setNewPostText}
              maxLength={maxCharacters}
              style={styles.input}
            />
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
            <View style={styles.characterCount}>
              <Text>{characterCount}/{maxCharacters}</Text>
            </View>

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={20} color="#1DA1F2" />
              <Text style={styles.imageButtonText}>Add Image</Text>
            </TouchableOpacity>

            <View style={styles.categorySelector}>
              {["General", "Faculty", "Department", "Event", "Tag"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryButton,
                    category === item && styles.categoryButtonActive,
                  ]}
                  onPress={() => setCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === item && styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#14171A" },
  postCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  postHeader: { flexDirection: "row", marginBottom: 8 },
  avatar: { fontSize: 32, marginRight: 10 },
  userName: { fontWeight: "700", color: "#14171A" },
  userHandle: { color: "#657786", fontSize: 12 },
  postTime: { fontSize: 12, color: "#657786" },
  postContent: { marginTop: 4, fontSize: 16, color: "#14171A" },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    width: "60%",
  },
  iconSpacing: { marginLeft: 12 },
  modalContainer: { flex: 1, backgroundColor: "#fff" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#14171A" },
  postButton: {
    backgroundColor: "#1DA1F2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: { color: "#fff", fontWeight: "600" },
  modalContent: { padding: 16 },
  input: {
    backgroundColor: "#F7F9FA",
    borderColor: "#E1E8ED",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
  characterCount: { alignItems: "flex-end", marginTop: 4 },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  imageButtonText: {
    marginLeft: 8,
    color: "#1DA1F2",
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 12,
  },
  categorySelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  categoryButtonActive: {
    backgroundColor: "#1DA1F2",
    borderColor: "#1DA1F2",
  },
  categoryText: {
    color: "#657786",
    fontWeight: "500",
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#fff",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#1DA1F2",
    fontWeight: "600",
    marginTop: 4,
  },
});
