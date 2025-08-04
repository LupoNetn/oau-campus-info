/**
 * Campus Platform Color Scheme
 * 
 * This color palette is specifically designed for educational/campus platforms
 * based on research showing that blue and green colors convey:
 * - Trust and reliability (important for academic institutions)
 * - Growth and learning (green represents progress)
 * - Professionalism and stability (blue tones)
 * - Community and collaboration (warm accents)
 * 
 * Color Psychology for Education:
 * - Primary Blue: Represents knowledge, trust, and academic excellence
 * - Secondary Green: Symbolizes growth, learning, and environmental awareness
 * - Neutral Grays: Provide readability and professional appearance
 * - Accent Colors: Add warmth and highlight important information
 */

export const colors = {
  // Primary Brand Colors - Professional Blue Palette
  primary: {
    50: "#EFF6FF",   // Lightest blue background
    100: "#DBEAFE",  // Very light blue
    200: "#BFDBFE",  // Light blue
    300: "#93C5FD",  // Medium light blue
    400: "#60A5FA",  // Medium blue
    500: "#3B82F6",  // Main brand blue
    600: "#2563EB",  // Darker blue for active states
    700: "#1D4ED8",  // Even darker for hover states
    800: "#1E40AF",  // Dark blue for headers
    900: "#1E3A8A",  // Darkest blue for text
  },
  
  // Secondary Colors - Growth Green Palette
  secondary: {
    50: "#F0FDF4",   // Lightest green background
    100: "#DCFCE7",  // Very light green
    200: "#BBF7D0",  // Light green
    300: "#86EFAC",  // Medium light green
    400: "#4ADE80",  // Medium green
    500: "#22C55E",  // Main brand green
    600: "#16A34A",  // Darker green for active states
    700: "#15803D",  // Even darker for hover states
    800: "#166534",  // Dark green for emphasis
    900: "#14532D",  // Darkest green for text
  },
  
  // Success Colors - Positive Actions
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },
  
  // Warning Colors - Attention Required
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },
  
  // Error Colors - Critical Issues
  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  
  // Neutral Colors - Professional Grays
  neutral: {
    50: "#F9FAFB",   // Lightest background
    100: "#F3F4F6",  // Very light gray
    200: "#E5E7EB",  // Light gray for borders
    300: "#D1D5DB",  // Medium light gray
    400: "#9CA3AF",  // Medium gray for secondary text
    500: "#6B7280",  // Medium gray for body text
    600: "#4B5563",  // Darker gray for headings
    700: "#374151",  // Dark gray for emphasis
    800: "#1F2937",  // Very dark gray
    900: "#111827",  // Darkest gray for primary text
  },
  
  // Background Colors - Clean and Professional
  background: {
    primary: "#FFFFFF",    // Main background
    secondary: "#F9FAFB",  // Secondary background
    tertiary: "#F3F4F6",   // Tertiary background
    card: "#FFFFFF",       // Card backgrounds
    modal: "#FFFFFF",      // Modal backgrounds
  },
  
  // Text Colors - Optimal Readability
  text: {
    primary: "#111827",    // Primary text (darkest)
    secondary: "#4B5563",  // Secondary text
    tertiary: "#9CA3AF",   // Tertiary text (muted)
    inverse: "#FFFFFF",    // Text on dark backgrounds
    link: "#2563EB",       // Link color
    success: "#16A34A",    // Success text
    warning: "#D97706",    // Warning text
    error: "#DC2626",      // Error text
  },
  
  // Border Colors - Subtle Separation
  border: {
    light: "#E5E7EB",      // Light borders
    medium: "#D1D5DB",     // Medium borders
    dark: "#9CA3AF",       // Dark borders
    focus: "#3B82F6",      // Focus state borders
  },
  
  // Gradient Colors - Modern Visual Appeal
  gradients: {
    primary: ["#3B82F6", "#1D4ED8"],      // Main brand gradient
    secondary: ["#22C55E", "#16A34A"],    // Success gradient
    warm: ["#F59E0B", "#D97706"],         // Warning gradient
    cool: ["#8B5CF6", "#7C3AED"],         // Purple gradient for variety
  },
  
  // Semantic Colors - Context-Specific
  semantic: {
    // Academic/Educational
    academic: "#3B82F6",      // Blue for academic content
    research: "#8B5CF6",      // Purple for research
    innovation: "#06B6D4",    // Cyan for innovation
    
    // Campus Life
    events: "#F59E0B",        // Orange for events
    sports: "#EF4444",        // Red for sports
    culture: "#EC4899",       // Pink for cultural events
    
    // Status Indicators
    online: "#22C55E",        // Green for online status
    offline: "#9CA3AF",       // Gray for offline status
    busy: "#F59E0B",          // Orange for busy status
  },
} as const;

export type ColorScheme = typeof colors; 