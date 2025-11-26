import { MessageProvider } from "@/data/contexts/message.context";
import { SessionProvider } from "@/data/contexts/session.context";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export default function Layout(props: any) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <MessageProvider>
        <SessionProvider>
          {props.children}
          <Toaster />
        </SessionProvider>
      </MessageProvider>
    </ThemeProvider>
  );
}
