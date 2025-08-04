import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

export default function Index() {
  useEffect(() => {
    // Simulate app initialization and check auth status
    const timer = setTimeout(() => {
      // For demo purposes, always go to onboarding
      // In real app, check AsyncStorage for auth token
      router.replace("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Campus</Text>
            <Text style={styles.logoSub}>Info</Text>
          </View>
          <Text style={styles.tagline}>
            Your gateway to campus life
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  logoSub: {
    fontSize: 32,
    fontWeight: "300",
    color: "#FFFFFF",
    marginLeft: 8,
    opacity: 0.9,
  },
  tagline: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.8,
    fontWeight: "400",
  },
});
