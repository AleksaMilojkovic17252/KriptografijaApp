import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { ImageLabelModal } from "@/components/ImageLabelModal";
import { ThemedText } from "@/components/themed-components/themed-text";

import { AttachButtonProps } from "./contracts";

export function AddLinkButton({ onTagCreated }: AttachButtonProps) {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showLabelModal, setShowLabelModal] = useState(false);

  const start = () => {
    setUrl("");
    setLabel("");
    setShowUrlModal(true);
  };

  const confirmUrl = () => {
    if (!url.trim()) return;
    setShowUrlModal(false);
    setShowLabelModal(true);
  };

  const cancelUrl = () => {
    setShowUrlModal(false);
    setUrl("");
  };

  const confirmLabel = () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;
    const displayText = label.trim() || trimmedUrl;
    onTagCreated(`<link="${trimmedUrl}" text="${displayText}">`);
    setShowLabelModal(false);
    setUrl("");
    setLabel("");
  };

  const cancelLabel = () => {
    setShowLabelModal(false);
    setUrl("");
    setLabel("");
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        onPress={start}
      >
        <Ionicons name="link-outline" size={18} color="#2980B9" />
        <ThemedText style={styles.text}>Add URL</ThemedText>
      </Pressable>
      <ImageLabelModal
        visible={showUrlModal}
        value={url}
        onChangeText={setUrl}
        onConfirm={confirmUrl}
        onCancel={cancelUrl}
        title="Add URL"
        subtitle="Enter the URL"
        placeholder="e.g., https://example.com"
        accentColor="#2980B9"
      />
      <ImageLabelModal
        visible={showLabelModal}
        value={label}
        onChangeText={setLabel}
        onConfirm={confirmLabel}
        onCancel={cancelLabel}
        title="Link Label"
        subtitle="Enter display text for this link"
        placeholder="e.g., Click here"
        accentColor="#2980B9"
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2980B9",
    alignSelf: "flex-start",
  },
  text: {
    color: "#2980B9",
    fontWeight: "600",
    fontSize: 14,
  },
});
