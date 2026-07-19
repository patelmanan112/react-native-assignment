import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
}

export function ScreenContainer({ 
  children, 
  scrollable = true, 
  style,
  contentContainerStyle 
}: ScreenContainerProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  const containerStyle = [
    styles.container,
    { backgroundColor: Colors[colorScheme].background },
    style
  ];

  if (scrollable) {
    return (
      <ScrollView 
        style={containerStyle}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[containerStyle, styles.contentContainer, contentContainerStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Layout.spacing.lg,
    flexGrow: 1,
  }
});
