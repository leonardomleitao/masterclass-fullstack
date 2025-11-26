import { Stack } from "expo-router";
import ForceAuthentication from "@/app/components/auth/force-authentication.component";

export default function InternalLayout() {
  return (
    <ForceAuthentication>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="task"
          options={{
            headerTitle: "Editar Tarefa",
            headerShown: true,
            headerBackTitle: "Voltar",
          }}
        />
      </Stack>
    </ForceAuthentication>
  );
}
