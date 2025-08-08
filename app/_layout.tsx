import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {StyleSheet} from "react-native"
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {/* Auth and Onboarding Routes */}
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        
        {/* Main App with Tab Navigation */}
        <Stack.Screen name="(tabs)" />
      </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
