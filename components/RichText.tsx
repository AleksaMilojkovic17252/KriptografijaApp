import { useMemo, useState } from "react";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Linking, StyleSheet, Text, type TextProps, View } from "react-native";

import { ImageViewerModal } from "@/components/viewers/ImageViewerModal";
import { SoundPlayerModal } from "@/components/viewers/SoundPlayerModal";

type TagType = "image" | "link" | "sound";

interface Segment {
  type: "plain" | TagType;
  text: string;
  src?: string;
}

const TAG_REGEX = /<(image|link|sound)="([^"]*?)"\s+text="([^"]*?)">/g;

function parseRichText(input: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TAG_REGEX.exec(input)) !== null) {
    if (match.index > lastIndex)
      segments.push({
        type: "plain",
        text: input.slice(lastIndex, match.index),
      });

    segments.push({
      type: match[1] as TagType,
      src: match[2],
      text: match[3],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    segments.push({ type: "plain", text: input.slice(lastIndex) });
  }

  return segments;
}

const TAG_COLORS: Record<TagType, string> = {
  image: "#8E44AD",
  link: "#2980B9",
  sound: "#E67E22",
};

export type RichTextProps = TextProps & {
  children: string;
  lightColor?: string;
  darkColor?: string;
};

export function RichText({
  children,
  style,
  lightColor,
  darkColor,
  ...rest
}: RichTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const segments = parseRichText(children);

  const [soundModalVisible, setSoundModalVisible] = useState(false);
  const [soundSrc, setSoundSrc] = useState("");
  const [soundLabel, setSoundLabel] = useState("");

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageLabel, setImageLabel] = useState("");

  const actions = useMemo(() => {
    const actions: Record<TagType, (src: string, text: string) => void> = {
      link: (src) => Linking.openURL(src),
      sound: (src, text) => {
        setSoundSrc(src);
        setSoundLabel(text);
        setSoundModalVisible(true);
      },
      image: (src, text) => {
        setImageSrc(src);
        setImageLabel(text);
        setImageModalVisible(true);
      },
    };
    return actions;
  }, []);

  const handlePress = (type: TagType, src: string, text: string) => {
    if (src) actions[type]?.(src, text);
  };

  return (
    <View>
      <Text style={[{ color }, style]} {...rest}>
        {segments.map((seg, i) => {
          if (seg.type === "plain") {
            return <Text key={i}>{seg.text}</Text>;
          }

          const tagColor = TAG_COLORS[seg.type];

          return (
            <Text
              key={i}
              style={[styles.tag, { color: tagColor }]}
              onPress={() =>
                handlePress(seg.type as TagType, seg.src ?? "", seg.text)
              }
            >
              {seg.text}
            </Text>
          );
        })}
      </Text>
      <SoundPlayerModal
        visible={soundModalVisible}
        src={soundSrc}
        label={soundLabel}
        onClose={() => setSoundModalVisible(false)}
      />
      <ImageViewerModal
        visible={imageModalVisible}
        src={imageSrc}
        label={imageLabel}
        onClose={() => setImageModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
