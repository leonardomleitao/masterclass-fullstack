import { Stack } from "expo-router";

export default function ExternalLayout() {
  return (
    <Stack
      initialRouteName="auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="auth" />
    </Stack>
  );
}
