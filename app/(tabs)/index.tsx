import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.title}>Welcome to the App </Text>
        <Text style={styles.subtitle}>
          React Native Mini Project Assignment
        </Text>
      </View>

      {/* Student Details */}
      <View style={styles.card}>
        <Text style={styles.heading}>Student Details</Text>

        <Text style={styles.info}> Name: Manan Patel</Text>
        <Text style={styles.info}> Enrollment: SUK250054CE070</Text>
        <Text style={styles.info}> College: Swaminarayan University</Text>
      </View>

      {/* Survey Count */}
      <View style={styles.surveyCard}>
        <Text style={styles.heading}>Today's Survey Count</Text>

        <Text style={styles.count}>0</Text>
        <Text style={styles.info}>Survey Completed Today</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionContainer}>
        <View style={styles.actionCard}>
      
          <Text>Create Survey</Text>
        </View>

        <View style={styles.actionCard}>
     
          <Text>Camera</Text>
        </View>

        <View style={styles.actionCard}>
      
          <Text>Location</Text>
        </View>

        <View style={styles.actionCard}>
  
          <Text>Clipboard</Text>
        </View>

        <View style={styles.actionCard}>
     
          <Text>Contacts</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#F4F6F8",
    flexGrow: 1,
  },

  welcomeCard: {
    backgroundColor: "#2E7D32",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },

  surveyCard: {
    backgroundColor: "#DFF6DD",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    elevation: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  info: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },

  count: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2E7D32",
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  actionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },

  actionText: {
    fontSize: 30,
    marginBottom: 10,
  },
});