import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
} from "react-native";
import { Colors, Typography, Spacing, Radius } from "../../theme";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  containerStyle?: ViewStyle;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  placeholder = "Select…",
  onChange,
  containerStyle,
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        />
        <SafeAreaView style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetLabel}>{label}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  item.value === value && styles.optionSelected,
                ]}
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.value === value && styles.optionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
                {item.value === value && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.labelMedium,
    marginBottom: Spacing.sm,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1.2,
    borderColor: Colors.inputBorder,
    height: 52,
    paddingHorizontal: Spacing.lg,
  },
  triggerText: {
    ...Typography.bodyLarge,
    color: Colors.black,
    flex: 1,
  },
  placeholder: {
    color: Colors.placeholder,
  },
  chevron: {
    fontSize: 16,
    color: Colors.gray500,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    maxHeight: "60%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray300,
    alignSelf: "center",
    marginVertical: Spacing.md,
  },
  sheetLabel: {
    ...Typography.displaySmall,
    marginBottom: Spacing.lg,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  optionSelected: {
    // subtle highlight handled by text color
  },
  optionText: {
    ...Typography.bodyLarge,
    flex: 1,
    color: Colors.black,
  },
  optionTextSelected: {
    fontWeight: "600",
  },
  checkmark: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "700",
  },
});
