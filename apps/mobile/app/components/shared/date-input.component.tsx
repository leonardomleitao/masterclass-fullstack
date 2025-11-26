import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useThemeColors } from "@/app/data/hooks/use-theme-colors.hook";

interface DateInputProps {
  value: Date | null;
  onChangeDate: (date: Date | null) => void;
  label?: string;
  locale?: string;
  dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

const formatDate = (date: Date, format: string): string => {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  switch (format) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

export default function DateInput({
  value,
  onChangeDate,
  label,
  locale = "pt-BR",
  dateFormat = "DD/MM/YYYY",
  placeholder = "Selecione uma data",
  minimumDate,
  maximumDate,
  disabled = false,
}: DateInputProps) {
  const colors = useThemeColors();
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selectedDate) {
        onChangeDate(selectedDate);
      }
    } else {
      // iOS - atualiza temporariamente
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const showDatePicker = () => {
    if (!disabled) {
      setTempDate(value || new Date());
      setShowPicker(true);
    }
  };

  const confirmDate = () => {
    onChangeDate(tempDate);
    setShowPicker(false);
  };

  const cancelSelection = () => {
    setTempDate(value || new Date());
    setShowPicker(false);
  };

  const displayValue = value ? formatDate(value, dateFormat) : placeholder;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor: colors.inputBorder,
            backgroundColor: colors.input,
          },
          disabled && { backgroundColor: colors.backgroundSecondary, borderColor: colors.border },
        ]}
        onPress={showDatePicker}
        disabled={disabled}
      >
        <Text
          style={[
            styles.inputText,
            { color: colors.text },
            !value && { color: colors.inputPlaceholder },
            disabled && { color: colors.textMuted },
          ]}
        >
          {displayValue}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            {Platform.OS === "ios" && (
              <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={cancelSelection}>
                  <Text style={[styles.modalButtonCancel, { color: colors.textMuted }]}>Cancelar</Text>
                </TouchableOpacity>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Selecionar Data</Text>
                <TouchableOpacity onPress={confirmDate}>
                  <Text style={[styles.modalButtonConfirm, { color: colors.accent }]}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}

            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              locale={locale}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              style={styles.datePicker}
              themeVariant={colors.background === '#0F0F0F' ? 'dark' : 'light'}
            />

            {Platform.OS === "android" && (
              <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.backgroundSecondary }]}
                  onPress={cancelSelection}
                >
                  <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalButtonCancel: {
    fontSize: 16,
  },
  modalButtonConfirm: {
    fontSize: 16,
    fontWeight: "600",
  },
  datePicker: {
    width: "100%",
    height: Platform.OS === "ios" ? 200 : "auto",
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
