/**
 * Theme tokens and colors for Smart Field Survey App.
 */

import { Platform } from 'react-native';

const primaryDark = '#2563EB'; // Blue 600
const primaryLight = '#3B82F6'; // Blue 500

export const Colors = {
  light: {
    text: '#1F2937', // Gray 800
    textSecondary: '#6B7280', // Gray 500
    background: '#F3F4F6', // Gray 100
    card: '#FFFFFF',
    tint: primaryDark,
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF', // Gray 400
    tabIconSelected: primaryDark,
    border: '#E5E7EB', // Gray 200
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  dark: {
    text: '#F9FAFB', // Gray 50
    textSecondary: '#9CA3AF', // Gray 400
    background: '#111827', // Gray 900
    card: '#1F2937', // Gray 800
    tint: primaryLight,
    icon: '#9CA3AF',
    tabIconDefault: '#4B5563', // Gray 600
    tabIconSelected: primaryLight,
    border: '#374151', // Gray 700
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
  },
};

export const Layout = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    full: 9999,
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
