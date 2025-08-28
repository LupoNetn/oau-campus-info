import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PostsProvider } from "./context/PostsContext"; // adjust path
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PostsProvider>
          <SafeAreaView
            style={styles.container}
            edges={
              Platform.OS === "ios"
                ? ["top", "left", "right"]
                : ["top", "left", "right", "bottom"]
            }
          >
            <StatusBar
              style={Platform.OS === "ios" ? "light" : "dark"}
              backgroundColor={Platform.OS === "ios" ? "transparent" : "#FFFFFF"}
              translucent={Platform.OS === "ios"}
            />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: Platform.OS === "ios" ? "default" : "slide_from_right",
                gestureEnabled: Platform.OS === "ios",
                gestureDirection: "horizontal",
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="auth" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SafeAreaView>
        </PostsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
  },
});
