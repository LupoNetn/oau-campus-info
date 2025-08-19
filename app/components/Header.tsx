import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useAuth from '../hooks/useAuth'
import React from 'react'

const Header = ({ openModal }) => {
  const { user } = useAuth()

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerButton} activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.8}>
          <Ionicons name="person-circle-outline" size={25} color="#f0f6fc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.8}>
          <Ionicons name="school" size={25} color="#f0f6fc" />
        </TouchableOpacity>
        {user?.role === "broadcaster" ? (
          <TouchableOpacity onPress={openModal} style={styles.headerButton} activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.8}>
            <Ionicons name="create-outline" size={25} color="#f0f6fc" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.headerButton} activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.8}>
            <Ionicons name="settings-outline" size={25} color="#f0f6fc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerButton: {
    padding: Platform.OS === 'ios' ? 8 : 4,
  },
})