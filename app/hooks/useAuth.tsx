import { Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "access_token";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [user, setUser] = useState(null); // Decoded user data
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const router = useRouter();

  // Decode JWT and validate expiry
  const decodeToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token expired");
        return null;
      }
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }, []);

  // Load user from stored token on app start
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          const decoded = decodeToken(token);
          if (decoded) {
            setUser(decoded);
            setIsBroadcaster(decoded?.role === "broadcaster");
          } else {
            // Clear invalid or expired token
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setUser(null);
            setIsBroadcaster(false);
          }
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        Alert.alert("Error", "Failed to restore session. Please sign in again.");
      }
    };

    restoreSession();
  }, [decodeToken]);

  // Handle sign-in or signup
  const handleAuth = async ({
    isSignIn,
    email,
    password,
    username,
    confirmPassword,
  }) => {
    // Input validation
    if (!email || !password || (!isSignIn && (!username || !confirmPassword))) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!isSignIn && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const url = isSignIn
        ? "https://campus-info.onrender.com/v1/user/login/"
        : "https://campus-info.onrender.com/v1/user/register/";

      const payload = isSignIn
        ? { email, password }
        : { email, username, password, confirm_password: confirmPassword };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();
      console.log(data)

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "An error occurred"
        );
      }

      if (isSignIn) {
        // Handle sign-in: store token and set user
        const token = data.access;
        if (!token) {
          throw new Error("No token received from server");
        }
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        const decoded = decodeToken(token);
        if (decoded) {
          setUser(decoded);
          console.log(user)
          setIsBroadcaster(decoded?.role === "broadcaster");
          Alert.alert("Success", "Signed in successfully!");
          router.replace("(tabs)/announcements");
        } else {
          throw new Error("Invalid or expired token received");
        }
      } else {
        // Handle signup: trigger OTP verification
        Alert.alert("Account Created", "An OTP has been sent to your email.");
        setIsVerifyingOtp(true);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (email) => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://campus-info.onrender.com/v1/user/verify-otp/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // Assuming backend returns a token after OTP verification
      const token = data.token;
      if (token) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        const decoded = decodeToken(token);
        if (decoded) {
          setUser(decoded);
          setIsBroadcaster(decoded?.role === "broadcaster");
          Alert.alert("Success", "Account verified and signed in!", [
            {
              text: "OK",
              onPress: () => {
                setIsVerifyingOtp(false);
                setOtp("");
                router.replace("(tabs)/announcements");
              },
            },
          ]);
        } else {
          throw new Error("Invalid or expired token received");
        }
      } else {
        Alert.alert("Success", "OTP verified. You can now sign in.", [
          {
            text: "OK",
            onPress: () => {
              setIsVerifyingOtp(false);
              setOtp("");
              router.replace("/auth");
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setUser(null);
      setIsBroadcaster(false);
      setIsVerifyingOtp(false);
      setOtp("");
      router.replace("/auth");
      Alert.alert("Success", "Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return {
    handleAuth,
    handleOtpVerify,
    logout,
    loading,
    otp,
    setOtp,
    isVerifyingOtp,
    setIsVerifyingOtp,
    user,
    isBroadcaster,
  };
};

export default useAuth;