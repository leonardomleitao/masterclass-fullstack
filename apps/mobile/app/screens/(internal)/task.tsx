import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Task() {
  return (
    <View style={styles.container}>
      <Text>Task Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
