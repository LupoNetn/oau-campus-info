import { useState } from "react";
import { Alert } from "react-native";
import { getToken } from "../utils/storage";

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  likes_count?: number;
  liked?: boolean;
  [key: string]: any;
}
export interface Comment {
  id: number;
  post: number;
  content: string;
  created_at?: string;
  updated_at?: string;
  author?: { username: string };
  [key: string]: any;
}

interface HandlePostArgs {
  title: string;
  content: string;
  media?: string;
}
type CommentsMap = Record<number, Comment[]>;

const usePosts = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<CommentsMap>({});

  const handlePost = async ({ title, content, media }: HandlePostArgs) => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Please add a title and some text.");
      return;
    }
    setLoading(true);
    try {
      const url = "https://campus-info.onrender.com/v1/post/posts/";
      const token = await getToken();
      if (!token) throw new Error("No authentication token found.");

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());
      if (media) {
        const uriParts = media.split("/");
        const fileName = uriParts[uriParts.length - 1];
        const ext = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
        const mimeType = ext === "png" ? "image/png" : "image/jpeg";
        formData.append("image", {
          uri: media,
          name: fileName,
          type: mimeType,
        } as any);
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error(await response.text());
      const postData: Post = await response.json();
      setPosts((prev) => [postData, ...prev]);
      return postData;
    } catch (err) {
      console.warn("Post error:", err);
      Alert.alert("Could not post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setFetching(true);
    try {
      const url = "https://campus-info.onrender.com/v1/post/posts/";
      const token = await getToken();
      if (!token) throw new Error("No authentication token found.");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const normalized: Post[] = Array.isArray(data)
        ? data
        : (data?.results ?? []);
      setPosts(normalized);
      return normalized;
    } catch (err) {
      console.warn("FetchPosts error:", err);
      Alert.alert("Could not load posts.");
    } finally {
      setFetching(false);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const url = `https://campus-info.onrender.com/v1/post/comments/`; // ✅ fixed endpoint
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const allComments: Comment[] = await response.json();

      // ✅ filter comments by postId
      const filtered = allComments.filter((c) => c.post === postId);
      setComments((prev) => ({ ...prev, [postId]: filtered }));
      return filtered;
    } catch (err) {
      console.warn("FetchComments error:", err);
      Alert.alert("Could not load comments.");
    }
  };

  const handleComment = async (postId: number, text: string) => {
    if (!text.trim()) return;
    setPostingComment(true);
    try {
      const url = "https://campus-info.onrender.com/v1/post/comments/";
      const token = await getToken();
      if (!token) throw new Error("No authentication token found.");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: postId, content: text }),
      });
      if (!response.ok) throw new Error(await response.text());
      await fetchComments(postId);
    } catch (err) {
      console.warn("Comment error:", err);
      Alert.alert("Could not send comment.");
    } finally {
      setPostingComment(false);
    }
  };

// 🔹 Like/unlike a post
const handleLike = async (postId: number) => {
  try {
    const url = "https://campus-info.onrender.com/v1/post/likes/";
    const token = await getToken();
    console.log("Using token:", token);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: postId }),
    });

    const text = await response.text();
    console.log("Like response:", response.status, text);

    if (!response.ok) throw new Error(text);

    // update state...
  } catch (err) {
    console.warn("Like error:", err);
  }
};


  // 🔹 Fetch likes for all posts
  const fetchLikes = async () => {
    try {
      const url = "https://campus-info.onrender.com/v1/post/likes/";
      const token = await getToken();
      if (!token) throw new Error("No authentication token found.");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();

      // assume API returns [{post: 1, likes_count: 5, liked: true}, ...]
      if (Array.isArray(data)) {
        setPosts((prev) =>
          prev.map((p) => {
            const found = data.find((l) => l.post === p.id);
            return found
              ? { ...p, likes_count: found.likes_count, liked: found.liked }
              : p;
          })
        );
      }
    } catch (err) {
      console.warn("FetchLikes error:", err);
    }
  };

  return {
    handlePost,
    fetchPosts,
    fetchComments,
    handleComment,
    handleLike,
    fetchLikes,
    loading,
    fetching,
    postingComment,
    posts,
    comments,
  };
};

export default usePosts;
