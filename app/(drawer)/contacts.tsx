import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CustomInput } from "@/components/ui/CustomInput";
import { CustomButton } from "@/components/ui/CustomButton";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function ContactsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { updateDraft } = useSurvey();

  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      setLoading(true);
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status !== "granted") {
        setPermissionGranted(false);
        return;
      }
      setPermissionGranted(true);

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch contacts.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function searchContact(text: string) {
    setSearch(text);
    const filtered = contacts.filter((item) =>
      item.name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  }

  async function copyNumber(number: string) {
    await Clipboard.setStringAsync(number);
    Alert.alert("Copied", "Phone number copied successfully.");
  }

  const useContactForSurvey = (contact: Contacts.Contact) => {
    const phone = contact.phoneNumbers?.[0]?.number;
    if (!phone) {
      Alert.alert("Error", "This contact has no phone number.");
      return;
    }
    updateDraft({
      contact: {
        name: contact.name,
        phoneNumbers: [{ number: phone }]
      }
    });
    Alert.alert(
      "Success", 
      "Contact attached to survey draft",
      [{ text: "OK", onPress: () => router.push("/(drawer)/clipboard") }]
    );
  };

  function onRefresh() {
    setRefreshing(true);
    fetchContacts();
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View style={styles.center}>
        <Text style={[styles.permissionText, { color: Colors[colorScheme].text }]}>
          Contacts Permission Required
        </Text>
        <CustomButton title="Allow Contacts" onPress={fetchContacts} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Contacts</Text>
        <Text style={[styles.counter, { color: Colors[colorScheme].textSecondary }]}>
          Total: {filteredContacts.length}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <CustomInput
          placeholder="Search Contact..."
          value={search}
          onChangeText={searchContact}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors[colorScheme].tint]} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <IconSymbol name="person.crop.circle.badge.xmark" size={48} color={Colors[colorScheme].icon} />
            <Text style={[styles.emptyStateText, { color: Colors[colorScheme].textSecondary }]}>
              No contacts found
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          const phone = item.phoneNumbers?.[0]?.number || "No Number";
          const initial = item.name ? item.name.charAt(0).toUpperCase() : "?";

          return (
            <Card style={styles.card} noPadding>
              <View style={styles.cardContent}>
                <View style={[styles.avatar, { backgroundColor: Colors[colorScheme].tint }]}>
                  <Text style={styles.avatarText}>{initial}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={[styles.name, { color: Colors[colorScheme].text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={[styles.number, { color: Colors[colorScheme].textSecondary }]}>
                    {phone}
                  </Text>
                </View>

                <View style={styles.actions}>
                  {phone !== "No Number" && (
                    <>
                      <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => copyNumber(phone)}
                      >
                        <IconSymbol name="doc.on.doc" size={20} color={Colors[colorScheme].tint} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => useContactForSurvey(item)}
                      >
                        <IconSymbol name="plus.circle" size={20} color={Colors[colorScheme].success} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 18,
    marginBottom: Layout.spacing.lg,
    fontWeight: "bold",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.sm,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  counter: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  searchContainer: {
    paddingHorizontal: Layout.spacing.lg,
  },
  searchInput: {
    marginBottom: 0,
  },
  listContent: {
    padding: Layout.spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xl * 2,
  },
  emptyStateText: {
    marginTop: Layout.spacing.md,
    fontSize: 16,
  },
  card: {
    marginBottom: Layout.spacing.sm,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Layout.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Layout.spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  info: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  number: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: Layout.spacing.sm,
    marginLeft: Layout.spacing.xs,
  }
});
