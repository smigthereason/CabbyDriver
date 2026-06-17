import React, { useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Colors, Typography, Spacing, Radius } from "../../theme";

interface CabbyTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
  trailingIcon?: React.ReactNode;
  prefix?: string;
  containerStyle?: ViewStyle;
  onTrailingPress?: () => void;
}

export const TextInput: React.FC<CabbyTextInputProps> = ({
  label,
  error,
  hint,
  trailingIcon,
  prefix,
  containerStyle,
  onTrailingPress,
  style,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
          !!error && styles.inputRowError,
        ]}
      >
        {prefix ? (
          <View style={styles.prefixBox}>
            <Text style={styles.prefixText}>{prefix}</Text>
          </View>
        ) : null}
        <RNTextInput
          style={[styles.input, prefix ? styles.inputWithPrefix : null, style]}
          placeholderTextColor={Colors.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={Colors.black}
          {...rest}
        />
        {trailingIcon ? (
          <TouchableOpacity
            onPress={onTrailingPress}
            style={styles.trailingIcon}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {trailingIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {hint && !error ? <Text style={styles.hint}>{hint}</Text> : null}
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputFill,
    borderRadius: Radius.md,
    borderWidth: 1.2,
    borderColor: Colors.inputBorder,
    minHeight: 52,
    overflow: "hidden",
  },
  inputRowFocused: {
    borderColor: Colors.black,
  },
  inputRowError: {
    borderColor: Colors.error,
  },
  prefixBox: {
    paddingHorizontal: Spacing.md,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray100,
    borderRightWidth: 1.2,
    borderRightColor: Colors.inputBorder,
    minWidth: 56,
  },
  prefixText: {
    ...Typography.labelMedium,
    color: Colors.gray600,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Typography.bodyLarge,
    color: Colors.black,
  },
  inputWithPrefix: {
    paddingLeft: Spacing.md,
  },
  trailingIcon: {
    paddingRight: Spacing.lg,
  },
  error: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  hint: {
    ...Typography.caption,
    marginTop: Spacing.xs,
  },
});
