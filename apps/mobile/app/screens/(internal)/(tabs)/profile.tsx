import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileForm from "../../../components/shared/profile-form.component";
import UserAvatar from "../../../components/shared/user-avatar.component";
import useSession from "../../../data/hooks/use-session.hook";
import { useThemeColors } from "@/app/data/hooks/use-theme-colors.hook";

export default function Profile() {
  const { user, endSession } = useSession();
  const colors = useThemeColors();

  const handleLogout = () => {
    Alert.alert(
      "Sair da Aplicação",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            endSession();
            router.replace("/");
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <UserAvatar name={user.name} size={100} />
          <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>Email: {user.email}</Text>
        </View>

        <ProfileForm />

        <Pressable onPress={handleLogout}>
          <View style={styles.logoutSection}>
            <Feather name="log-out" size={18} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Sair da Aplicação</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  logoutSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 32,
    paddingTop: 20,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
