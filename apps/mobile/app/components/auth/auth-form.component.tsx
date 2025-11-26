import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import useAuthForm from "../../data/hooks/use-auth-form.hook";
import Logo from "../shared/logo.component";
import CustomTextInput from "../shared/text-input.component";
import PasswordInput from "../shared/password-input.component";
import CustomButton from "../shared/button.component";

export default function AuthForm() {
  const {
    mode,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    toggleMode,
    submit,
  } = useAuthForm();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Logo big />

          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
            </Text>
            <Text style={styles.subtitle}>
              {mode === "login"
                ? "Entre com suas credenciais."
                : "Preencha os dados para criar sua conta."}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === "register" && (
              <CustomTextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />
            )}

            <CustomTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <PasswordInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <CustomButton
              title={mode === "login" ? "Entrar" : "Cadastrar"}
              onPress={submit}
              style={styles.submitButton}
            />

            <TouchableOpacity onPress={toggleMode} style={styles.toggleButton}>
              <Text style={styles.toggleText}>
                {mode === "login" ? (
                  <>
                    Não tem uma conta?{" "}
                    <Text style={styles.toggleTextBold}>Cadastre-se</Text>
                  </>
                ) : (
                  <>
                    Já tem uma conta?{" "}
                    <Text style={styles.toggleTextBold}>Entrar!</Text>
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 384,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  submitButton: {
    marginTop: 12,
    marginBottom: 24,
  },
  toggleButton: {
    alignItems: "center",
  },
  toggleText: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
  },
  toggleTextBold: {
    color: "#7C3AED",
    fontWeight: "bold",
  },
});
