import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export interface Post {
  id: number;
  title: string;
  content: string;
  [key: string]: any;
}

export interface Comment {
  id: number;
  post: number | { id: number };
  content: string;
  author?: { username: string };
  [key: string]: any;
}

type CommentsMap = Record<number, Comment[]>;

interface PostsContextType {
  posts: Post[];
  comments: CommentsMap;
  loading: boolean;
  postingComment: boolean;
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: number) => Promise<void>;
  handleComment: (postId: number, text: string) => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePostsContext = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePostsContext must be used within PostsProvider");
  return ctx;
};

interface Props {
  children: ReactNode;
}

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<CommentsMap>({});
  const [loading, setLoading] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No token");
      const res = await fetch("https://campus-info.onrender.com/v1/post/posts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.results ?? []);
    } catch (err) {
      console.warn(err);
      Alert.alert("Could not fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No token");
      const res = await fetch(`https://campus-info.onrender.com/v1/post/comments/?post_id=${postId}` , {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)
      if (!res.ok) throw new Error(await res.text());
      const allComments: Comment[] = await res.json();
      console.log(allComments)

      // Robust normalization: handle both number and object
      const normalizedPostId = Number(postId);
      const filtered = allComments.filter((c) => {
        const cPostId = typeof c.post === "number" ? c.post : c.post.id;
        return Number(cPostId) === normalizedPostId;
      });

      console.log("All comments:", allComments);
      console.log(`Filtered comments for postId ${postId}:`, filtered);

      setComments((prev) => ({ ...prev, [normalizedPostId]: filtered }));
    } catch (err) {
      console.warn(err);
      Alert.alert("Could not fetch comments.");
    }
  };

  const handleComment = async (postId: number, text: string) => {
    if (!text.trim()) return;
    setPostingComment(true);
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No token");
      const res = await fetch("https://campus-info.onrender.com/v1/post/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: postId, content: text }),
      });
      if (!res.ok) throw new Error(await res.text());
      const newComment: Comment = await res.json();
      console.log(newComment)

      const normalizedPostId = Number(postId);
      setComments((prev) => ({
        ...prev,
        [normalizedPostId]: [...(prev[normalizedPostId] || []), newComment],
      }));
    } catch (err) {
      console.warn(err);
      Alert.alert("Could not post comment.");
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        comments,
        loading,
        postingComment,
        fetchPosts,
        fetchComments,
        handleComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
