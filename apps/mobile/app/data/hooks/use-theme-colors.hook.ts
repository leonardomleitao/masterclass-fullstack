import { useTheme } from '../contexts/theme.context';

export interface ThemeColors {
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Text
  text: string;
  textSecondary: string;
  textMuted: string;

  // Borders
  border: string;
  borderLight: string;

  // Cards
  card: string;
  cardBorder: string;

  // Input
  input: string;
  inputBorder: string;
  inputPlaceholder: string;

  // Button
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonSecondary: string;
  buttonSecondaryText: string;

  // Status
  success: string;
  error: string;
  warning: string;
  info: string;

  // Priority colors
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;

  // Tag colors
  tagBackground: string;
  tagText: string;

  // Accent
  accent: string;
  accentLight: string;
}

const lightColors: ThemeColors = {
  background: '#F3F4F6',
  backgroundSecondary: '#FFFFFF',
  backgroundTertiary: '#F9FAFB',

  text: '#1A1A1A',
  textSecondary: '#4A4A4A',
  textMuted: '#737373',

  border: '#D1D5DB',
  borderLight: '#E5E7EB',

  card: '#FFFFFF',
  cardBorder: '#E0E0E0',

  input: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputPlaceholder: '#9CA3AF',

  buttonPrimary: '#2563EB',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#F9FAFB',
  buttonSecondaryText: '#1A1A1A',

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  priorityLow: '#10B981',
  priorityMedium: '#F59E0B',
  priorityHigh: '#EF4444',

  tagBackground: '#F3F4F6',
  tagText: '#4A4A4A',

  accent: '#2563EB',
  accentLight: '#60A5FA',
};

const darkColors: ThemeColors = {
  background: '#0F0F0F',
  backgroundSecondary: '#1A1A1A',
  backgroundTertiary: '#262626',

  text: '#FAFAFA',
  textSecondary: '#D4D4D4',
  textMuted: '#9E9E9E',

  border: '#2A2A2A',
  borderLight: '#1F1F1F',

  card: '#1A1A1A',
  cardBorder: '#2A2A2A',

  input: '#1A1A1A',
  inputBorder: '#2A2A2A',
  inputPlaceholder: '#6B6B6B',

  buttonPrimary: '#3B82F6',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#262626',
  buttonSecondaryText: '#FAFAFA',

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  priorityLow: '#10B981',
  priorityMedium: '#F59E0B',
  priorityHigh: '#EF4444',

  tagBackground: '#262626',
  tagText: '#D4D4D4',

  accent: '#3B82F6',
  accentLight: '#60A5FA',
};

export function useThemeColors(): ThemeColors {
  const { isDark } = useTheme();
  return isDark ? darkColors : lightColors;
}
