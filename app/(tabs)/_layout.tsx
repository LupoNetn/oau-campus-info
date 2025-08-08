import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      // Set Android system navigation and status bar color
      SystemUI.setBackgroundColorAsync("#0d1117");
    }
  }, []);

  return (
    <>
      {/* Status bar (top system bar) */}
      <StatusBar style="light" backgroundColor="#0d1117" translucent={false} />

      <Tabs
        screenOptions={{
          // Icon colors
          tabBarActiveTintColor: "#2f81f7",     // vibrant blue
          tabBarInactiveTintColor: "#8b949e",   // muted gray

          // Header (if shown)
          headerShown: false,

          // Dark tab bar styling (GitHub/X style)
          tabBarStyle: {
            backgroundColor: "#0d1117",
            borderTopColor: "#161b22",
            height: Platform.OS === "ios" ? 80 : 65,
            paddingBottom: Platform.OS === "ios" ? 25 : 10,
            paddingTop: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 5,
          },

          // No tab labels (clean look)
          tabBarShowLabel: false,

          // Optional header styles (if headerShown: true later)
          headerStyle: {
            backgroundColor: "#0d1117",
            borderBottomColor: "#161b22",
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: "#f0f6fc",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#f0f6fc",
          },

          tabBarIconStyle: {
            marginBottom: -2,
          },
        }}
      >
       
        <Tabs.Screen
          name="announcements"
          options={{
            title: "Announcements",
            tabBarIcon: ({ color }) => (
              <Ionicons name="flame-outline" size={26} color={color} />
            ),
          }}
        />

         <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={26} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={26} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
