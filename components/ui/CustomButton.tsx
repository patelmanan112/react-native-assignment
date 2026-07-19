import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Layout, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle, 
  loading = false, 
  disabled = false,
  icon
}: CustomButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  const getBackgroundColor = () => {
    if (disabled) return Colors[colorScheme].border;
    switch (variant) {
      case 'primary': return Colors[colorScheme].tint;
      case 'secondary': return Colors[colorScheme].card;
      case 'danger': return Colors[colorScheme].error;
      case 'outline': return 'transparent';
      default: return Colors[colorScheme].tint;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors[colorScheme].textSecondary;
    switch (variant) {
      case 'primary': return '#FFFFFF';
      case 'danger': return '#FFFFFF';
      case 'secondary': return Colors[colorScheme].text;
      case 'outline': return Colors[colorScheme].tint;
      default: return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (disabled) return Colors[colorScheme].border;
    switch (variant) {
      case 'outline': return Colors[colorScheme].tint;
      case 'secondary': return Colors[colorScheme].border;
      default: return 'transparent';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' || variant === 'secondary' ? 1 : 0,
        },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[
            styles.text, 
            { color: getTextColor(), marginLeft: icon ? Layout.spacing.sm : 0 },
            textStyle
          ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.radius.md,
    ...Layout.shadows.light,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.sans,
  }
});
