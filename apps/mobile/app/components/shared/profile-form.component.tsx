import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./button.component";
import CustomTextInput from "./text-input.component";
import React from "react";
import useProfile from "@/app/data/hooks/use-profile.hook";
import { useThemeColors } from "@/app/data/hooks/use-theme-colors.hook";

export default function ProfileForm() {
  const { name, setName, changeName } = useProfile();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.text }]}>Alterar Nome</Text>
      <Text style={[styles.description, { color: colors.textMuted }]}>
        Informe o nome com no mínimo 3 caracteres e um sobrenome.
      </Text>

      <CustomTextInput
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
        autoCapitalize="words"
      />

      <CustomButton
        title="Alterar"
        onPress={changeName}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    marginTop: 8,
  },
});
