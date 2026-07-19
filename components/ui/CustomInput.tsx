import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Layout, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function CustomInput({ label, error, style, ...props }: CustomInputProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: Colors[colorScheme].textSecondary }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: Colors[colorScheme].card,
            color: Colors[colorScheme].text,
            borderColor: error ? Colors[colorScheme].error : Colors[colorScheme].border,
          },
          style
        ]}
        placeholderTextColor={Colors[colorScheme].icon}
        {...props}
      />
      {error && (
        <Text style={[styles.errorText, { color: Colors[colorScheme].error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: Layout.spacing.xs,
    fontFamily: Fonts.sans,
  },
  input: {
    borderWidth: 1,
    borderRadius: Layout.radius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    fontSize: 16,
    fontFamily: Fonts.sans,
    minHeight: 48,
  },
  errorText: {
    fontSize: 12,
    marginTop: Layout.spacing.xs,
    fontFamily: Fonts.sans,
  }
});
