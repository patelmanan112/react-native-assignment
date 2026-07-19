import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { surveys } = useSurvey();
  
  const todayCount = surveys.filter(s => {
    const today = new Date();
    const sDate = new Date(s.createdAt);
    return sDate.getDate() === today.getDate() &&
           sDate.getMonth() === today.getMonth() &&
           sDate.getFullYear() === today.getFullYear();
  }).length;

  const quickActions = [
    { id: '1', title: "New Survey", icon: "plus.circle.fill", route: "/(drawer)/(tabs)/survey" },
    { id: '2', title: "Camera", icon: "camera.fill", route: "/(drawer)/camera" },
    { id: '3', title: "Location", icon: "location.fill", route: "/(drawer)/location" },
    { id: '4', title: "Contacts", icon: "person.crop.circle", route: "/(drawer)/contacts" },
    { id: '5', title: "Clipboard", icon: "doc.on.clipboard.fill", route: "/(drawer)/clipboard" },
    { id: '6', title: "History", icon: "list.bullet.clipboard.fill", route: "/(drawer)/(tabs)/history" },
  ];

  const renderHeader = () => (
    <>
      {/* Welcome Card */}
      <View style={[styles.welcomeCard, { backgroundColor: Colors[colorScheme].tint }]}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Smart Field Survey & Inspection App
        </Text>
      </View>

      {/* Student Details & Stats Container */}
      <View style={styles.statsContainer}>
        {/* Student Details */}
        <Card style={styles.studentCard}>
          <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Student</Text>
          <Text style={[styles.info, { color: Colors[colorScheme].textSecondary }]}>Manan Patel</Text>
          <Text style={[styles.info, { color: Colors[colorScheme].textSecondary }]}>SUK250054CE070</Text>
          <Text style={[styles.info, { color: Colors[colorScheme].textSecondary, fontSize: 12 }]}>Swaminarayan Univ.</Text>
        </Card>

        {/* Survey Count */}
        <Card style={styles.countCard}>
          <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Today</Text>
          <Text style={[styles.count, { color: Colors[colorScheme].tint }]}>{todayCount}</Text>
          <Text style={[styles.info, { color: Colors[colorScheme].textSecondary, textAlign: 'center' }]}>Surveys Completed</Text>
        </Card>
      </View>

      {/* Quick Actions Title */}
      <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Quick Actions</Text>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <FlatList
        data={quickActions}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: Colors[colorScheme].card, borderColor: Colors[colorScheme].border }]}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name={item.icon as any} size={32} color={Colors[colorScheme].tint} />
            <Text style={[styles.actionText, { color: Colors[colorScheme].text }]}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: Layout.spacing.lg,
  },
  welcomeCard: {
    padding: Layout.spacing.xl,
    borderRadius: Layout.radius.lg,
    marginBottom: Layout.spacing.lg,
    ...Layout.shadows.medium,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  studentCard: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  countCard: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: Layout.spacing.sm,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  count: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: Layout.spacing.sm,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    borderRadius: Layout.radius.md,
    paddingVertical: Layout.spacing.xl,
    alignItems: "center",
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    ...Layout.shadows.light,
  },
  actionText: {
    marginTop: Layout.spacing.sm,
    fontSize: 14,
    fontWeight: '600',
  },
});
