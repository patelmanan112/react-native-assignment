import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ScreenContainer>
      <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Settings</Text>
      <Card>
        <Text style={{ color: Colors[colorScheme].textSecondary }}>
          App settings will appear here.
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
});
