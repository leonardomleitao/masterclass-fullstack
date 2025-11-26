import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { useThemeColors } from "@/app/data/hooks/use-theme-colors.hook";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger";
}

export default function CustomButton({
  title,
  variant = "primary",
  onPress,
  style,
  disabled,
  ...props
}: CustomButtonProps) {
  const colors = useThemeColors();

  const getButtonStyle = () => {
    if (variant === "primary") return { backgroundColor: colors.buttonPrimary };
    if (variant === "danger") return { backgroundColor: colors.error };
    return {
      backgroundColor: colors.buttonSecondary,
      borderWidth: 1,
      borderColor: colors.border
    };
  };

  const getTextStyle = () => {
    if (variant === "primary") return { color: colors.buttonPrimaryText };
    if (variant === "danger") return { color: "#FFFFFF" };
    return { color: colors.buttonSecondaryText };
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && { backgroundColor: colors.border, opacity: 0.6 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          getTextStyle(),
          disabled && { color: colors.textMuted },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
