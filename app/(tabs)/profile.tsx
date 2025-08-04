import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

/**
 * Profile Tab - User Profile with Twitter-like Design
 * 
 * This tab provides a Twitter-like user profile view:
 * - Profile header with avatar and user info
 * - Activity stats and engagement metrics
 * - Settings and logout functionality
 * - Clean, modern design with Twitter aesthetics
 */

// Dummy user data
const userData = {
  name: "John Doe",
  handle: "@johndoe",
  department: "Computer Science",
  faculty: "Technology",
  year: "Year 3",
  studentId: "2021/123456",
  email: "john.doe@student.oau.edu.ng",
  avatar: "👨‍🎓",
  bio: "Computer Science student at OAU. Passionate about technology and innovation. Building the future one line of code at a time.",
  location: "Obafemi Awolowo University",
  joined: "September 2021",
  verified: true,
};

// User stats
const userStats = {
  posts: 156,
  following: 342,
  followers: 289,
  announcements: 12,
};

// Profile menu items
const menuItems = [
  {
    id: 1,
    title: "Account Settings",
    icon: "settings-outline",
    color: "#1DA1F2",
  },
  {
    id: 2,
    title: "Privacy & Safety",
    icon: "shield-outline",
    color: "#17BF63",
  },
  {
    id: 3,
    title: "Notifications",
    icon: "notifications-outline",
    color: "#FAD202",
  },
  {
    id: 4,
    title: "Help & Support",
    icon: "help-circle-outline",
    color: "#794BC4",
  },
];

export default function ProfileTab() {
  /**
   * Handle logout functionality
   */
  const handleLogout = () => {
    // In a real app, this would clear authentication tokens and navigate to auth
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#14171A" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerActionButton}>
                <Ionicons name="share-outline" size={20} color="#14171A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerActionButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#14171A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{userData.avatar}</Text>
              {userData.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#1DA1F2" />
                </View>
              )}
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userHandle}>{userData.handle}</Text>
            <Text style={styles.userBio}>{userData.bio}</Text>
            
            <View style={styles.userDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color="#657786" />
                <Text style={styles.detailText}>{userData.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#657786" />
                <Text style={styles.detailText}>Joined {userData.joined}</Text>
              </View>
            </View>

            <View style={styles.userStats}>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Academic Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="school" size={20} color="#1DA1F2" />
            <Text style={styles.sectionTitle}>Academic Information</Text>
          </View>
          <View style={styles.academicCard}>
            <View style={styles.academicRow}>
              <Text style={styles.academicLabel}>Student ID:</Text>
              <Text style={styles.academicValue}>{userData.studentId}</Text>
            </View>
            <View style={styles.academicRow}>
              <Text style={styles.academicLabel}>Department:</Text>
              <Text style={styles.academicValue}>{userData.department}</Text>
            </View>
            <View style={styles.academicRow}>
              <Text style={styles.academicLabel}>Faculty:</Text>
              <Text style={styles.academicValue}>{userData.faculty}</Text>
            </View>
            <View style={styles.academicRow}>
              <Text style={styles.academicLabel}>Year:</Text>
              <Text style={styles.academicValue}>{userData.year}</Text>
            </View>
            <View style={styles.academicRow}>
              <Text style={styles.academicLabel}>Email:</Text>
              <Text style={styles.academicValue}>{userData.email}</Text>
            </View>
          </View>
        </View>

        {/* Activity Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="analytics" size={20} color="#17BF63" />
            <Text style={styles.sectionTitle}>Activity Overview</Text>
          </View>
          <View style={styles.activityGrid}>
            <View style={styles.activityCard}>
              <Ionicons name="notifications" size={24} color="#1DA1F2" />
              <Text style={styles.activityNumber}>{userStats.announcements}</Text>
              <Text style={styles.activityLabel}>Announcements</Text>
            </View>
            <View style={styles.activityCard}>
              <Ionicons name="flame" size={24} color="#FAD202" />
              <Text style={styles.activityNumber}>8</Text>
              <Text style={styles.activityLabel}>Buzz Posts</Text>
            </View>
            <View style={styles.activityCard}>
              <Ionicons name="calendar" size={24} color="#17BF63" />
              <Text style={styles.activityNumber}>5</Text>
              <Text style={styles.activityLabel}>Events</Text>
            </View>
            <View style={styles.activityCard}>
              <Ionicons name="trophy" size={24} color="#794BC4" />
              <Text style={styles.activityNumber}>3</Text>
              <Text style={styles.activityLabel}>Achievements</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={20} color="#657786" />
            <Text style={styles.sectionTitle}>Settings</Text>
          </View>
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={16} color="#657786" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>OAU Campus Hub</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Campus announcement and buzz platform for Obafemi Awolowo University students
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerActionButton: {
    padding: 8,
  },
  profileInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    fontSize: 80,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#14171A",
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    color: "#657786",
    marginBottom: 12,
  },
  userBio: {
    fontSize: 16,
    color: "#14171A",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#657786",
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14171A",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#657786",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14171A",
    marginLeft: 8,
  },
  academicCard: {
    backgroundColor: "#F7F9FA",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  academicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  academicLabel: {
    fontSize: 14,
    color: "#657786",
    fontWeight: "500",
  },
  academicValue: {
    fontSize: 14,
    color: "#14171A",
    fontWeight: "600",
  },
  activityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  activityCard: {
    width: (width - 52) / 2,
    backgroundColor: "#F7F9FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  activityNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#14171A",
    marginTop: 8,
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 12,
    color: "#657786",
    textAlign: "center",
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F7F9FA",
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: "#14171A",
    fontWeight: "500",
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: "#E0245E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  appInfo: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14171A",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: "#657786",
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: "#657786",
    textAlign: "center",
    lineHeight: 20,
  },
}); 