import React, { useState } from "react";
import {
  StyleSheet,
  View,
 Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TabTwoScreen() {
  const [site, setSite] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Create Survey</Text>

        {/* Site Name */}
        <Text style={styles.label}>Site Name</Text>
        <TextInput
          placeholder="Enter Site Name"
          style={styles.input}
          value={site}
          onChangeText={setSite}
        />

        {/* Client Name */}
        <Text style={styles.label}>Client Name</Text>
        <TextInput
          placeholder="Enter Client Name"
          style={styles.input}
          value={client}
          onChangeText={setClient}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Enter Description"
          style={styles.description}
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        {/* Priority */}
        <Text style={styles.label}>Priority</Text>

        <View style={styles.priorityContainer}>
          <Pressable
            style={[
              styles.priorityButton,
              priority === "Low" && styles.selectedButton,
            ]}
            onPress={() => setPriority("Low")}
          >
            <Text
              style={[
                styles.priorityText,
                priority === "Low" && styles.selectedText,
              ]}
            >
              Low
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.priorityButton,
              priority === "Medium" && styles.selectedButton,
            ]}
            onPress={() => setPriority("Medium")}
          >
            <Text
              style={[
                styles.priorityText,
                priority === "Medium" && styles.selectedText,
              ]}
            >
              Medium
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.priorityButton,
              priority === "High" && styles.selectedButton,
            ]}
            onPress={() => setPriority("High")}
          >
            <Text
              style={[
                styles.priorityText,
                priority === "High" && styles.selectedText,
              ]}
            >
              High
            </Text>
          </Pressable>
        </View>

        {/* Select Date */}
        <Text style={styles.label}>Survey Date</Text>

        <Pressable
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        {/* Submit Button */}
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitText}>Create Survey</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },

  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  description: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    height: 120,
    backgroundColor: "#fff",
  },

  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  priorityButton: {
    width: "30%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  selectedButton: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  priorityText: {
    fontWeight: "600",
    color: "#000",
  },

  selectedText: {
    color: "#fff",
  },

  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
  },

  submitButton: {
    marginTop: 30,
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});