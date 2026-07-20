import React from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CustomButton } from "@/components/ui/CustomButton";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";

export default function PreviewScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { draftSurvey, saveSurvey } = useSurvey();

  const handleSubmit = async () => {
    if (!draftSurvey.siteName || !draftSurvey.clientName) {
      Alert.alert("Error", "Site Name and Client Name are required.");
      return;
    }

    try {
      await saveSurvey({
        siteName: draftSurvey.siteName,
        clientName: draftSurvey.clientName,
        description: draftSurvey.description || "",
        priority: draftSurvey.priority || 'Medium',
        date: draftSurvey.date || new Date().toISOString(),
        photoUri: draftSurvey.photoUri,
        location: draftSurvey.location,
        contact: draftSurvey.contact,
        notes: draftSurvey.notes,
      });

      router.replace('/(drawer)/(tabs)/history' as any);
    } catch (e) {
      Alert.alert("Error", "Failed to save survey.");
    }
  };

  const handleEdit = () => {
    router.push("/(drawer)/(tabs)/survey");
  };

  return (
    <ScreenContainer>
      <Text style={[styles.mainHeading, { color: Colors[colorScheme].text }]}>Survey Preview</Text>
      
      <Card>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Basic Details</Text>
        <DetailRow label="Site Name" value={draftSurvey.siteName} colorScheme={colorScheme} />
        <DetailRow label="Client Name" value={draftSurvey.clientName} colorScheme={colorScheme} />
        <DetailRow label="Priority" value={draftSurvey.priority} colorScheme={colorScheme} />
        <DetailRow 
          label="Date" 
          value={draftSurvey.date ? new Date(draftSurvey.date).toLocaleDateString() : 'N/A'} 
          colorScheme={colorScheme} 
        />
        {draftSurvey.description ? (
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: Colors[colorScheme].textSecondary }]}>Description:</Text>
            <Text style={[styles.value, { color: Colors[colorScheme].text }]}>{draftSurvey.description}</Text>
          </View>
        ) : null}
      </Card>

      {draftSurvey.photoUri && (
        <Card>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Captured Photo</Text>
          <Image source={{ uri: draftSurvey.photoUri }} style={styles.image} />
        </Card>
      )}

      {draftSurvey.location && (
        <Card>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Location Details</Text>
          <DetailRow label="Latitude" value={draftSurvey.location.latitude?.toFixed(5)} colorScheme={colorScheme} />
          <DetailRow label="Longitude" value={draftSurvey.location.longitude?.toFixed(5)} colorScheme={colorScheme} />
        </Card>
      )}

      {draftSurvey.contact && (
        <Card>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Contact Attached</Text>
          <DetailRow label="Name" value={draftSurvey.contact.name} colorScheme={colorScheme} />
          <DetailRow 
            label="Phone" 
            value={draftSurvey.contact.phoneNumbers?.[0]?.number} 
            colorScheme={colorScheme} 
          />
        </Card>
      )}

      {draftSurvey.notes ? (
        <Card>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Notes</Text>
          <Text style={{ color: Colors[colorScheme].text }}>{draftSurvey.notes}</Text>
        </Card>
      ) : null}

      <View style={styles.actions}>
        <CustomButton 
          title="Edit Details" 
          onPress={handleEdit} 
          variant="secondary"
          style={{ flex: 1, marginRight: Layout.spacing.sm }}
        />
        <CustomButton 
          title="Submit Survey" 
          onPress={handleSubmit} 
          style={{ flex: 1, marginLeft: Layout.spacing.sm }}
        />
      </View>

      <View style={{ height: 40 }} />
    </ScreenContainer>
  );
}

function DetailRow({ label, value, colorScheme }: { label: string, value: any, colorScheme: any }) {
  return (
    <View style={styles.detailRow}>
      <Text style={[styles.label, { color: Colors[colorScheme].textSecondary }]}>{label}:</Text>
      <Text style={[styles.value, { color: Colors[colorScheme].text }]}>{value || 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: Layout.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.sm,
  },
  label: {
    width: 100,
    fontWeight: '500',
  },
  value: {
    flex: 1,
    fontWeight: '600',
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: Layout.radius.md,
  },
  actions: {
    flexDirection: 'row',
    marginTop: Layout.spacing.lg,
  }
});
