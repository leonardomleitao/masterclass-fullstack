import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22c55e" }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ fontSize: 16, fontWeight: "600" }}
      text2Style={{ fontSize: 14 }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#22c55e" />
        </View>
      )}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#ef4444" }}
      text1Style={{ fontSize: 16, fontWeight: "700" }}
      text2Style={{ fontSize: 14 }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
        </View>
      )}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#3b82f6" }}
      text1Style={{ fontSize: 16, fontWeight: "600" }}
      text2Style={{ fontSize: 14 }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#3b82f6"
          />
        </View>
      )}
    />
  ),
};

export default function ToastContainer() {
  return <Toast topOffset={70} config={toastConfig} />;
}
