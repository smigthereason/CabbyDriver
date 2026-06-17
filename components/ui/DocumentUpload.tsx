import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Colors, Typography, Spacing, Radius } from "../../theme";

interface DocumentUploadProps {
  label: string;
  subLabel?: string;
  uploaded?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  variant?: "square" | "wide";
  icon?: "document" | "badge" | "shield";
}

const Icon: React.FC<{ type: string; uploaded: boolean }> = ({
  type,
  uploaded,
}) => {
  // Placeholder icons using unicode / text
  const iconMap: Record<string, string> = {
    document: "📄",
    badge: "🔖",
    shield: "🛡️",
    upload: "⬆",
  };
  if (uploaded) return <Text style={{ fontSize: 22 }}>✅</Text>;
  return (
    <View style={iconStyles.wrapper}>
      {/* Simple line-art placeholder */}
      <View style={iconStyles.docBody}>
        <View style={iconStyles.arrow} />
      </View>
    </View>
  );
};

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  subLabel,
  uploaded = false,
  onPress,
  style,
  variant = "square",
  icon = "document",
}) => {
  const isWide = variant === "wide";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.base,
        isWide ? styles.wide : styles.square,
        uploaded && styles.uploaded,
        style,
      ]}
    >
      <Icon type={icon} uploaded={uploaded} />
      <Text style={[styles.label, uploaded && styles.labelUploaded]}>
        {label}
      </Text>
      {subLabel ? <Text style={styles.subLabel}>{subLabel}</Text> : null}
      {uploaded && <Text style={styles.badge}>Uploaded</Text>}
    </TouchableOpacity>
  );
};

// 2-column upload grid
interface UploadGridProps {
  items: Array<{
    label: string;
    subLabel?: string;
    uploaded?: boolean;
    onPress: () => void;
    icon?: "document" | "badge" | "shield";
  }>;
}

export const UploadGrid: React.FC<UploadGridProps> = ({ items }) => (
  <View style={gridStyles.grid}>
    {items.map((item, i) => (
      <DocumentUpload key={i} {...item} style={gridStyles.cell} />
    ))}
  </View>
);

export const UploadWide: React.FC<Omit<DocumentUploadProps, "variant">> = (
  props,
) => (
  <DocumentUpload
    {...props}
    variant="wide"
    style={{ marginBottom: Spacing.md }}
  />
);

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
    padding: Spacing.xl,
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    minHeight: 110,
  },
  wide: {
    width: "100%",
    minHeight: 90,
    flexDirection: "row",
    gap: Spacing.lg,
    justifyContent: "flex-start",
    paddingHorizontal: Spacing.xl,
  },
  uploaded: {
    borderStyle: "solid",
    borderColor: Colors.black,
    backgroundColor: Colors.gray50,
  },
  label: {
    ...Typography.labelMedium,
    marginTop: Spacing.sm,
    textAlign: "center",
    color: Colors.gray600,
  },
  labelUploaded: {
    color: Colors.black,
  },
  subLabel: {
    ...Typography.caption,
    marginTop: 2,
    textAlign: "center",
  },
  badge: {
    marginTop: Spacing.xs,
    fontSize: 10,
    fontWeight: "600",
    color: Colors.success,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

const iconStyles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  docBody: {
    width: 32,
    height: 40,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.gray400,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    width: 14,
    height: 14,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.gray400,
    transform: [{ rotate: "-45deg" }],
    marginTop: 4,
  },
});

const gridStyles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  cell: {
    flex: 1,
  },
});
