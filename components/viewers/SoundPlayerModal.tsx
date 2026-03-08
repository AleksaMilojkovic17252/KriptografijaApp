import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";

import { ThemedText } from "@/components/themed-components/themed-text";
import { ThemedView } from "@/components/themed-components/themed-view";

import { ViewerModalProps } from "./contracts";

export function SoundPlayerModal({
  visible,
  src,
  label,
  onClose,
}: ViewerModalProps) {
  const player = useAudioPlayer(visible ? src : "");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!visible) {
      player.pause();
      setIsPlaying(false);
    }
  }, [visible, player]);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    player.pause();
    setIsPlaying(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.content} onPress={() => {}}>
          <ThemedView style={styles.header}>
            <Ionicons name="musical-note" size={24} color="#E67E22" />
            <ThemedText style={styles.label} numberOfLines={2}>
              {label}
            </ThemedText>
          </ThemedView>

          <Pressable
            style={({ pressed }) => [
              styles.playButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={togglePlay}
          >
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={64}
              color="#E67E22"
            />
          </Pressable>

          <Pressable style={styles.closeButton} onPress={handleClose}>
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
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
  playButton: {
    marginBottom: 24,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#E67E22",
  },
  closeText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
