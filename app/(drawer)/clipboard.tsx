import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import { Card } from "@/components/ui/Card";
import { Colors, Layout, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";

export default function ClipboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { draftSurvey, updateDraft } = useSurvey();
  
  const [pastedText, setPastedText] = useState("");
  const [notes, setNotes] = useState(draftSurvey.notes || "");

  const copySurveyId = async () => {
    // Generate a temporary ID for the draft if it doesn't have one yet
    const tempId = draftSurvey.id || `DRAFT-${Date.now()}`;
    await Clipboard.setStringAsync(tempId);
    Alert.alert("Success", "Survey ID copied to clipboard!");
  };

  const copyContact = async () => {
    if (draftSurvey.contact?.phoneNumbers?.[0]?.number) {
      await Clipboard.setStringAsync(draftSurvey.contact.phoneNumbers[0].number);
      Alert.alert("Success", "Contact number copied to clipboard!");
    } else {
      Alert.alert("Error", "No contact attached to current draft survey.");
    }
  };

  const copyLocation = async () => {
    if (draftSurvey.location) {
      const locStr = `Lat: ${draftSurvey.location.latitude}, Lon: ${draftSurvey.location.longitude}`;
      await Clipboard.setStringAsync(locStr);
      Alert.alert("Success", "Location copied to clipboard!");
    } else {
      Alert.alert("Error", "No location attached to current draft survey.");
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setPastedText(text);
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");
    setPastedText("");
    Alert.alert("Cleared", "Clipboard data cleared successfully.");
  };

  const saveNotes = () => {
    try {
      updateDraft({ notes });
      router.replace('/preview' as any);
    } catch (error) {
      try {
        router.replace('/(drawer)/(tabs)/preview' as any);
      } catch (fallbackError) {
        console.warn('Failed to navigate to preview screen', fallbackError);
        Alert.alert('Error', 'Unable to open preview right now.');
      }
    }
  };

  return (
    <ScreenContainer>
      <Card>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Copy Data</Text>
        <CustomButton 
          title="Copy Survey ID" 
          onPress={copySurveyId} 
          variant="outline"
          style={styles.actionBtn}
        />
        <CustomButton 
          title="Copy Contact Number" 
          onPress={copyContact} 
          variant="outline"
          style={styles.actionBtn}
        />
        <CustomButton 
          title="Copy Current Location" 
          onPress={copyLocation} 
          variant="outline"
          style={styles.actionBtn}
        />
      </Card>

      <Card>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Clipboard Actions</Text>
        
        <View style={styles.row}>
          <CustomButton 
            title="Paste to preview" 
            onPress={pasteFromClipboard} 
            variant="secondary"
            style={{ flex: 1, marginRight: Layout.spacing.sm }}
          />
          <CustomButton 
            title="Clear Clipboard" 
            onPress={clearClipboard} 
            variant="danger"
            style={{ flex: 1, marginLeft: Layout.spacing.sm }}
          />
        </View>

        {pastedText ? (
          <View style={[styles.pastedContainer, { backgroundColor: Colors[colorScheme].background, borderColor: Colors[colorScheme].border }]}>
            <Text style={[styles.label, { color: Colors[colorScheme].textSecondary }]}>Pasted Content:</Text>
            <Text style={{ color: Colors[colorScheme].text, fontFamily: Fonts.mono }}>{pastedText}</Text>
          </View>
        ) : null}
      </Card>

      <Card>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Survey Notes</Text>
        <Text style={[styles.description, { color: Colors[colorScheme].textSecondary }]}>
          Paste any relevant notes here to attach them to your survey.
        </Text>
        
        <TextInput
          style={[
            styles.textArea, 
            { 
              backgroundColor: Colors[colorScheme].background,
              borderColor: Colors[colorScheme].border,
              color: Colors[colorScheme].text
            }
          ]}
          multiline
          numberOfLines={6}
          placeholder="Enter or paste notes here..."
          placeholderTextColor={Colors[colorScheme].icon}
          value={notes}
          onChangeText={setNotes}
        />

        <CustomButton 
          title="Save Notes & Preview Survey" 
          onPress={saveNotes} 
          style={{ marginTop: Layout.spacing.md }}
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontSize: 14,
    marginBottom: Layout.spacing.md,
  },
  actionBtn: {
    marginBottom: Layout.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  pastedContainer: {
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.md,
    borderWidth: 1,
    marginTop: Layout.spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.xs,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    textAlignVertical: 'top',
    minHeight: 120,
    fontFamily: Fonts.sans,
  }
});
