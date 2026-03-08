import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { getDocumentAsync } from "expo-document-picker";
import { Directory, File, Paths } from "expo-file-system";

import { ImageLabelModal } from "@/components/ImageLabelModal";
import { ThemedText } from "@/components/themed-components/themed-text";

import { AttachButtonProps } from "./contracts";

export function AttachSoundButton({ onTagCreated }: AttachButtonProps) {
  const [pendingUri, setPendingUri] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [showModal, setShowModal] = useState(false);

  const pick = async () => {
    const result = await getDocumentAsync({
      type: ["audio/*"],
    });

    if (result.canceled || result.assets.length === 0) return;

    const asset = result.assets[0];
    const fileName = `${Date.now()}_${asset.name}`;

    const soundsDir = new Directory(Paths.document, "sounds");
    if (!soundsDir.exists) {
      soundsDir.create();
    }

    const sourceFile = new File(asset.uri);
    const destFile = new File(soundsDir, fileName);
    sourceFile.copy(destFile);

    setPendingUri(destFile.uri);
    setLabel(asset.name);
    setShowModal(true);
  };

  const confirm = () => {
    if (!pendingUri) return;
    const displayText = label.trim() || "sound";
    onTagCreated(`<sound="${pendingUri}" text="${displayText}">`);
    setShowModal(false);
    setPendingUri(null);
    setLabel("");
  };

  const cancel = () => {
    setShowModal(false);
    setPendingUri(null);
    setLabel("");
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        onPress={pick}
      >
        <Ionicons name="musical-note-outline" size={18} color="#E67E22" />
        <ThemedText style={styles.text}>Attach Sound</ThemedText>
      </Pressable>
      <ImageLabelModal
        visible={showModal}
        value={label}
        onChangeText={setLabel}
        onConfirm={confirm}
        onCancel={cancel}
        title="Sound Label"
        subtitle="Enter display text for this sound"
        placeholder="e.g., Bird chirping"
        accentColor="#E67E22"
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
    borderColor: "#E67E22",
    alignSelf: "flex-start",
  },
  text: {
    color: "#E67E22",
    fontWeight: "600",
    fontSize: 14,
  },
});
