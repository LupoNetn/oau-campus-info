// iOS-specific configuration for better compatibility
export const iOSConfig = {
  // Safe area handling
  safeArea: {
    top: 44, // iPhone status bar height
    bottom: 34, // iPhone home indicator height
  },
  
  // iOS-specific animations
  animations: {
    duration: 300,
    easing: 'easeInOut',
  },
  
  // iOS-specific shadows
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
  },
  
  // iOS-specific touch feedback
  touchFeedback: {
    activeOpacity: 0.7,
    pressRetentionOffset: 20,
  },
  
  // iOS-specific keyboard behavior
  keyboard: {
    behavior: 'padding',
    keyboardVerticalOffset: 0,
  },
};

export default iOSConfig; 