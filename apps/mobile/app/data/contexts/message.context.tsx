import React, { createContext, useCallback } from "react";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";

type MessageType = "info" | "success" | "error";

export interface MessageContextProps {
  addInfo: (text: string) => void;
  addSuccess: (text: string) => void;
  addError: (text: string) => void;
}

export const MessageContext = createContext<MessageContextProps>({} as any);

function triggerHaptics(type: MessageType) {
  if (type === "success")
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  else if (type === "error")
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

function showToast(type: MessageType, text: string) {
  const [first, ...rest] = text.split(/\n/);
  Toast.show({
    type,
    text1:
      type === "success"
        ? "Tudo certo!"
        : type === "error"
          ? "Oops, algo deu errado!"
          : "Informação",
    text2: [first, ...rest].join("\n"),
    position: "top",
    autoHide: true,
    visibilityTime: 3000,
  });
}

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const add = useCallback((type: MessageType, text: string) => {
    triggerHaptics(type);
    showToast(type, text);
  }, []);

  const addInfo = useCallback((t: string) => add("info", t), [add]);
  const addSuccess = useCallback((t: string) => add("success", t), [add]);
  const addError = useCallback((t: string) => add("error", t), [add]);

  return (
    <MessageContext.Provider value={{ addInfo, addSuccess, addError }}>
      {children}
    </MessageContext.Provider>
  );
}
