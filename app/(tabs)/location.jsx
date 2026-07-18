import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import * as Location from "expo-location";

export default function LocationScreen() {
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState(null);

  async function getLocation() {
    try {
      setLoading(true);

      // Request Permission
      let { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required."
        );
        return;
      }

      // Current Coordinates
      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      // Convert Coordinates to Address
      const address =
        await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

      if (address.length > 0) {
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          ...address[0],
        });
      }
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Location Module
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={getLocation}
      >
        <Text style={styles.buttonText}>
          Get Current Location
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 20 }}
        />
      )}

      {location && (
        <View style={styles.card}>
          <Text style={styles.title}>Current Address</Text>

          <Text>
            📍 Latitude : {location.latitude}
          </Text>

          <Text>
            📍 Longitude : {location.longitude}
          </Text>

          <Text>
            🏠 Street : {location.street || "N/A"}
          </Text>

          <Text>
            🏘 District : {location.district || "N/A"}
          </Text>

          <Text>
            🏙 City : {location.city || "N/A"}
          </Text>

          <Text>
            🗺 Region : {location.region || "N/A"}
          </Text>

          <Text>
            📮 Postal Code : {location.postalCode || "N/A"}
          </Text>

          <Text>
            🌍 Country : {location.country || "N/A"}
          </Text>

          <Text>
            🏷 Name : {location.name || "N/A"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
  },

  button: {
    width: "90%",
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    width: "100%",
    marginTop: 30,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    gap: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});