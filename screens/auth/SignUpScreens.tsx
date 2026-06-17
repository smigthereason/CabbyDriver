import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors, Typography, Spacing, Radius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { UploadGrid } from "@/components/ui/DocumentUpload";
import { InfoHint } from "@/components/ui/ScreenLayout";
import { StepProgressBar } from "@/components/ui/Stepprogressbar";

// ─── Step configuration ────────────────────────────────────────────────────
// Phase 2: Personal details  — step 1 of 3
// Phase 3: Driving credentials — step 2 of 3
// Phase 4: Vehicle setup      — step 3 of 3

const STEP_LABELS = ["Personal", "Driving", "Vehicle"];

// ─── Shared ────────────────────────────────────────────────────────────────

const PencilIcon = () => (
  <Text style={{ fontSize: 16, color: Colors.gray400 }}>✎</Text>
);

const TermsFooter = () => (
  <View style={termsStyles.row}>
    <View style={termsStyles.circle}>
      <Text style={termsStyles.check}>✓</Text>
    </View>
    <Text style={termsStyles.text}>
      By continuing, you agree to our{" "}
      <Text style={termsStyles.link}>Terms of Service</Text> and{" "}
      <Text style={termsStyles.link}>Privacy Policy</Text>.
    </Text>
  </View>
);

const termsStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  check: { color: Colors.white, fontSize: 14, fontWeight: "700" },
  text: {
    ...Typography.bodySmall,
    flex: 1,
    lineHeight: 18,
    color: Colors.gray500,
  },
  link: { fontWeight: "700", color: Colors.black },
});

// ─── 1. Create Account — step 1 of 3 ──────────────────────────────────────

interface SignUpAccountProps {
  navigation: any;
}

