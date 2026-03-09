import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAssociationStore } from "@/lib/dataStore";

import { RichText } from "@/components/RichText";
import { ThemedCardView } from "@/components/themed-components/themed-card-view";
import { ThemedDivider } from "@/components/themed-components/themed-divider";
import { ThemedSafeAreaView } from "@/components/themed-components/themed-safe-area-view";
import { ThemedText } from "@/components/themed-components/themed-text";

export default function DetailsScreen() {
  const router = useRouter();

  const { selectedItem, removeItem } = useAssociationStore();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this from your list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeItem();
            router.back();
          },
        },
      ],
    );
  };

  return (
    <ThemedSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedCardView style={styles.card}>
          <ThemedText style={styles.label} type="label">
            TITLE
          </ThemedText>
          <ThemedText style={styles.title} type="title">
            {selectedItem?.title}
          </ThemedText>

          <ThemedDivider style={styles.divider} />

          <ThemedText style={styles.label} type="label">
            DESCRIPTION
          </ThemedText>
          <RichText style={styles.description}>
            {selectedItem?.description ?? ""}
          </RichText>
        </ThemedCardView>

        <Pressable
          style={({ pressed }) => [
            styles.footerDelete,
            pressed && { opacity: 0.7 },
          ]}
          onPress={confirmDelete}
        >
          <Ionicons name="trash" size={18} color="#FF3B30" />
          <ThemedText style={styles.footerDeleteText}>
            Remove from list
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    letterSpacing: 1,
    marginBottom: 6,
    opacity: 0.6,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
  },
  divider: {
    marginVertical: 10,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    opacity: 0.9,
  },
  footerDelete: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FF3B30",
    marginVertical: 20,
    gap: 8,
  },
  footerDeleteText: {
    color: "#FF3B30",
    fontWeight: "700",
    fontSize: 16,
  },
});
