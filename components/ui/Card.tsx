import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  noPadding?: boolean;
}

export function Card({ children, style, noPadding = false }: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  return (
    <View style={[
      styles.card, 
      { 
        backgroundColor: Colors[colorScheme].card,
        borderColor: Colors[colorScheme].border,
      },
      !noPadding && { padding: Layout.spacing.md },
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginBottom: Layout.spacing.md,
    ...Layout.shadows.light,
    overflow: 'hidden',
  },
});
