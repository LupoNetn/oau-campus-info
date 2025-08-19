import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
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
  const [loading, setLoading] = useState(false);     // posting new post
  const [fetching, setFetching] = useState(false);   // fetching posts
  const [postingComment, setPostingComment] = useState(false); // posting comment
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<CommentsMap>({});

  // ---------------- Post announcement ----------------
  const handlePost = async ({ title, content, media }: HandlePostArgs) => {
    if (!title.trim() || !content.trim()) {
      alert("Please add a title and some text.");
      return;
    }

    setLoading(true);
    try {
      const url = "https://campus-info.onrender.com/v1/post/posts/";
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());

      if (media) {
        const uriParts = media.split("/");
        const fileName = uriParts[uriParts.length - 1];
        const ext = fileName.split(".").pop()?.toLowerCase();
        let mimeType = "image/jpeg";
        if (ext === "png") mimeType = "image/png";

        formData.append("image", {
          uri: media,
          name: fileName,
          type: mimeType,
        } as any);
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());
      const newPost: Post = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.warn("Post error:", err);
      alert("Could not post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Fetch all posts ----------------
  const fetchPosts = async () => {
    setFetching(true);
    try {
      const url = "https://campus-info.onrender.com/v1/post/posts/";
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const normalized: Post[] = Array.isArray(data) ? data : data?.results ?? [];
      setPosts(normalized);
      return normalized;
    } catch (err) {
      console.warn("FetchPosts error:", err);
      alert("Could not load posts.");
    } finally {
      setFetching(false);
    }
  };

  // ---------------- Fetch comments for a post ----------------
  const fetchComments = async (postId: number) => {
    try {
      const url = `https://campus-info.onrender.com/v1/post/comments/`;
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());

      const all: Comment[] = await res.json();
      const filtered = all.filter((c) => c.post === postId);

      setComments((prev) => ({ ...prev, [postId]: filtered }));
      return filtered;
    } catch (err) {
      console.warn("FetchComments error:", err);
    }
  };

  // ---------------- Add comment ----------------
  const handleComment = async (postId: number, text: string) => {
    if (!text.trim()) return;
    setPostingComment(true);

    try {
      const url = `https://campus-info.onrender.com/v1/post/comments/`;
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: postId, content: text }),
      });

      if (!res.ok) throw new Error(await res.text());
      const newComment: Comment = await res.json();

      // ✅ Optimistically update state
      setComments((prev) => ({
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])],
      }));

      return newComment;
    } catch (err) {
      console.warn("Comment error:", err);
      alert("Could not send comment.");
    } finally {
      setPostingComment(false);
    }
  };

  return {
    posts,
    comments,
    loading,
    fetching,
    postingComment,
    handlePost,
    fetchPosts,
    fetchComments,
    handleComment,
  };
};

export default usePosts;
