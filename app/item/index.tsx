import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAssociationStore } from "@/lib/dataStore";

import { ThemedCardView } from "@/components/themed-components/themed-card-view";
import { ThemedDivider } from "@/components/themed-components/themed-divider";
import { ThemedSafeAreaView } from "@/components/themed-components/themed-safe-area-view";
import { ThemedText } from "@/components/themed-components/themed-text";
import { ThemedTextInput } from "@/components/themed-components/themed-text-input";
import { ThemedView } from "@/components/themed-components/themed-view";

export default function DetailsScreen() {
  const router = useRouter();

  const { selectedItem, removeItem, updateItem } = useAssociationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDescription(selectedItem.description);
    }
  }, [selectedItem]);

  const handleSaveUpdate = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    try {
      updateItem({ title, description });
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
    
  };

  const revert = () => {
    setIsEditing(false);
    setDescription(selectedItem!.description);
    setTitle(selectedItem!.title);
  };

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
      ]
    );
  };

  return (
    <ThemedSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
        >
          <ThemedCardView style={styles.card}>
            <ThemedView style={styles.headerRow}>
              <Pressable
                onPress={() =>
                  isEditing ? handleSaveUpdate() : setIsEditing(true)
                }
              >
                <Ionicons
                  name={isEditing ? "checkmark-done-circle" : "create-outline"}
                  size={24}
                  color={isEditing ? "#34C759" : "#007AFF"}
                />
              </Pressable>
              {isEditing && (
                <Pressable onPress={revert}>
                  <Ionicons
                    name={"arrow-undo-circle"}
                    size={24}
                    color={"#FF3B30"}
                  />
                </Pressable>
              )}
            </ThemedView>
            <ThemedText style={styles.label} type="label">
              TITLE
            </ThemedText>
            {isEditing ? (
              <ThemedTextInput
                style={styles.input}
                value={title}
                multiline={true}
                onChangeText={setTitle}
                numberOfLines={2}
                autoFocus={true}
              />
            ) : (
              <ThemedText style={styles.title} type="title">
                {title}
              </ThemedText>
            )}

            <ThemedDivider style={styles.divider} />

            <ThemedText style={styles.label} type="label">
              DESCRIPTION
            </ThemedText>
            {isEditing ? (
              <ThemedTextInput
                style={[styles.textArea, styles.input]}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            ) : (
              <ThemedText style={styles.description}>{description}</ThemedText>
            )}
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
      </KeyboardAvoidingView>
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
  headerRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#38383A",
    backgroundColor: "rgba(0,0,0,0.02)",
    marginBottom: 20,
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
    input: {
    fontSize: 16,
    padding: 16,
    borderRadius: 14,
  },
  textArea: {
    height: 120,
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
