// AuthScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import useAuth from './hooks/useAuth'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SystemUI from "expo-system-ui";

// Reusable Input Field
const InputField = ({ icon, ...props }) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
    <TextInput style={styles.input} placeholderTextColor="#999" {...props} />
    {props.secureTextEntry !== undefined && (
      <TouchableOpacity onPress={props.onToggleSecure}>
        <Ionicons
          name={props.secureTextEntry ? "eye-outline" : "eye-off-outline"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    )}
  </View>
);

// Sign In Form
const SignInForm = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, handleAuth, loading }) => (
  <View style={styles.form}>
    <InputField
      icon="mail-outline"
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <InputField
      icon="lock-closed-outline"
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword}
      onToggleSecure={() => setShowPassword(!showPassword)}
      autoCapitalize="none"
    />
    <TouchableOpacity style={styles.submitButton} onPress={handleAuth} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Sign In</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={{ marginTop: 6 }}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>
  </View>
);

// Sign Up Form
const SignUpForm = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleAuth,
  loading,
}) => (
  <View style={styles.form}>
    <InputField
      icon="person-outline"
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
      autoCapitalize="none"
    />
    <InputField
      icon="mail-outline"
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <InputField
      icon="lock-closed-outline"
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword}
      onToggleSecure={() => setShowPassword(!showPassword)}
      autoCapitalize="none"
    />
    <InputField
      icon="lock-closed-outline"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      secureTextEntry={!showConfirmPassword}
      onToggleSecure={() => setShowConfirmPassword(!showConfirmPassword)}
      autoCapitalize="none"
    />
    <TouchableOpacity style={styles.submitButton} onPress={handleAuth} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Create Account</Text>}
    </TouchableOpacity>
  </View>
);

// OTP Verification Form
const OtpVerificationForm = ({ email, otp, setOtp, handleOtpVerify, loading }) => (
  <View style={styles.form}>
    <Text style={{ fontSize: 16, marginBottom: 8 }}>Enter the OTP sent to {email}</Text>
    <InputField
      icon="key-outline"
      placeholder="Enter OTP"
      keyboardType="number-pad"
      value={otp}
      onChangeText={setOtp}
    />
    <TouchableOpacity style={styles.submitButton} onPress={handleOtpVerify} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Verify OTP</Text>}
    </TouchableOpacity>
  </View>
);

// Main Component
export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const {handleAuth,loading,handleOtpVerify,isVerifyingOtp,setOtp,setIsVerifyingOtp,otp} = useAuth()

  const gradientColors = ["#0f0f0f", "#000"];
  const bottomColor = gradientColors[gradientColors.length - 1];

  useEffect(() => {
  if (Platform.OS === "android") {
    SystemUI.setBackgroundColorAsync("#000000");
  }
}, []);

  const handleAuthentication = async () => {
    await handleAuth({isSignIn, email,password,username,confirmPassword})
  }

  const handleOtpVerification = async () => {
    await handleOtpVerify(email)
  }

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setOtp("");
    setIsVerifyingOtp(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.keyboardView, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="school" size={38} color="#667eea" />
              </View>
              <Text style={styles.logoText}>Campus Info</Text>
            </View>

            <View style={styles.authCard}>
              {!isVerifyingOtp && (
                <View style={styles.tabContainer}>
                  <TouchableOpacity style={[styles.tab, isSignIn && styles.activeTab]} onPress={() => {
                    setIsSignIn(true)
                    toggleAuthMode()
                  }}>
                    <Text style={[styles.tabText, isSignIn && styles.activeTabText]}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, !isSignIn && styles.activeTab]}
                    onPress={() => {
                      setIsSignIn(false)
                      toggleAuthMode()
                    }}
                  >
                    <Text style={[styles.tabText, !isSignIn && styles.activeTabText]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}

              {isVerifyingOtp ? (
                <OtpVerificationForm
                  email={email}
                  otp={otp}
                  setOtp={setOtp}
                  handleOtpVerify={handleOtpVerification}
                  loading={loading}
                />
              ) : isSignIn ? (
                <SignInForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  handleAuth={handleAuthentication}
                  loading={loading}
                />
              ) : (
                <SignUpForm
                  email={email}
                  setEmail={setEmail}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  handleAuth={handleAuthentication}
                  loading={loading}
                />
              )}
            </View>

            {!isVerifyingOtp && (
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={toggleAuthMode}>
                  <Text style={styles.footerLink}>{isSignIn ? "Sign Up" : "Sign In"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  backButton: { padding: 6 },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logoText: { fontSize: 24, fontWeight: "700", color: "#fff" },
  authCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  activeTab: { backgroundColor: "#667eea" },
  tabText: { fontSize: 16, fontWeight: "500", color: "#666" },
  activeTabText: { color: "#fff" },
  form: { gap: 14 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 30,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#667eea",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  forgotPasswordText: {
    color: "#667eea",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: { color: "#fff", fontSize: 15 },
  footerLink: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});
