import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
  useWindowDimensions,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors, Typography, Spacing, Radius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { UploadGrid } from "@/components/ui/DocumentUpload";
import { InfoHint } from "@/components/ui/ScreenLayout";

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

// ─── Driving car ────────────────────────────────────────────────────────
const CAR_WIDTH = 200;
const CAR_HEIGHT = 150;

const DrivingCar: React.FC<{ progress: number }> = ({ progress }) => {
  const { width: screenWidth } = useWindowDimensions();
  const travelDistance = Math.max(screenWidth - Spacing.xl * 2 - CAR_WIDTH, 0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: progress,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [progress, progressAnim]);

  const translateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, travelDistance],
  });

  return (
    <View style={sharedStyles.carWrapper}>
      <Animated.View style={[styles.carTrack, { transform: [{ translateX }] }]}>
        <Image
          source={require("assets/images/sign_up_car_slide.png")}
          style={styles.carImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  carTrack: { width: CAR_WIDTH },
  carImage: { width: CAR_WIDTH, height: CAR_HEIGHT },
});

// ─── Date picker modal ──────────────────────────────────────────────────
interface DatePickerModalProps {
  visible: boolean;
  onClose: (date?: Date) => void;
  initialDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  initialDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());

  const onChange = (event: any, date?: Date) => {
    if (date) setSelectedDate(date);
  };

  const handleConfirm = () => {
    onClose(selectedDate);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Select Expiry Date</Text>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={onChange}
            style={{ width: "100%" }}
          />
          <View style={modalStyles.buttonRow}>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton]}
              onPress={() => onClose()}
            >
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={modalStyles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    ...Typography.headlineSmall,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: "center",
    marginHorizontal: Spacing.xs,
  },
  cancelButton: {
    backgroundColor: Colors.gray200,
  },
  confirmButton: {
    backgroundColor: Colors.black,
  },
  cancelText: {
    ...Typography.bodyMedium,
    color: Colors.gray700,
    fontWeight: "600",
  },
  confirmText: {
    ...Typography.bodyMedium,
    color: Colors.white,
    fontWeight: "600",
  },
});

