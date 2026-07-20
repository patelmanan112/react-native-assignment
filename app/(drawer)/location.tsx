import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CustomButton } from "@/components/ui/CustomButton";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";

export default function LocationScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { draftSurvey, updateDraft } = useSurvey();
  
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(draftSurvey.location || null);

  async function getLocation() {
    try {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      let address: Array<{
        city?: string;
        district?: string;
        region?: string;
        street?: string;
        postalCode?: string;
        country?: string;
        subregion?: string;
      }> = [];

      try {
        address = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (reverseError) {
        console.warn('Reverse geocode failed', reverseError);
      }

      const firstAddress = address[0];
      const locData = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
        street: firstAddress?.street || 'N/A',
        district: firstAddress?.district || firstAddress?.subregion || 'N/A',
        city: firstAddress?.city || firstAddress?.subregion || firstAddress?.region || 'N/A',
        region: firstAddress?.region || firstAddress?.subregion || 'N/A',
        postalCode: firstAddress?.postalCode || 'N/A',
        country: firstAddress?.country || 'N/A',
      };

      setLocation(locData);
      updateDraft({ location: locData });
    } catch (error) {
      console.warn('Unable to fetch location', error);
      Alert.alert('Error', 'Unable to fetch location.');
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = async () => {
    if (!location) return;
    const textToCopy = `Lat: ${location.latitude}, Lon: ${location.longitude}\nAddress: ${location.street || ''} ${location.city || ''}`;
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("Success", "Location copied to clipboard!");
  };

  const useLocationForSurvey = () => {
    if (!location) {
      Alert.alert('Error', 'Please fetch the location first.');
      return;
    }

    updateDraft({ location });

    try {
      router.push('/(drawer)/contacts' as any);
    } catch (error) {
      console.warn('Failed to navigate to contacts screen', error);
      Alert.alert('Success', 'Location attached to survey draft');
    }
  };

  return (
    <ScreenContainer>
      <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Current Location</Text>

      <CustomButton 
        title="Get Current Location" 
        onPress={getLocation} 
        loading={loading}
      />

      {location && (
        <Card style={styles.card}>
          <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Location Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Latitude :</Text>
            <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>{location.latitude?.toFixed(6)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Longitude :</Text>
            <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>{location.longitude?.toFixed(6)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🎯 Accuracy :</Text>
            <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>± {location.accuracy?.toFixed(1)} meters</Text>
          </View>

          <View style={styles.divider} />

          <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>🏠 {location.street || "N/A"}</Text>
          <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>🏘 {location.district || "N/A"}</Text>
          <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>🏙 {location.city || "N/A"}, {location.region || "N/A"}</Text>
          <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>📮 {location.postalCode || "N/A"}</Text>
          <Text style={[styles.detailValue, { color: Colors[colorScheme].text }]}>🌍 {location.country || "N/A"}</Text>

          <View style={styles.actionRow}>
            <CustomButton 
              title="Copy" 
              onPress={copyToClipboard} 
              variant="outline" 
              style={{ flex: 1, marginRight: Layout.spacing.sm }}
            />
            <CustomButton 
              title="Use in Survey" 
              onPress={useLocationForSurvey} 
              style={{ flex: 1, marginLeft: Layout.spacing.sm }}
            />
          </View>
        </Card>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: Layout.spacing.lg,
  },
  card: {
    marginTop: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: Layout.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.xs,
  },
  detailLabel: {
    width: 100,
    fontWeight: '500',
    color: '#6B7280',
  },
  detailValue: {
    flex: 1,
    marginBottom: Layout.spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: Layout.spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.lg,
  }
});