export const SignUpAccountScreen: React.FC<SignUpAccountProps> = ({
  navigation,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = fullName.trim() && email.trim() && phone.trim().length >= 9;

  return (
    <SafeAreaView style={sharedStyles.safe}>
      <StepProgressBar currentStep={1} totalSteps={3} labels={STEP_LABELS} />
      <KeyboardAvoidingView
        style={sharedStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={sharedStyles.flex}
          contentContainerStyle={sharedStyles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={sharedStyles.header}>
            <Text style={sharedStyles.title}>Create Account</Text>
            <Text style={sharedStyles.subtitle}>
              Please sign up to continue using our app.
            </Text>
          </View>

          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Jackson Ndegwa"
            autoCapitalize="words"
            returnKeyType="next"
            trailingIcon={<PencilIcon />}
          />
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="e.g. jackson@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            trailingIcon={<PencilIcon />}
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="713077198"
            keyboardType="phone-pad"
            returnKeyType="done"
            prefix="+254"
          />

          <Button
            label="Continue"
            onPress={() => navigation.navigate("SignUpVerification")}
            disabled={!isValid}
            style={{ marginTop: Spacing.sm }}
          />

          <TermsFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── 2. Verify Your Identity — step 1 of 3 (personal sub-step 2) ──────────

interface SignUpVerificationProps {
  navigation: any;
}

export const SignUpVerificationScreen: React.FC<SignUpVerificationProps> = ({
  navigation,
}) => {
  const [idNumber, setIdNumber] = useState("");
  const [kraPin, setKraPin] = useState("");
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const isValid =
    idNumber.trim() && kraPin.trim() && frontUploaded && backUploaded;

  return (
    <SafeAreaView style={sharedStyles.safe}>
      <StepProgressBar currentStep={1} totalSteps={3} labels={STEP_LABELS} />
      <KeyboardAvoidingView
        style={sharedStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={sharedStyles.flex}
          contentContainerStyle={sharedStyles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={sharedStyles.header}>
            <Text style={sharedStyles.title}>Verify your identity</Text>
            <Text style={sharedStyles.subtitle}>
              Used for compliance only — never shown publicly.
            </Text>
          </View>

          <TextInput
            label="National ID Number"
            value={idNumber}
            onChangeText={setIdNumber}
            placeholder="e.g. 28271654"
            keyboardType="number-pad"
            returnKeyType="next"
            trailingIcon={<PencilIcon />}
          />

          {/* KRA PIN with inline help text */}
          <TextInput
            label="KRA PIN"
            value={kraPin}
            onChangeText={setKraPin}
            placeholder="e.g. A104566125Q"
            autoCapitalize="characters"
            returnKeyType="done"
            trailingIcon={<PencilIcon />}
          />
          <Text style={sharedStyles.fieldHint}>
            e.g. A012345678B — found on your iTax certificate
          </Text>

          <Text style={sharedStyles.sectionLabel}>Identity Card Upload</Text>
          <UploadGrid
            items={[
              {
                label: "Front ID",
                uploaded: frontUploaded,
                onPress: () => setFrontUploaded(!frontUploaded),
              },
              {
                label: "Back ID",
                uploaded: backUploaded,
                onPress: () => setBackUploaded(!backUploaded),
              },
            ]}
          />

          <Button
            label="Next"
            onPress={() => navigation.navigate("SignUpCredentials")}
            disabled={!isValid}
            style={{ marginTop: Spacing.lg }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── 3. Driving Credentials — step 2 of 3 ─────────────────────────────────

interface SignUpCredentialsProps {
  navigation: any;
}

export const SignUpCredentialsScreen: React.FC<SignUpCredentialsProps> = ({
  navigation,
}) => {
  const [dlNumber, setDlNumber] = useState("");
  const [dlExpiry, setDlExpiry] = useState("");
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const isValid =
    dlNumber.trim() && dlExpiry.trim() && frontUploaded && backUploaded;

  return (
    <SafeAreaView style={sharedStyles.safe}>
      <StepProgressBar currentStep={2} totalSteps={3} labels={STEP_LABELS} />
      <KeyboardAvoidingView
        style={sharedStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={sharedStyles.flex}
          contentContainerStyle={sharedStyles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={sharedStyles.header}>
            <Text style={sharedStyles.title}>Driving Credentials</Text>
            <Text style={sharedStyles.subtitle}>
              Please fill in the correct details.
            </Text>
          </View>

          <TextInput
            label="DL Number"
            value={dlNumber}
            onChangeText={setDlNumber}
            placeholder="e.g. 28271654"
            returnKeyType="next"
            trailingIcon={<PencilIcon />}
          />
          <TextInput
            label="DL Expiry Date"
            value={dlExpiry}
            onChangeText={setDlExpiry}
            placeholder="dd/mm/yyyy"
            keyboardType="numbers-and-punctuation"
            returnKeyType="done"
            trailingIcon={
              <Text style={{ fontSize: 18, color: Colors.gray400 }}>📅</Text>
            }
          />

          <Text style={sharedStyles.sectionLabel}>Driving Licence Upload</Text>
          <UploadGrid
            items={[
              {
                label: "Front Licence",
                uploaded: frontUploaded,
                onPress: () => setFrontUploaded(!frontUploaded),
              },
              {
                label: "Back Licence",
                uploaded: backUploaded,
                onPress: () => setBackUploaded(!backUploaded),
              },
            ]}
          />

          <Button
            label="Next"
            onPress={() => navigation.navigate("SignUpEmergency")}
            disabled={!isValid}
            style={{ marginTop: Spacing.lg }}
          />
          <InfoHint text="We use this to determine your eligibility to drive." />

          <View style={sharedStyles.carDecor}>
            <Text style={sharedStyles.carEmoji}>🚗</Text>
            <Text style={sharedStyles.carNote}>[car-top-view.png]</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── 4. Emergency Contact — step 2 of 3 (reduced friction: phone only) ────
//     Removed: email field, relationship dropdown
//     Kept:    name + phone — fastest possible fill

const RELATIONSHIP_OPTIONS = [
  { label: "Spouse", value: "spouse" },
  { label: "Parent", value: "parent" },
  { label: "Sibling", value: "sibling" },
  { label: "Friend", value: "friend" },
  { label: "Other", value: "other" },
];

interface SignUpEmergencyProps {
  navigation: any;
}

export const SignUpEmergencyScreen: React.FC<SignUpEmergencyProps> = ({
  navigation,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.trim() && phone.trim().length >= 9;

  return (
    <SafeAreaView style={sharedStyles.safe}>
      <StepProgressBar currentStep={2} totalSteps={3} labels={STEP_LABELS} />
      <KeyboardAvoidingView
        style={sharedStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={sharedStyles.flex}
          contentContainerStyle={sharedStyles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={sharedStyles.header}>
            <Text style={sharedStyles.title}>Emergency Contact</Text>
            <Text style={sharedStyles.subtitle}>
              Who should we contact in case of emergencies?
            </Text>
          </View>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Rachel Wambui"
            autoCapitalize="words"
            returnKeyType="next"
            trailingIcon={<PencilIcon />}
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="716501583"
            keyboardType="phone-pad"
            returnKeyType="done"
            prefix="+254"
          />

          <Button
            label="Finish Sign-Up"
            onPress={() => navigation.navigate("CarDetails")}
            disabled={!isValid}
            style={{ marginTop: Spacing.sm }}
          />
          <InfoHint text="Used for onboarding verification only and not shared publicly." />

          <View style={sharedStyles.carDecor}>
            <Text style={sharedStyles.carEmoji}>🚗</Text>
            <Text style={sharedStyles.carNote}>[car-top-view.png]</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Shared styles ─────────────────────────────────────────────────────────

const sharedStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    flexGrow: 1,
  },
  header: { marginBottom: Spacing.xxl },
  title: { ...Typography.displayLarge, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, lineHeight: 20 },
  sectionLabel: {
    ...Typography.labelMedium,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  fieldHint: {
    ...Typography.caption,
    color: Colors.gray400,
    marginTop: -Spacing.sm,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.xs,
  },
  carDecor: { alignItems: "center", marginTop: Spacing.xxxl, opacity: 0.1 },
  carEmoji: { fontSize: 90 },
  carNote: {
    ...Typography.caption,
    color: Colors.gray300,
    marginTop: Spacing.xs,
  },
});
