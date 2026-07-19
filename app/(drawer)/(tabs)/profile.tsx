import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ScreenContainer>
      <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Profile</Text>
      <Card style={{ alignItems: 'center', paddingVertical: 40 }}>
        <View style={[styles.avatar, { backgroundColor: Colors[colorScheme].tint }]}>
          <Text style={styles.avatarText}>MP</Text>
        </View>
        <Text style={[styles.name, { color: Colors[colorScheme].text }]}>Manan Patel</Text>
        <Text style={[styles.info, { color: Colors[colorScheme].textSecondary }]}>SUK250054CE070</Text>
        <Text style={[styles.info, { color: Colors[colorScheme].textSecondary }]}>Swaminarayan University</Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 4 }
});
