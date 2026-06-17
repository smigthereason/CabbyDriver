import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Colors, Typography, Spacing, Radius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { StepProgressBar } from "@/components/ui/Stepprogressbar";
/**
 * Phase 4 — Vehicle Setup (step 3 of 3, split into 3 sub-screens)
 *
 *   CarDetailsScreen  — make, model, year, plate        (sub-step 1 of 3)
 *   CarPhotosScreen   — 2 guided vehicle photos          (sub-step 2 of 3)
 *   CarDocsScreen     — LogBook, NTSA, PSV               (sub-step 3 of 3)
 */

// ─── Step label config ─────────────────────────────────────────────────────
const STEP_LABELS = ["Personal", "Driving", "Vehicle"];

// ─── Sub-step progress strip (separate from main StepProgressBar) ──────────

interface SubStepProps {
  current: number;
  total: number;
  label: string;
}

const SubStepBadge: React.FC<SubStepProps> = ({ current, total, label }) => (
  <View style={subStyles.row}>
    <Text style={subStyles.text}>
      Step {current} of {total} — {label}
    </Text>
    <View style={subStyles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[subStyles.dot, i + 1 <= current && subStyles.dotFilled]}
        />
      ))}
    </View>
  </View>
);

const subStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  text: { ...Typography.caption, color: Colors.gray500 },
  dotsRow: { flexDirection: "row", gap: 4 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray300,
  },
  dotFilled: { backgroundColor: Colors.black },
});

// ─── Shared PencilIcon ─────────────────────────────────────────────────────
const PencilIcon = () => (
  <Text style={{ fontSize: 16, color: Colors.gray400 }}>✎</Text>
);

// ─── Vehicle make / model data ─────────────────────────────────────────────

const VEHICLE_MAKES = [
  { label: "Toyota", value: "toyota" },
  { label: "Mazda", value: "mazda" },
  { label: "Nissan", value: "nissan" },
  { label: "Honda", value: "honda" },
  { label: "Subaru", value: "subaru" },
  { label: "Mitsubishi", value: "mitsubishi" },
  { label: "Volkswagen", value: "volkswagen" },
  { label: "Mercedes-Benz", value: "mercedes" },
  { label: "BMW", value: "bmw" },
  { label: "Other", value: "other" },
];

const YEAR_OPTIONS = Array.from({ length: 20 }, (_, i) => {
  const y = (2024 - i).toString();
  return { label: y, value: y };
});

const MODEL_MAP: Record<string, Array<{ label: string; value: string }>> = {
  mazda: [
    { label: "Demio", value: "demio" },
    { label: "Axela", value: "axela" },
    { label: "Atenza", value: "atenza" },
    { label: "CX-5", value: "cx5" },
    { label: "CX-3", value: "cx3" },
  ],
  toyota: [
    { label: "Vitz", value: "vitz" },
    { label: "Fielder", value: "fielder" },
    { label: "Allion", value: "allion" },
    { label: "Premio", value: "premio" },
    { label: "Prado", value: "prado" },
    { label: "Land Cruiser", value: "lc" },
  ],
};

const PLACEHOLDER_MODELS = [{ label: "Select make first", value: "" }];

// ─── SUB-SCREEN 1: Car Details ─────────────────────────────────────────────

interface CarDetailsProps {
  navigation: any;
}

export const CarDetailsScreen: React.FC<CarDetailsProps> = ({ navigation }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plate, setPlate] = useState("");

  const models = make
    ? (MODEL_MAP[make] ?? PLACEHOLDER_MODELS)
    : PLACEHOLDER_MODELS;
  const isValid = make && model && year && plate.trim();

  return (
    <SafeAreaView style={styles.safe}>
      <StepProgressBar currentStep={3} totalSteps={3} labels={STEP_LABELS} />
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
            <Text style={styles.title}>Your Vehicle</Text>
            <Text style={styles.subtitle}>Step 1 of 3 — enter details</Text>
          </View>

          <SubStepBadge current={1} total={3} label="Details" />

          <Dropdown
            label="Vehicle Make"
            options={VEHICLE_MAKES}
            value={make}
            placeholder="Select make…"
            onChange={(v) => {
              setMake(v);
              setModel("");
            }}
          />
          <Dropdown
            label="Vehicle Model"
            options={models}
            value={model}
            placeholder="Select model…"
            onChange={setModel}
          />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── SUB-SCREEN 2: Vehicle Photos ─────────────────────────────────────────

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
  const [frontPhoto, setFrontPhoto] = useState(false);
  const [rearPhoto, setRearPhoto] = useState(false);

  const isValid = frontPhoto && rearPhoto;

  return (
    <SafeAreaView style={styles.safe}>
      <StepProgressBar currentStep={3} totalSteps={3} labels={STEP_LABELS} />
      <KeyboardAvoidingView style={styles.flex} behavior={undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Vehicle Photos</Text>
            <Text style={styles.subtitle}>
              Step 2 of 3 — clear photos speed up approval
            </Text>
          </View>

          <SubStepBadge current={2} total={3} label="Photos" />

          {/* Guideline hint */}
          <View style={photoStyles.guideRow}>
            <Text style={photoStyles.guideIcon}>💡</Text>
            <Text style={photoStyles.guideText}>
              Shoot outdoors in daylight. Full car visible, no cut-offs.
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

// ─── SUB-SCREEN 3: Vehicle Documents ──────────────────────────────────────

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
  const [logbook, setLogbook] = useState(false);
  const [ntsa, setNtsa] = useState(false);
  const [psv, setPsv] = useState(false);

  const isValid = logbook && ntsa && psv;

  return (
    <SafeAreaView style={styles.safe}>
      <StepProgressBar currentStep={3} totalSteps={3} labels={STEP_LABELS} />
      <KeyboardAvoidingView style={styles.flex} behavior={undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Vehicle Documents</Text>
            <Text style={styles.subtitle}>
              Step 3 of 3 — upload scans in clear photos
            </Text>
          </View>

          <SubStepBadge current={3} total={3} label="Documents" />

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
          <View style={styles.hintRow}>
            <View style={styles.hintIcon}>
              <Text style={styles.hintIconText}>!</Text>
            </View>
            <Text style={styles.hintText}>
              Clear photos lead to faster approvals.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    flexGrow: 1,
  },
  header: { marginBottom: Spacing.md },
  title: { ...Typography.displayLarge, marginBottom: Spacing.xs },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500 },
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
