import { Stack } from "expo-router";
import { SessionProvider } from "./data/contexts/session.context";
import { MessageProvider } from "./data/contexts/message.context";
import { ThemeProvider } from "./data/contexts/theme.context";
import ToastContainer from "./components/shared/toast-container.component";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MessageProvider>
        <SessionProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="screens" />
            <Stack.Screen name="index" />
          </Stack>
          <ToastContainer />
        </SessionProvider>
      </MessageProvider>
    </ThemeProvider>
  );
}
