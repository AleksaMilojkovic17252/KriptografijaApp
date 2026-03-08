import { Dimensions, Modal, Pressable, StyleSheet } from "react-native";

import { Image } from "expo-image";

import { ThemedText } from "@/components/themed-components/themed-text";

import { ViewerModalProps } from "./contracts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_SIZE = SCREEN_WIDTH - 80;

export function ImageViewerModal({
  visible,
  src,
  label,
  onClose,
}: ViewerModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.content} onPress={() => {}}>
          <Image
            source={{ uri: src }}
            style={styles.image}
            contentFit="contain"
          />
          <ThemedText style={styles.label} numberOfLines={2}>
            {label}
          </ThemedText>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeText}>Close</ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    opacity: 0.7,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#8E44AD",
  },
  closeText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