// ─── Screen wrapper ─────────────────────────────────────────────────────
type ScreenWrapperProps = {
  children: React.ReactNode;
  carProgress?: number;
  insets: any;
  showCar?: boolean;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  carProgress = 0,
  insets,
  showCar = true,
}) => {
  return (
    <SafeAreaView style={sharedStyles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={sharedStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          style={sharedStyles.flex}
          contentContainerStyle={[
            sharedStyles.scroll,
            {
              paddingTop: insets.top + Spacing.lg,
              paddingBottom: insets.bottom + Spacing.xl,
              flexGrow: 1,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={sharedStyles.contentContainer}>
            <View>{children}</View>
            <View style={sharedStyles.spacer} />
            {showCar && <DrivingCar progress={carProgress} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── 1. Create Account (no car) ────────────────────────────────────────
interface SignUpAccountProps {
  navigation: any;
}

// Gender options
const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const SignUpAccountScreen: React.FC<SignUpAccountProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const isValid =
    fullName.trim() &&
    email.trim() &&
    gender &&
    phone.replace(/\D/g, "").length >= 9;

  return (
    <ScreenWrapper showCar={false} insets={insets}>
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
        placeholder="e.g. jacksonndegwa@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        trailingIcon={<PencilIcon />}
      />

      {/* Gender dropdown */}
      <Dropdown
        label="Gender"
        options={GENDER_OPTIONS}
        value={gender}
        placeholder="Select gender…"
        onChange={setGender}
      />

      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
        placeholder="713077198"
        keyboardType="phone-pad"
        returnKeyType="done"
        prefix="+254"
        containerStyle={sharedStyles.phoneInputContainer}
      />

      <Button
        label="Continue"
        onPress={() => navigation.navigate("SignUpVerification")}
        disabled={!isValid}
        style={{ marginTop: Spacing.xxxl }}
      />

      <TermsFooter />
    </ScreenWrapper>
  );
};

// ─── 2. Verify Your Identity (car progress 0.0) ──────────────────────
interface SignUpVerificationProps {
  navigation: any;
}

export const SignUpVerificationScreen: React.FC<SignUpVerificationProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [idNumber, setIdNumber] = useState("");
  const [kraPin, setKraPin] = useState("");
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const isValid =
    idNumber.trim() && kraPin.trim() && frontUploaded && backUploaded;

  return (
    <ScreenWrapper carProgress={-1} insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Verify Your Identity</Text>
        <Text style={sharedStyles.subtitle}>
          Please fill in the correct details
        </Text>
      </View>

      <TextInput
        label="ID Number"
        value={idNumber}
        onChangeText={setIdNumber}
        placeholder="e.g. 28271654"
        keyboardType="number-pad"
        returnKeyType="next"
        trailingIcon={<PencilIcon />}
      />

      <TextInput
        label="KRA PIN"
        value={kraPin}
        onChangeText={setKraPin}
        placeholder="e.g. A104566125Q"
        autoCapitalize="characters"
        returnKeyType="done"
        trailingIcon={<PencilIcon />}
      />

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
        onPress={() => navigation.navigate("SignUpLocation")}
        disabled={!isValid}
        style={{ marginTop: Spacing.lg }}
      />
    </ScreenWrapper>
  );
};

// ─── 3. Location and Residency (car progress 0.33) ──────────────────
interface SignUpLocationProps {
  navigation: any;
}

export const SignUpLocationScreen: React.FC<SignUpLocationProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [houseNo, setHouseNo] = useState("");

  const isValid = city.trim() && area.trim();

  return (
    <ScreenWrapper carProgress={-0.5} insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Location and Residency</Text>
        <Text style={sharedStyles.subtitle}>
          Drivers need to be localized for precision dispatching and
          verification
        </Text>
      </View>

      <TextInput
        label="City/County"
        value={city}
        onChangeText={setCity}
        placeholder="e.g. Nairobi"
        autoCapitalize="words"
        returnKeyType="next"
        trailingIcon={<PencilIcon />}
      />
      <TextInput
        label="Residential Area/ Estate"
        value={area}
        onChangeText={setArea}
        placeholder="e.g. Lavington"
        autoCapitalize="words"
        returnKeyType="next"
        trailingIcon={<PencilIcon />}
      />
      <TextInput
        label="House No/ Street (Optional)"
        value={houseNo}
        onChangeText={setHouseNo}
        placeholder="e.g. Chalbi Drive"
        autoCapitalize="words"
        returnKeyType="done"
        trailingIcon={<PencilIcon />}
      />

      <Button
        label="Next"
        onPress={() => navigation.navigate("SignUpCredentials")}
        disabled={!isValid}
        style={{ marginTop: Spacing.lg }}
      />
      <InfoHint text="Your residency details are used for onboarding verification only and are not shared publicly." />
    </ScreenWrapper>
  );
};

// ─── 4. Driving Credentials (car progress 0.66) ──────────────────────
interface SignUpCredentialsProps {
  navigation: any;
}

export const SignUpCredentialsScreen: React.FC<SignUpCredentialsProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [dlNumber, setDlNumber] = useState("");
  const [dlExpiry, setDlExpiry] = useState("");
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const isValid =
    dlNumber.trim() && dlExpiry.trim() && frontUploaded && backUploaded;

  const handleDateSelect = (date?: Date) => {
    setPickerVisible(false);
    if (date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      setDlExpiry(`${day}/${month}/${year}`);
    }
  };

  return (
    <ScreenWrapper carProgress={0.5} insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Driving Credentials</Text>
        <Text style={sharedStyles.subtitle}>
          Please fill in the correct details
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

      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        activeOpacity={0.7}
      >
        <View pointerEvents="none">
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
        </View>
      </TouchableOpacity>

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

      <DatePickerModal
        visible={pickerVisible}
        onClose={handleDateSelect}
        initialDate={new Date()}
      />
    </ScreenWrapper>
  );
};

// ─── 5. Next of Kin (car progress 1.0) ──────────────────────────────
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
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const isValid =
    name.trim() &&
    email.trim() &&
    relationship &&
    phone.replace(/\D/g, "").length >= 9;

  return (
    <ScreenWrapper carProgress={1.0} insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Next of Kin</Text>
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
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="e.g. rachell2wambui@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        trailingIcon={<PencilIcon />}
      />
      <Dropdown
        label="Relationship"
        value={relationship}
        options={RELATIONSHIP_OPTIONS}
        onChange={setRelationship}
        placeholder="Select relationship"
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
        placeholder="716501583"
        keyboardType="phone-pad"
        returnKeyType="done"
        prefix="+254"
        containerStyle={sharedStyles.phoneInputContainer}
      />

      <Button
        label="Finish Sign-Up"
        onPress={() => navigation.navigate("CarDetails")}
        disabled={!isValid}
        style={{ marginTop: Spacing.xxxl }}
      />
      <InfoHint text="Your next of kin details are used for verification only and are not shared publicly." />
    </ScreenWrapper>
  );
};

// ─── Shared styles ─────────────────────────────────────────────────────────

const sharedStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xl,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  spacer: {
    flex: 1,
  },
  header: { marginBottom: Spacing.xxl },
  title: { ...Typography.displayLarge, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, lineHeight: 20 },
  sectionLabel: {
    ...Typography.labelMedium,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  carWrapper: {
    marginTop: Spacing.md,
    alignItems: "center",
  },
  phoneInputContainer: {
    height: 44,
  },
});
