import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";
import { CustomButton } from "@/components/ui/CustomButton";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const PROFILE_PHOTO_KEY = '@profile_photo_uri';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    loadProfilePhoto();
  }, []);

  const loadProfilePhoto = async () => {
    try {
      const storedUri = await AsyncStorage.getItem(PROFILE_PHOTO_KEY);
      if (storedUri) setProfilePhoto(storedUri);
    } catch (error) {
      console.warn('Failed to load profile photo', error);
    }
  };

  const pickProfilePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setProfilePhoto(uri);
        await AsyncStorage.setItem(PROFILE_PHOTO_KEY, uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to pick a profile photo.');
    }
  };

  return (
    <ScreenContainer>
      <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Profile</Text>
      <Card style={{ alignItems: 'center', paddingVertical: 40 }}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: Colors[colorScheme].tint }]}> 
            <Text style={styles.avatarText}>MP</Text>
          </View>
        )}
        <CustomButton
          title={profilePhoto ? 'Change Photo' : 'Add Photo'}
          onPress={pickProfilePhoto}
          variant="outline"
          style={{ marginTop: Layout.spacing.md, marginBottom: Layout.spacing.md }}
        />
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
  avatarImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 4 }
});
