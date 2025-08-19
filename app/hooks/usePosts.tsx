import { useState } from "react";
import * as SecureStore from "expo-secure-store";

// ---------------- Types ----------------
export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any; // allow extra fields from API
}

export interface Comment {
  id: number;
  post: number;
  content: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any; // allow extra fields from API
}

interface HandlePostArgs {
  title: string;
  content: string;
  media?: string;
}

type CommentsMap = Record<number, Comment[]>;

const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(false);     // For posting
  const [fetching, setFetching] = useState<boolean>(false);   // For fetching posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<CommentsMap>({});  // { postId: [comments] }

  // ---------------- Post announcement ----------------
  const handlePost = async ({ title, content, media }: HandlePostArgs): Promise<Post | void> => {
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
        const fileExt = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
        let mimeType = "image/jpeg";
        if (fileExt === "png") mimeType = "image/png";
        else if (fileExt === "jpg" || fileExt === "jpeg") mimeType = "image/jpeg";

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
      return postData;
    } catch (err) {
      console.warn("Post error:", err);
      alert("Could not post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Fetch all posts ----------------
  const fetchPosts = async (): Promise<Post[] | void> => {
    setFetching(true);
    try {
      const url = "https://campus-info.onrender.com/v1/post/posts/";
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
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
  const fetchComments = async (postId: number): Promise<Comment[] | void> => {
    try {
      const url = `https://campus-info.onrender.com/v1/post/comments/`; // ✅ fixed endpoint
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(await response.text());
      const allComments: Comment[] = await response.json();

      // ✅ filter comments by postId
      const filtered = allComments.filter((c) => c.post === postId);

      setComments((prev) => ({ ...prev, [postId]: filtered }));
      return filtered;
    } catch (err) {
      console.warn("FetchComments error:", err);
      alert("Could not load comments.");
    }
  };

  // ---------------- Add comment ----------------
  const handleComment = async (postId: number, text: string): Promise<Comment | void> => {
    if (!text.trim()) return;

    try {
      const url = `https://campus-info.onrender.com/v1/post/comments/`;
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: postId,
          content: text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn("Comment post failed:", errorText);
        throw new Error(errorText);
      }

      // ✅ Refresh comments after posting
      await fetchComments(postId);
    } catch (err) {
      console.warn("Comment error:", err);
      alert("Could not send comment.");
    }
  };

  return {
    handlePost,
    fetchPosts,
    loading,
    fetching,
    posts,
    fetchComments,
    handleComment,
    comments,
  };
};

export default usePosts;
