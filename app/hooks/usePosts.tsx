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

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());

      if (media) {
        // Extract filename from URI
        const uriParts = media.split('/');
        const fileName = uriParts[uriParts.length - 1];

        // Infer mime type based on extension
        const fileExt = fileName.split('.').pop().toLowerCase();
        let mimeType = "image/jpeg"; // default

        if (fileExt === "png") mimeType = "image/png";
        else if (fileExt === "jpg" || fileExt === "jpeg") mimeType = "image/jpeg";

        formData.append("image", {
          uri: media,
          name: fileName,
          type: mimeType,
        });
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // DO NOT set Content-Type here, fetch will set it automatically with FormData boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to post");
      }

      const postData = await response.json();
      console.log("✅ Post successful:", postData);
      return postData;

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
      const normalized = Array.isArray(data) ? data : data?.results ?? [];

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
