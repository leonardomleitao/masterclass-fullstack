import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/app/data/hooks/use-theme-colors.hook";

interface UserAvatarProps {
  name: string;
  size?: number;
}

export default function UserAvatar({ name, size = 80 }: UserAvatarProps) {
  const colors = useThemeColors();

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const fontSize = size * 0.4;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.accent,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  initials: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
