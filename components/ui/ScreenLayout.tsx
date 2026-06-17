import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import { Colors, Typography, Spacing } from "../../theme";

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hint?: string;
  showCarDecoration?: boolean;
  scrollable?: boolean;
  style?: ViewStyle;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  subtitle,
  children,
  footer,
  hint,
  showCarDecoration = false,
  scrollable = true,
  style,
}) => {
  const content = (
    <View style={[styles.inner, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.body}>{children}</View>
      {hint ? (
        <View style={styles.hintRow}>
          <View style={styles.hintIcon}>
            <Text style={styles.hintIconText}>!</Text>
          </View>
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      ) : null}
      {showCarDecoration ? (
        <View style={styles.carDecoration}>
          {/* Replace with actual car asset: require('../../assets/car-top.png') */}
          <View style={styles.carPlaceholder}>
            <Text style={styles.carPlaceholderText}>🚗</Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {scrollable ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={styles.flex}>{content}</View>
        )}
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Back + Skip nav bar for onboarding screens
interface OnboardingNavProps {
  onBack?: () => void;
  onSkip?: () => void;
  showBack?: boolean;
}

export const OnboardingNav: React.FC<OnboardingNavProps> = ({
  onBack,
  onSkip,
  showBack = true,
}) => (
  <View style={navStyles.row}>
    {showBack ? (
      <TouchableOpacity
        style={navStyles.backBtn}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Text style={navStyles.backIcon}>‹</Text>
      </TouchableOpacity>
    ) : (
      <View style={navStyles.placeholder} />
    )}
    {onSkip ? (
      <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
        <Text style={navStyles.skipText}>Skip</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

// Info hint row
interface InfoHintProps {
  text: string;
}
export const InfoHint: React.FC<InfoHintProps> = ({ text }) => (
  <View style={hintStyles.row}>
    <View style={hintStyles.icon}>
      <Text style={hintStyles.iconText}>!</Text>
    </View>
    <Text style={hintStyles.text}>{text}</Text>
  </View>
);

// Divider with label
export const Divider: React.FC<{ label?: string }> = ({ label }) => (
  <View style={divStyles.row}>
    <View style={divStyles.line} />
    {label ? <Text style={divStyles.label}>{label}</Text> : null}
    {label ? <View style={divStyles.line} /> : null}
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.displayLarge,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.gray500,
    lineHeight: 20,
  },
  body: {
    flex: 1,
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  hintIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.gray400,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  hintIconText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.gray500,
  },
  hintText: {
    ...Typography.caption,
    color: Colors.gray500,
    flex: 1,
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.offWhite,
  },
  carDecoration: {
    alignItems: "center",
    marginTop: Spacing.xxl,
  },
  carPlaceholder: {
    width: 200,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.15,
  },
  carPlaceholderText: {
    fontSize: 80,
    transform: [{ rotate: "-20deg" }],
  },
});

const navStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: "300",
    lineHeight: 28,
  },
  placeholder: {
    width: 40,
  },
  skipText: {
    ...Typography.bodyLarge,
    color: Colors.gray500,
  },
});

const hintStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  icon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.gray400,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  iconText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.gray500,
  },
  text: {
    ...Typography.caption,
    color: Colors.gray500,
    flex: 1,
    lineHeight: 16,
  },
});

const divStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray200,
  },
  label: {
    ...Typography.bodyMedium,
    color: Colors.gray400,
    fontWeight: "500",
  },
});
