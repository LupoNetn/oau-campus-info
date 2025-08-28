import { Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { getToken, saveToken, removeToken } from "../utils/storage";

interface AuthPayload {
  isSignIn: boolean;
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const router = useRouter();

  // Decode JWT and validate expiry
  const decodeToken = useCallback((token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // seconds
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token expired");
        return null;
      }
      return decoded;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  }, []);

  // Restore session on app start
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getToken();
        if (token) {
          const decoded = decodeToken(token);
          if (decoded) {
            setUser(decoded);
            setIsBroadcaster(decoded?.role === "broadcaster");
          } else {
            await removeToken();
            setUser(null);
            setIsBroadcaster(false);
          }
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
        Alert.alert("Error", "Failed to restore session. Please sign in again.");
      }
    };
    restoreSession();
  }, [decodeToken]);

  // Handle sign-in / signup
  const handleAuth = async ({ isSignIn, email, password, username, confirmPassword }: AuthPayload) => {
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

      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) throw new Error(typeof data === "string" ? data : data.message || "An error occurred");

      if (isSignIn) {
        const token = data.access;
        if (!token) throw new Error("No token received from server");

        await saveToken(token);
        const decoded = decodeToken(token);
        if (decoded) {
          setUser(decoded);
          setIsBroadcaster(decoded?.role === "broadcaster");
          Alert.alert("Success", "Signed in successfully!");
          router.replace("(tabs)/announcements");
        } else {
          throw new Error("Invalid or expired token received");
        }
      } else {
        Alert.alert("Account Created", "An OTP has been sent to your email.");
        setIsVerifyingOtp(true);
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (email: string) => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://campus-info.onrender.com/v1/user/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "OTP verification failed");

      const token = data.token;
      if (token) {
        await saveToken(token);
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
    } catch (err: any) {
      Alert.alert("Error", err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await removeToken();
      setUser(null);
      setIsBroadcaster(false);
      setIsVerifyingOtp(false);
      setOtp("");
      router.replace("/auth");
      Alert.alert("Success", "Logged out successfully.");
    } catch (err) {
      console.error("Logout error:", err);
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
