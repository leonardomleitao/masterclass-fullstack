import React from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../../components/auth/auth-form.component";

export default function Auth() {
  return (
    <View style={styles.container}>
      <AuthForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
