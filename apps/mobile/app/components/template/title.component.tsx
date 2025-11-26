import React from "react";
import { Text, StyleSheet } from "react-native";

export interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
