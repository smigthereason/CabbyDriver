import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput as RNTextInput,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors, Typography, Spacing, Radius, Shadow } from "@/theme";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Divider } from "@/components/ui/ScreenLayout";

interface Props {
  navigation: any;
}

// ─── Field icons ──────────────────────────────────────────────────────────
const EmailIcon = () => (
  <Text style={{ fontSize: 16, color: Colors.gray400 }}>✉️</Text>
);
const PhoneIcon = () => (
  <Text style={{ fontSize: 16, color: Colors.gray400 }}>📞</Text>
);

// ─── Pill input row with leading icon ──────────────────────────────────
const IconField: React.FC<{
  icon: React.ReactNode;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  returnKeyType?: "done" | "next";
}> = ({
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  returnKeyType = "done",
}) => (
  <View style={fieldStyles.container}>
    <View style={fieldStyles.iconWrap}>{icon}</View>
    <RNTextInput
      style={fieldStyles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray400}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
);

// ─── Social login button (uses official brand PNG icons) ──────────────
const SocialButton: React.FC<{
  provider: "google" | "facebook";
  onPress: () => void;
}> = ({ provider, onPress }) => {
  const iconSource =
    provider === "google"
      ? require("assets/icons/Google.png")
      : require("assets/icons/Facebook.png");

  return (
    <TouchableOpacity
      style={socialStyles.btn}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={iconSource}
        style={socialStyles.icon}
        resizeMode="contain"
      />
      <Text style={socialStyles.label}>
        {provider === "google" ? "Google" : "Facebook"}
      </Text>
    </TouchableOpacity>
  );
};

// ─── LoginScreen ────────────────────────────────────────────────────────
export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = /\S+@\S+\.\S+/.test(email.trim());
  const isPhoneValid = phone.trim().replace(/\D/g, "").length >= 9;
  const isValid = isEmailValid || isPhoneValid;

  const handleContinue = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OTPVerification", {
        phone: isPhoneValid
          ? `+254${phone.trim().replace(/\D/g, "")}`
          : undefined,
        email: isEmailValid ? email.trim() : undefined,
      });
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top + Spacing.xxxl,
              paddingBottom: insets.bottom + Spacing.xxl,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.subtitle}>
              Please login or sign up to continue using our app.
            </Text>
          </View>

          {/* Form fields */}
          <IconField
            icon={<EmailIcon />}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <View style={{ height: Spacing.md }} />

          <IconField
            icon={<PhoneIcon />}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            returnKeyType="done"
          />

          <View style={{ height: Spacing.lg }} />

          <Button
            label="Continue"
            onPress={handleContinue}
            loading={loading}
            disabled={!isValid}
          />

          <Divider label="OR" />

          <SocialButton provider="google" onPress={() => {}} />
          <View style={{ height: Spacing.md }} />
          <SocialButton provider="facebook" onPress={() => {}} />

          <TouchableOpacity
            style={styles.signUpRow}
            onPress={() => navigation.navigate("SignUpAccount")}
            activeOpacity={0.7}
          >
            <Text style={styles.signUpText}>
              Dont Have An Account?{" "}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

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

          <View style={styles.carContainer}>
            <Image
              source={require("assets/images/login_image.png")}
              style={styles.carImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── OTP Verification Screen ────────────────────────────────────────────
interface OTPProps {
  navigation: any;
  route: { params: { phone?: string; email?: string } };
}

export const OTPVerificationScreen: React.FC<OTPProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { phone, email } = route.params ?? {};
  const destination = phone || email || "your device";
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
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top + Spacing.xxxl,
              paddingBottom: insets.bottom + Spacing.xxl,
            },
          ]}
        >
          <View style={styles.otpHeader}>
            <Text style={styles.otpIcon}>🔐</Text>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              We sent a 6‑digit code to{" "}
              <Text style={styles.destinationHighlight}>{destination}</Text>
            </Text>
          </View>

          <TextInput
            label="OTP Code"
            value={otp}
            onChangeText={(t) => setOtp(t.replace(/\D/g, "").slice(0, 6))}
            placeholder="e.g. 123456"
            keyboardType="number-pad"
            returnKeyType="done"
            containerStyle={styles.otpInput}
          />

          <Text style={styles.otpHint}>
            Enter the code we sent to your {phone ? "phone" : "email"}.
          </Text>

          <Button
            label="Verify"
            onPress={handleVerify}
            loading={loading}
            disabled={!isValid}
            style={styles.verifyButton}
          />

          <TouchableOpacity style={styles.resendRow} onPress={() => {}}>
            <Text style={styles.resendText}>Didn't receive it? </Text>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    // Top & bottom padding are set dynamically via insets
  },
  header: { marginBottom: Spacing.xxxl },
  title: { ...Typography.displayLarge, fontSize: 34, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, lineHeight: 22 },
  phoneInput: { marginBottom: Spacing.xs },
  signUpRow: { alignItems: "center", marginTop: Spacing.xl },
  signUpText: { ...Typography.bodyMedium, color: Colors.gray500 },
  signUpLink: { fontWeight: "700", color: Colors.black },
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
  carContainer: {
    alignItems: "center",
    marginTop: Spacing.lg,
    width: "100%",
    height: 160,
  },
  carImage: { width: "100%", height: "100%" },

  // OTP specific
  otpHeader: {
    marginBottom: Spacing.xxl,
    alignItems: "center",
  },
  otpIcon: { fontSize: 48, marginBottom: Spacing.sm },
  destinationHighlight: {
    fontWeight: "700",
    color: Colors.black,
  },
  otpInput: {
    marginBottom: Spacing.sm,
  },
  otpHint: {
    ...Typography.bodySmall,
    color: Colors.gray500,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  verifyButton: {
    marginTop: Spacing.md,
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

const fieldStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    borderWidth: 1.2,
    borderColor: Colors.inputBorder,
    height: 56,
    paddingHorizontal: Spacing.lg,
    ...Shadow.subtle,
  },
  iconWrap: {
    width: 24,
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    height: "100%",
    ...Typography.bodyMedium,
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
    width: 24,
    height: 24,
  },
  label: { ...Typography.labelLarge, color: Colors.black },
});
