import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface LogoProps {
  big?: boolean;
}

export default function Logo({ big = false }: LogoProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-done" size={big ? 32 : 24} color={"#7C3AED"} />
      <Text style={[styles.text, big ? styles.textBig : styles.textSmall]}>
        TaskMaster
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    gap: 8,
  },
  iconText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  textSmall: {
    fontSize: 20,
  },
  textBig: {
    fontSize: 28,
  },
});
