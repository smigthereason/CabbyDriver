import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors, Typography, Spacing, Radius, Shadow } from "@/theme";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Divider } from "@/components/ui/ScreenLayout";

interface Props {
  navigation: any;
}

// ─── Phone icon (envelope was wrong — now a phone receiver) ───────────────
const PhoneIcon = () => (
  <Text style={{ fontSize: 16, color: Colors.gray400 }}>📞</Text>
);

// ─── Social login button ───────────────────────────────────────────────────
const SocialButton: React.FC<{
  provider: "google" | "apple";
  onPress: () => void;
}> = ({ provider, onPress }) => (
  <TouchableOpacity
    style={socialStyles.btn}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {/* Replace with actual brand SVG icons */}
    <Text style={socialStyles.icon}>{provider === "google" ? "G" : ""}</Text>
    <Text style={socialStyles.label}>
      {provider === "google" ? "Continue with Google" : "Continue with Apple"}
    </Text>
  </TouchableOpacity>
);

// ─── LoginScreen ───────────────────────────────────────────────────────────

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Basic validation — at least 9 digits after prefix
  const isValid = phone.trim().replace(/\D/g, "").length >= 9;

  const handleSendOTP = () => {
    if (!isValid) return;
    setLoading(true);
    // Simulate OTP send — navigate to OTP entry
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OTPVerification", { phone: `+254${phone}` });
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.subtitle}>
              Create an account or log in to continue.
            </Text>
          </View>

          {/* Phone number input */}
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="7XX XXX XXX"
            keyboardType="phone-pad"
            returnKeyType="done"
            prefix="+254"
            containerStyle={styles.phoneInput}
          />
          <Text style={styles.otpHint}>
            We'll send a 6-digit OTP to verify your number.
          </Text>

          <Button
            label="Send OTP"
            onPress={handleSendOTP}
            loading={loading}
            disabled={!isValid}
          />

          <Divider label="OR" />

          {/* Social auth */}
          <SocialButton provider="google" onPress={() => {}} />
          <View style={{ height: Spacing.md }} />
          <SocialButton provider="apple" onPress={() => {}} />

          {/* Terms */}
          <View style={styles.termsRow}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Car decoration */}
          <View style={styles.carContainer}>
            <View style={styles.carPlaceholder}>
              <Text style={styles.carPlaceholderEmoji}>🚗</Text>
              <Text style={styles.carPlaceholderNote}>[car-top-view.png]</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── OTP Verification Screen ───────────────────────────────────────────────

interface OTPProps {
  navigation: any;
  route: { params: { phone: string } };
}

export const OTPVerificationScreen: React.FC<OTPProps> = ({
  navigation,
  route,
}) => {
  const { phone } = route.params ?? { phone: "+254 7XX XXX XXX" };
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = otp.trim().length === 6;

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Onboarding1");
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              We sent a 6-digit code to {phone}
            </Text>
          </View>

          <TextInput
            label="OTP Code"
            value={otp}
            onChangeText={(t) => setOtp(t.replace(/\D/g, "").slice(0, 6))}
            placeholder="e.g. 123456"
            keyboardType="number-pad"
            returnKeyType="done"
            containerStyle={styles.phoneInput}
          />

          <Button
            label="Verify"
            onPress={handleVerify}
            loading={loading}
            disabled={!isValid}
          />

          <TouchableOpacity style={styles.resendRow} onPress={() => {}}>
            <Text style={styles.resendText}>Didn't receive it? </Text>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
    flexGrow: 1,
  },
  header: { marginBottom: Spacing.xxxl },
  title: { ...Typography.displayLarge, fontSize: 34, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, lineHeight: 22 },
  phoneInput: { marginBottom: Spacing.xs },
  otpHint: {
    ...Typography.caption,
    color: Colors.gray400,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.xs,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginTop: Spacing.xxl,
    paddingHorizontal: Spacing.xs,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    flexShrink: 0,
  },
  checkMark: { color: Colors.white, fontSize: 14, fontWeight: "700" },
  termsText: { ...Typography.bodyMedium, flex: 1, lineHeight: 20 },
  termsLink: { fontWeight: "700", color: Colors.black },
  carContainer: { alignItems: "center", marginTop: Spacing.huge },
  carPlaceholder: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.12,
  },
  carPlaceholderEmoji: { fontSize: 100 },
  carPlaceholderNote: {
    ...Typography.caption,
    marginTop: Spacing.sm,
    color: Colors.gray400,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xxl,
  },
  resendText: { ...Typography.bodyMedium, color: Colors.gray500 },
  resendLink: {
    ...Typography.bodyMedium,
    fontWeight: "700",
    color: Colors.black,
  },
});

const socialStyles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    borderWidth: 1.2,
    borderColor: Colors.inputBorder,
    height: 56,
    gap: Spacing.md,
    ...Shadow.subtle,
  },
  icon: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
    width: 24,
    textAlign: "center",
  },
  label: { ...Typography.labelLarge, color: Colors.black },
});
