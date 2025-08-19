#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing iOS Compatibility...\n');

// Check if we're in the right directory
if (!fs.existsSync('app.json')) {
  console.error('❌ Error: app.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check iOS configuration
console.log('📱 Checking iOS Configuration...');
try {
  const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
  
  if (appJson.expo.ios) {
    console.log('✅ iOS configuration found');
    console.log(`   Bundle ID: ${appJson.expo.ios.bundleIdentifier || 'Not set'}`);
    console.log(`   Supports Tablet: ${appJson.expo.ios.supportsTablet}`);
    
    if (appJson.expo.ios.infoPlist) {
      console.log('✅ iOS Info.plist configuration found');
    }
  } else {
    console.log('❌ iOS configuration missing');
  }
} catch (error) {
  console.error('❌ Error reading app.json:', error.message);
}

// Check dependencies
console.log('\n📦 Checking Dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'expo',
    'react-native',
    'react-native-safe-area-context',
    'expo-status-bar'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: Missing`);
    }
  });
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
}

// Check iOS-specific files
console.log('\n📁 Checking iOS-specific Files...');
const iosFiles = [
  'metro.config.js',
  'ios-config.js'
];

iosFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Check components for iOS compatibility
console.log('\n🔧 Checking Component iOS Compatibility...');
const componentDir = path.join(__dirname, '..', 'app', 'components');
if (fs.existsSync(componentDir)) {
  const components = fs.readdirSync(componentDir).filter(file => file.endsWith('.tsx'));
  
  components.forEach(component => {
    const content = fs.readFileSync(path.join(componentDir, component), 'utf8');
    if (content.includes('Platform.OS === "ios"') || content.includes('Platform.select')) {
      console.log(`✅ ${component}: iOS compatibility found`);
    } else {
      console.log(`⚠️  ${component}: iOS compatibility not verified`);
    }
  });
}

console.log('\n🎯 iOS Compatibility Check Complete!');
console.log('\nNext steps:');
console.log('1. Run: npm run ios');
console.log('2. Test on iOS Simulator');
console.log('3. Test on physical iOS device');
console.log('4. Check for any remaining issues'); 