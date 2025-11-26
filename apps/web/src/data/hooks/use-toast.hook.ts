"use client";

import { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";

type ToastVariant = "success" | "default" | "error";

function useToast() {
  const toast = (props: {
    message: string;
    description?: ReactNode;
    variant?: ToastVariant;
  }) => {
    const { message, description, variant = "default" } = props;

    const variantStyles = {
      success: {
        style: {
          backgroundColor: "oklch(62.7% 0.194 149.214)",
          color: "white",
        },
        icon: "✔️",
      },
      default: {
        style: {
          backgroundColor: "oklch(58.8% 0.158 241.966)",
          color: "white",
        },
        icon: "ℹ️",
      },
      error: {
        style: { backgroundColor: "oklch(63.7% 0.237 25.331)", color: "white" },
        icon: "⚠️",
      },
    };

    const { style, icon } = variantStyles[variant];

    sonnerToast(`${icon} ${message}`, {
      description,
      style: {
        ...style,
      },
    });
  };

  return {
    toast,
  };
}

export { useToast };
