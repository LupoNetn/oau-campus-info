export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
  },
  
  // Font weights
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
  
  // Text styles
  text: {
    display: {
      fontSize: 48,
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: -1,
    },
    h1: {
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 1.3,
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 1.4,
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 1.6,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 1.6,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 1.4,
    },
    button: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 1.4,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 1.4,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 1.4,
    },
  },
} as const;

export type TypographyScheme = typeof typography; 