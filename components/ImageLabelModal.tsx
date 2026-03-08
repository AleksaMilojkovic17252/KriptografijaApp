import { Modal, Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-components/themed-text";
import { ThemedView } from "@/components/themed-components/themed-view";

export type ImageLabelModalProps = {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  accentColor?: string;
};

export function ImageLabelModal({
  visible,
  value,
  onChangeText,
  onConfirm,
  onCancel,
  title = "Image Label",
  subtitle = "Enter display text for this image",
  placeholder = "e.g., Photo of the store",
  accentColor = "#8E44AD",
}: ImageLabelModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={onConfirm}
          />
          <ThemedView style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: accentColor }]}
              onPress={onConfirm}
            >
              <ThemedText style={styles.confirmText}>Add</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 340,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#2C2C2E",
    color: "#FFF",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#2C2C2E",
  },
  cancelText: {
    color: "#8E8E93",
    fontWeight: "600",
    fontSize: 14,
  },
  confirmText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
