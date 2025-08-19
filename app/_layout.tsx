import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top', 'left', 'right', 'bottom']}>
        <StatusBar 
          style={Platform.OS === 'ios' ? "light" : "dark"} 
          backgroundColor={Platform.OS === 'ios' ? "transparent" : "#FFFFFF"}
          translucent={Platform.OS === 'ios'}
        />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === 'ios' ? "default" : "slide_from_right",
            gestureEnabled: Platform.OS === 'ios',
            gestureDirection: "horizontal",
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
    backgroundColor: '#0d1117',
  }
})
