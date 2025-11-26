import { useThemeColors } from "@/app/data/hooks/use-theme-colors.hook";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Home() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Minhas Tarefas
        </Text>
      </View>

      <View style={styles.content}>
        <Text>Conteúdo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingHorizontal: 20,
    gap: 10,
    height: 80,
    marginBottom: 4,
  },
});
