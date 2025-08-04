import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1DA1F2" />
      <Tabs
        screenOptions={{
          // Icon colors
          tabBarActiveTintColor: "#1DA1F2",
          tabBarInactiveTintColor: "#AAB8C2",

          // Twitter-style tab bar
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E1E8ED",
            borderTopWidth: 1,
            height: Platform.OS === "ios" ? 80 : 65,
            paddingBottom: Platform.OS === "ios" ? 25 : 10,
            paddingTop: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 5,
          },

          // Hide tab labels (Twitter style)
          tabBarShowLabel: false,

          // Header appearance
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomColor: "#E1E8ED",
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: "#14171A",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#14171A",
          },

          tabBarIconStyle: {
            marginBottom: -2,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={26} color={color} />
            ),
            headerTitle: "OAU Campus Hub",
          }}
        />

        <Tabs.Screen
          name="announcements"
          options={{
            title: "Announcements",
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications-outline" size={26} color={color} />
            ),
            headerTitle: "Announcements",
          }}
        />

        <Tabs.Screen
          name="buzz"
          options={{
            title: "Buzz",
            tabBarIcon: ({ color }) => (
              <Ionicons name="flame-outline" size={26} color={color} />
            ),
            headerShown: false, // immersive feel for Twitter-like feed
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={26} color={color} />
            ),
            headerTitle: "Profile",
          }}
        />
      </Tabs>
    </>
  );
}
