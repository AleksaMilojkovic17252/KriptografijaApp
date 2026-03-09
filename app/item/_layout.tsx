import { Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function DetailsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Details",
          headerShadowVisible: false,
          headerBackTitle: "Back",
          headerRight: () => (
            <Pressable onPress={() => router.navigate("/create?edit=true")}>
              <Ionicons name="create-outline" size={24} color="#007AFF" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
