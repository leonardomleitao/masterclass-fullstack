import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/app/data/contexts/theme.context";

export interface IconCardProps {
  height?: number;
  color: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  selected?: boolean;
}

export default function IconCard(props: IconCardProps) {
  const { height = 150, color, icon, title, selected } = props;
  const { isDark } = useTheme();

  const bgColor = isDark
    ? (selected ? color : '#1C1C1E')
    : (selected ? color : '#FAFAFA'); 

  const iconBgColor = isDark
    ? (selected ? 'rgba(255,255,255,0.25)' : `${color}50`)
    : (selected ? 'rgba(255,255,255,0.3)' : `${color}`);  

  const iconColor = isDark
    ? (selected ? '#FFFFFF' : color)
    : (selected ? '#FFFFFF' : '#FFFFFF'); 

  const textColor = isDark
    ? (selected ? '#FFFFFF' : '#F5F5F7')
    : (selected ? '#FFFFFF' : '#1F2937'); 

  const borderColor = isDark
    ? (selected ? 'transparent' : '#2C2C2E')
    : (selected ? 'transparent' : '#cad1e0'); 

  return (
    <View
      style={[
        styles.container,
        { height },
      ]}
    >
      <LinearGradient
        colors={selected ? [bgColor, bgColor] : [bgColor, bgColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            borderWidth: 0,
            borderColor: borderColor,
            paddingVertical: 14,
            paddingHorizontal: 10,
            shadowColor: selected ? color : (isDark ? "#000" : "#000"),
            shadowOpacity: selected ? 0.35 : (isDark ? 0.0 : 0.12),
            shadowRadius: selected ? 16 : 10,
            shadowOffset: selected ? { width: 0, height: 4 } : { width: 0, height: 3 },
            elevation: selected ? 10 : 4,
          }
        ]}
      >
        <View style={[
          styles.iconContainer,
          {
            backgroundColor: iconBgColor,
          }
        ]}>
          <Feather name={icon} size={24} color={iconColor} />
        </View>
        <Text
          style={[
            styles.title,
            {
              color: textColor,
              fontWeight: selected ? "700" : "700",
              fontSize: 12,
            },
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
});
