export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  
  // Component-specific spacing
  button: {
    padding: {
      small: { vertical: 8, horizontal: 16 },
      medium: { vertical: 16, horizontal: 24 },
      large: { vertical: 20, horizontal: 32 },
    },
  },
  
  input: {
    padding: { vertical: 16, horizontal: 16 },
    height: 56,
  },
  
  card: {
    padding: {
      small: 12,
      medium: 16,
      large: 24,
    },
    borderRadius: 16,
  },
  
  // Layout spacing
  layout: {
    screen: {
      padding: 20,
    },
    section: {
      marginTop: 24,
      paddingHorizontal: 20,
    },
    header: {
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
  },
  
  // Navigation spacing
  navigation: {
    header: {
      height: 56,
      paddingHorizontal: 16,
    },
    tab: {
      height: 60,
      paddingVertical: 8,
    },
  },
} as const;

export type SpacingScheme = typeof spacing; 