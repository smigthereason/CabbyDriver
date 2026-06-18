import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors, Typography, Spacing, Radius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { VEHICLE_MAKES, MODEL_MAP } from "@/constants/vehicleData";

/**
 * Phase 4 — Vehicle Setup (step 3 of 3, split into 3 sub-screens)
 *
 *   CarDetailsScreen  — make, model, year, plate        (sub-step 1 of 3)
 *   CarPhotosScreen   — 2 guided vehicle photos         (sub-step 2 of 3)
 *   CarDocsScreen     — LogBook, NTSA, PSV              (sub-step 3 of 3)
 */

// ─── Shared components ─────────────────────────────────────────────────────

const PencilIcon = () => (
  <Text style={{ fontSize: 16, color: Colors.gray400 }}>✎</Text>
);

// ─── Sub‑step dots indicator (appears next to the subtitle) ─────────────

interface DotsIndicatorProps {
  current: number; // 1‑based
  total: number;
}

const DotsIndicator: React.FC<DotsIndicatorProps> = ({ current, total }) => (
  <View style={dotStyles.row}>
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[dotStyles.dot, i + 1 <= current && dotStyles.dotFilled]}
      />
    ))}
  </View>
);

const dotStyles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6, marginLeft: Spacing.sm },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray300,
  },
  dotFilled: { backgroundColor: Colors.black },
});

// ─── Screen wrapper (same pattern as login / sign‑up) ────────────────────

type ScreenWrapperProps = {
  children: React.ReactNode;
  insets: any;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, insets }) => (
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
            paddingBottom: insets.bottom + Spacing.xxxl,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

// ─── Year options (still local) ──────────────────────────────────────────

const YEAR_OPTIONS = Array.from({ length: 20 }, (_, i) => {
  const y = (2024 - i).toString();
  return { label: y, value: y };
});

// ─── SUB‑SCREEN 1: Car Details ─────────────────────────────────────────────

interface CarDetailsProps {
  navigation: any;
}

export const CarDetailsScreen: React.FC<CarDetailsProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [year, setYear] = useState("");
  const [plate, setPlate] = useState("");

  // Check if selected make has a predefined model list
  const hasModels = make && MODEL_MAP[make] && MODEL_MAP[make].length > 0;
  const modelOptions = hasModels ? MODEL_MAP[make] : [];

  // Determine final model value
  const finalModel = hasModels ? model : customModel;

  const isValid = make && year && plate.trim() && finalModel.trim();

  const handleMakeChange = (val: string) => {
    setMake(val);
    setModel(""); // reset dropdown model
    setCustomModel(""); // reset custom model
  };

  return (
    <ScreenWrapper insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Your Vehicle</Text>
        <View style={sharedStyles.subtitleRow}>
          <Text style={sharedStyles.subtitle}>Enter vehicle details</Text>
          <DotsIndicator current={1} total={3} />
        </View>
      </View>

      <Dropdown
        label="Vehicle Make"
        options={VEHICLE_MAKES}
        value={make}
        placeholder="Select make…"
        onChange={handleMakeChange}
      />

      {hasModels ? (
        <Dropdown
          label="Vehicle Model"
          options={modelOptions}
          value={model}
          placeholder="Select model…"
          onChange={setModel}
        />
      ) : (
        <TextInput
          label="Vehicle Model"
          value={customModel}
          onChangeText={setCustomModel}
          placeholder="Enter model name…"
          autoCapitalize="words"
          returnKeyType="next"
          trailingIcon={<PencilIcon />}
        />
      )}

      <Dropdown
        label="Year of Manufacture"
        options={YEAR_OPTIONS}
        value={year}
        placeholder="Select year…"
        onChange={setYear}
      />

      <TextInput
        label="Registration Plate"
        value={plate}
        onChangeText={setPlate}
        placeholder="KDN 234G"
        autoCapitalize="characters"
        returnKeyType="done"
        trailingIcon={<PencilIcon />}
      />

      <Button
        label="Next — upload photos"
        onPress={() => navigation.navigate("CarPhotos")}
        disabled={!isValid}
        style={{ marginTop: Spacing.xl }}
      />
    </ScreenWrapper>
  );
};

// ─── SUB‑SCREEN 2: Vehicle Photos ─────────────────────────────────────────

interface CarPhotosProps {
  navigation: any;
}

// Single photo upload tile
const PhotoTile: React.FC<{
  label: string;
  subLabel: string;
  uploaded: boolean;
  onPress: () => void;
}> = ({ label, subLabel, uploaded, onPress }) => (
  <TouchableOpacity
    style={[photoStyles.tile, uploaded && photoStyles.tileUploaded]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    {uploaded ? (
      <>
        <Text style={photoStyles.checkMark}>✓</Text>
        <Text style={photoStyles.uploadedLabel}>Uploaded</Text>
      </>
    ) : (
      <>
        <View style={photoStyles.uploadIcon}>
          <View style={photoStyles.arrowUp} />
        </View>
        <Text style={photoStyles.tileLabel}>{label}</Text>
        <Text style={photoStyles.tileSub}>{subLabel}</Text>
      </>
    )}
  </TouchableOpacity>
);

export const CarPhotosScreen: React.FC<CarPhotosProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [frontPhoto, setFrontPhoto] = useState(false);
  const [rearPhoto, setRearPhoto] = useState(false);

  const isValid = frontPhoto && rearPhoto;

  return (
    <ScreenWrapper insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Vehicle Photos</Text>
        <View style={sharedStyles.subtitleRow}>
          <Text style={sharedStyles.subtitle}>
            Clear photos speed up approval
          </Text>
          <DotsIndicator current={2} total={3} />
        </View>
      </View>

      {/* Guideline hint */}
      <View style={photoStyles.guideRow}>
        <Text style={photoStyles.guideIcon}>💡</Text>
        <Text style={photoStyles.guideText}>
          Shoot outdoors in daylight. Full car visible, no cut‑offs.
        </Text>
      </View>

      <View style={photoStyles.grid}>
        <PhotoTile
          label="Front view"
          subLabel="Full front of vehicle"
          uploaded={frontPhoto}
          onPress={() => setFrontPhoto(!frontPhoto)}
        />
        <PhotoTile
          label="Rear view"
          subLabel="Full rear of vehicle"
          uploaded={rearPhoto}
          onPress={() => setRearPhoto(!rearPhoto)}
        />
      </View>

      <Button
        label="Next — upload documents"
        onPress={() => navigation.navigate("CarDocs")}
        disabled={!isValid}
        style={{ marginTop: Spacing.xl }}
      />
    </ScreenWrapper>
  );
};

