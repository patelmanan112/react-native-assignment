import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { CustomInput } from "@/components/ui/CustomInput";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function HistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const { surveys, deleteSurvey } = useSurvey();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  const filteredSurveys = useMemo(() => {
    return [...surveys]
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      .filter(s => {
        const matchesSearch =
          s.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = filterPriority ? s.priority === filterPriority : true;
        return matchesSearch && matchesPriority;
      });
  }, [surveys, searchQuery, filterPriority]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this survey?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteSurvey(id) }
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return Colors[colorScheme].error;
      case 'Medium': return Colors[colorScheme].warning;
      case 'Low': return Colors[colorScheme].success;
      default: return Colors[colorScheme].tint;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Survey History</Text>
      </View>

      <View style={styles.filters}>
        <CustomInput
          placeholder="Search by site or client..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <View style={styles.priorityFilters}>
          {['All', 'Low', 'Medium', 'High'].map(p => (
            <TouchableOpacity 
              key={p} 
              onPress={() => setFilterPriority(p === 'All' ? null : p)}
              style={[
                styles.filterChip, 
                { 
                  backgroundColor: (filterPriority === p || (p === 'All' && !filterPriority)) 
                    ? Colors[colorScheme].tint 
                    : Colors[colorScheme].card,
                  borderColor: Colors[colorScheme].border
                }
              ]}
            >
              <Text style={{ 
                color: (filterPriority === p || (p === 'All' && !filterPriority)) 
                  ? '#fff' 
                  : Colors[colorScheme].textSecondary,
                fontSize: 12,
                fontWeight: '600'
              }}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <IconSymbol name="tray" size={48} color={Colors[colorScheme].icon} />
            <Text style={[styles.emptyStateText, { color: Colors[colorScheme].textSecondary }]}>
              No surveys found.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.siteName, { color: Colors[colorScheme].text }]}>{item.siteName}</Text>
                <Text style={[styles.clientName, { color: Colors[colorScheme].textSecondary }]}>{item.clientName}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailsRow}>
              <IconSymbol name="calendar" size={14} color={Colors[colorScheme].icon} />
              <Text style={[styles.dateText, { color: Colors[colorScheme].textSecondary }]}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>

            {item.description ? (
              <Text style={[styles.metaText, { color: Colors[colorScheme].textSecondary }]} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}

            {item.notes ? (
              <Text style={[styles.metaText, { color: Colors[colorScheme].textSecondary }]} numberOfLines={2}>
                Notes: {item.notes}
              </Text>
            ) : null}

            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <IconSymbol name="trash" size={20} color={Colors[colorScheme].error} />
                <Text style={[styles.deleteText, { color: Colors[colorScheme].error }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.sm,
  },
  heading: { fontSize: 28, fontWeight: "bold" },
  filters: { paddingHorizontal: Layout.spacing.lg, marginBottom: Layout.spacing.sm },
  searchInput: { marginBottom: Layout.spacing.sm },
  priorityFilters: { flexDirection: 'row', gap: Layout.spacing.sm },
  filterChip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 6,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  listContent: { padding: Layout.spacing.lg },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: Layout.spacing.xl * 2 },
  emptyStateText: { marginTop: Layout.spacing.md, fontSize: 16 },
  card: { marginBottom: Layout.spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  siteName: { fontSize: 18, fontWeight: 'bold' },
  clientName: { fontSize: 14, marginTop: 2 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  priorityText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: Layout.spacing.md },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Layout.spacing.sm },
  dateText: { fontSize: 14, marginLeft: Layout.spacing.xs },
  metaText: { fontSize: 13, marginBottom: Layout.spacing.xs },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Layout.spacing.xs },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', padding: Layout.spacing.xs },
  deleteText: { marginLeft: 4, fontWeight: '600', fontSize: 14 }
});
