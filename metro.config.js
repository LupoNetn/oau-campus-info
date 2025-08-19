const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper asset handling for iOS
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'jpeg', 'gif', 'webp');

// Ensure proper module resolution for iOS
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config; 