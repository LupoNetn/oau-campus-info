import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const usePosts = () => {
  const [loading, setLoading] = useState(false);     // For posting
  const [fetching, setFetching] = useState(false);   // For fetching
  const [posts, setPosts] = useState([]);

  const handlePost = async ({ title, content, media }) => {
    if (!title.trim() || !content.trim()) {
      alert("Please add a title and some text.");
      return;
    }

    setLoading(true);

    try {
      const url = 'https://campus-info.onrender.com/v1/post/posts/';
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const payload = {
        title: title.trim(),
        content: content.trim(),
        ...(media ? { image: media } : {})
      };

      console.log("📤 Sending payload:", payload);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to post");
      }

      const data = await response.json();
      console.log("✅ Post successful:", data);
      return data;

    } catch (err) {
      console.warn("Post error:", err);
      alert("Could not post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setFetching(true);

    try {
      const url = 'https://campus-info.onrender.com/v1/post/posts/';
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch posts");
      }

      const data = await response.json();
      console.log("📥 Raw posts data:", data);

      // Normalize API response
      const normalized = Array.isArray(data) ? data : data?.results ?? [];
      console.log("📌 Normalized posts length:", normalized.length);

      setPosts(normalized);
      return normalized;

    } catch (err) {
      console.warn("FetchPosts error:", err);
      alert("Could not load posts.");
    } finally {
      setFetching(false);
    }
  };

  return { handlePost, fetchPosts, loading, fetching, posts };
};

export default usePosts;
