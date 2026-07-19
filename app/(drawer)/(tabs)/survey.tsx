import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CustomInput } from "@/components/ui/CustomInput";
import { CustomButton } from "@/components/ui/CustomButton";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";

export default function CreateSurveyScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { draftSurvey, updateDraft } = useSurvey();

  const [site, setSite] = useState(draftSurvey.siteName || "");
  const [client, setClient] = useState(draftSurvey.clientName || "");
  const [description, setDescription] = useState(draftSurvey.description || "");
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(draftSurvey.priority || 'Medium');
  
  const [date, setDate] = useState(draftSurvey.date ? new Date(draftSurvey.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync to context when moving away
  useEffect(() => {
    return () => {
      updateDraft({
        siteName: site,
        clientName: client,
        description,
        priority,
        date: date.toISOString(),
      });
    };
  }, [site, client, description, priority, date]);

  const validate = () => {
    let newErrors: Record<string, string> = {};
    if (!site.trim()) newErrors.site = "Site name is required";
    if (!client.trim()) newErrors.client = "Client name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateDraft({
        siteName: site,
        clientName: client,
        description,
        priority,
        date: date.toISOString(),
      });
      router.push("/(drawer)/camera");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <ScreenContainer>
      <Card>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Survey Details</Text>
        
        <CustomInput
          label="Site Name *"
          placeholder="Enter Site Name"
          value={site}
          onChangeText={setSite}
          error={errors.site}
        />

        <CustomInput
          label="Client Name *"
          placeholder="Enter Client Name"
          value={client}
          onChangeText={setClient}
          error={errors.client}
        />

        <CustomInput
          label="Description"
          placeholder="Enter Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        <Text style={[styles.label, { color: Colors[colorScheme].textSecondary }]}>Priority</Text>
        <View style={styles.priorityContainer}>
          {(['Low', 'Medium', 'High'] as const).map((p) => (
            <CustomButton
              key={p}
              title={p}
              onPress={() => setPriority(p)}
              variant={priority === p ? 'primary' : 'outline'}
              style={styles.priorityButton}
            />
          ))}
        </View>

        <Text style={[styles.label, { color: Colors[colorScheme].textSecondary }]}>Survey Date</Text>
        <CustomButton
          title={date.toLocaleDateString()}
          onPress={() => setShowPicker(true)}
          variant="outline"
          style={{ marginBottom: Layout.spacing.lg }}
          textStyle={{ color: Colors[colorScheme].text }}
        />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <CustomButton
          title="Continue to Media"
          onPress={handleNext}
          style={{ marginTop: Layout.spacing.md }}
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: Layout.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: Layout.spacing.sm,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Layout.spacing.lg,
  },
  priorityButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
  }
});