const photoStyles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  tile: {
    flex: 1,
    aspectRatio: 0.85,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
    minHeight: 130,
  },
  tileUploaded: {
    borderStyle: "solid",
    borderColor: Colors.black,
    backgroundColor: Colors.gray50,
  },
  uploadIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  arrowUp: {
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.gray400,
    transform: [{ rotate: "-45deg" }],
    marginTop: 4,
  },
  tileLabel: {
    ...Typography.labelMedium,
    color: Colors.black,
    textAlign: "center",
  },
  tileSub: {
    ...Typography.caption,
    color: Colors.gray400,
    textAlign: "center",
    marginTop: 2,
  },
  checkMark: { fontSize: 28, color: Colors.black, fontWeight: "700" },
  uploadedLabel: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: Spacing.xs,
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  guideIcon: { fontSize: 18 },
  guideText: {
    ...Typography.bodySmall,
    color: Colors.gray600,
    flex: 1,
    lineHeight: 18,
  },
});

// ─── SUB‑SCREEN 3: Vehicle Documents ──────────────────────────────────────

interface CarDocsProps {
  navigation: any;
}

const DocRow: React.FC<{
  icon: string;
  label: string;
  subLabel: string;
  uploaded: boolean;
  onPress: () => void;
}> = ({ icon, label, subLabel, uploaded, onPress }) => (
  <TouchableOpacity
    style={[docStyles.row, uploaded && docStyles.rowUploaded]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <View style={docStyles.iconCircle}>
      <Text style={docStyles.iconText}>{icon}</Text>
    </View>
    <View style={docStyles.textCol}>
      <Text style={docStyles.label}>{label}</Text>
      <Text style={docStyles.sub}>{subLabel}</Text>
    </View>
    {uploaded && <Text style={docStyles.check}>✓</Text>}
  </TouchableOpacity>
);

export const CarDocsScreen: React.FC<CarDocsProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [logbook, setLogbook] = useState(false);
  const [ntsa, setNtsa] = useState(false);
  const [psv, setPsv] = useState(false);

  const isValid = logbook && ntsa && psv;

  return (
    <ScreenWrapper insets={insets}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>Vehicle Documents</Text>
        <View style={sharedStyles.subtitleRow}>
          <Text style={sharedStyles.subtitle}>
            Upload scans as clear photos
          </Text>
          <DotsIndicator current={3} total={3} />
        </View>
      </View>

      <View style={docStyles.stack}>
        <DocRow
          icon="📋"
          label="LogBook"
          subLabel="Vehicle registration document"
          uploaded={logbook}
          onPress={() => setLogbook(!logbook)}
        />
        <DocRow
          icon="🔖"
          label="NTSA Inspection"
          subLabel="Inspection report file"
          uploaded={ntsa}
          onPress={() => setNtsa(!ntsa)}
        />
        <DocRow
          icon="🛡️"
          label="PSV Insurance"
          subLabel="Valid policy document"
          uploaded={psv}
          onPress={() => setPsv(!psv)}
        />
      </View>

      <Button
        label="Finish sign-up"
        onPress={() => navigation.navigate("Subscription")}
        disabled={!isValid}
        style={{ marginTop: Spacing.xxl }}
      />

      {/* Hint */}
      <View style={sharedStyles.hintRow}>
        <View style={sharedStyles.hintIcon}>
          <Text style={sharedStyles.hintIconText}>!</Text>
        </View>
        <Text style={sharedStyles.hintText}>
          Clear photos lead to faster approvals.
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const docStyles = StyleSheet.create({
  stack: { gap: Spacing.md },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.gray300,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  rowUploaded: {
    borderStyle: "solid",
    borderColor: Colors.black,
    backgroundColor: Colors.gray50,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 22 },
  textCol: { flex: 1 },
  label: { ...Typography.labelLarge, color: Colors.black },
  sub: { ...Typography.caption, color: Colors.gray400, marginTop: 2 },
  check: { fontSize: 18, color: Colors.black, fontWeight: "700" },
});

// ─── Shared styles ─────────────────────────────────────────────────────────

const sharedStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xl,
    // paddingTop & paddingBottom are set dynamically via insets
  },
  header: { marginBottom: Spacing.xxl },
  title: { ...Typography.displayLarge, marginBottom: Spacing.xs },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, flex: 1 },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    justifyContent: "center",
  },
  hintIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.gray400,
    alignItems: "center",
    justifyContent: "center",
  },
  hintIconText: { fontSize: 11, fontWeight: "700", color: Colors.gray500 },
  hintText: { ...Typography.caption, color: Colors.gray500 },
});
