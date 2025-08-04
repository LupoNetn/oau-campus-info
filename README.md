# Campus Info App

A modern, well-styled React Native application for campus information and community engagement. Built with Expo Router and featuring a clean, Instagram/X-inspired design philosophy.

## Features

### 🎨 Modern Design
- Clean, minimalist interface combining Instagram's aesthetic with X's modern elements
- Responsive design that works across all screen sizes
- Smooth animations and transitions
- Consistent color scheme and typography

### 📱 Screens
- **Welcome Screen**: Beautiful splash screen with app branding
- **Onboarding**: Interactive walkthrough with multiple slides
- **Authentication**: Sign in/Sign up with social login options
- **Home**: Feature-rich dashboard with quick actions and content

### 🧩 Reusable Components
- **Button**: Multiple variants (primary, secondary, outline) with different sizes
- **Input**: Form inputs with validation states and icons
- **Card**: Flexible card component with different elevation levels

### 🎯 Key Features
- Responsive layout that adapts to different screen sizes
- Keyboard-aware forms with proper handling
- Social authentication options (Google, Apple)
- Search functionality with filters
- Event management and discovery
- Club and course information
- Real-time updates and notifications

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button component with variants
│   ├── Input.tsx       # Input component with validation
│   └── Card.tsx        # Card component with elevation
├── theme/              # Design system
│   ├── colors.ts       # Color palette and gradients
│   ├── spacing.ts      # Spacing and layout constants
│   └── typography.ts   # Typography and text styles
├── _layout.tsx         # Root layout with navigation
├── index.tsx           # Welcome/splash screen
├── onboarding.tsx      # Onboarding flow
├── auth.tsx            # Authentication screen
└── home.tsx            # Main dashboard
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd campus-info-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Design System

### Colors
The app uses a comprehensive color system with:
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Pink gradient (#f093fb to #f5576c)
- **Success**: Green gradient (#4facfe to #00f2fe)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Display**: 48px for hero text
- **Headings**: 32px, 24px, 20px, 18px
- **Body**: 16px, 18px for different contexts
- **Caption**: 12px, 14px for small text

### Spacing
- **Base units**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Component-specific**: Tailored spacing for buttons, inputs, cards

## Component Usage

### Button Component
```tsx
import Button from './components/Button';

// Primary button
<Button 
  title="Sign In" 
  onPress={handleSignIn} 
  variant="primary" 
  size="medium" 
/>

// Secondary button with icon
<Button 
  title="Continue with Google" 
  onPress={handleGoogleSignIn} 
  variant="secondary" 
  icon={<GoogleIcon />} 
/>
```

### Input Component
```tsx
import Input from './components/Input';

<Input
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  icon="mail-outline"
  keyboardType="email-address"
  error={emailError}
/>
```

### Card Component
```tsx
import Card from './components/Card';

<Card variant="elevated" padding="large">
  <Text>Card content goes here</Text>
</Card>
```

## Navigation Flow

1. **Welcome Screen** → Shows app branding and redirects to onboarding
2. **Onboarding** → Interactive walkthrough with skip option
3. **Authentication** → Sign in/Sign up with social options
4. **Home** → Main dashboard with all features

## Customization

### Adding New Screens
1. Create a new file in the `app/` directory
2. Add the screen to the Stack in `_layout.tsx`
3. Use the theme system for consistent styling

### Modifying the Theme
- Update `theme/colors.ts` for new colors
- Modify `theme/typography.ts` for text styles
- Adjust `theme/spacing.ts` for layout changes

### Adding Components
1. Create the component in `components/` directory
2. Use the theme system for styling
3. Export with proper TypeScript interfaces

## Dependencies

- **Expo Router**: File-based navigation
- **React Native**: Core framework
- **Expo Linear Gradient**: Beautiful gradients
- **React Native Safe Area Context**: Safe area handling
- **Expo Vector Icons**: Icon library

## Contributing

1. Follow the existing code style and structure
2. Use the theme system for all styling
3. Create reusable components when possible
4. Add proper TypeScript types
5. Test on multiple screen sizes

## License

This project is licensed under the MIT License.
