"use client";
import { useToast } from "@/data/hooks/use-toast.hook";
import { createContext, useCallback } from "react";

export interface MessageContextProps {
  addSuccess: (text: string) => void;
  addError: (text: string) => void;
}

const MessageContext = createContext<MessageContextProps>({} as any);

export function MessageProvider(props: any) {
  const { toast } = useToast();

  const addMessage = useCallback(
    function (type: "success" | "error", text: string) {
      toast({
        message: type === "success" ? "Tudo certo!" : "Oops, algo deu errado!",
        description: text.split(/\n/).map((line) => (
          <p key={line} className="text-white text-base">
            {line}
          </p>
        )),
        variant:
          type === "success"
            ? "success"
            : type === "error"
              ? "error"
              : "default",
      });
    },
    [toast]
  );

  const addSuccess = useCallback(
    (text: string) => {
      addMessage("success", text);
    },
    [addMessage]
  );

  const addError = useCallback(
    (text: string) => {
      addMessage("error", text);
    },
    [addMessage]
  );

  return (
    <MessageContext.Provider
      value={{
        addSuccess,
        addError,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContext;
