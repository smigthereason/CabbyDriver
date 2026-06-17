import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors, Typography, Spacing, Radius, Shadow } from "@/theme";
import { Button } from "@/components/ui/Button";
import { SubscriptionTier, SubscriptionPlan } from "@/types";
import { StepProgressBar } from "@/components/ui/Stepprogressbar";

interface Props {
  navigation: any;
}

// ─── Plan data (matches OnboardingPlan preview for consistency) ────────────

const plans: SubscriptionPlan[] = [
  {
    id: "eco-lite",
    name: "Eco-Lite",
    vehicleType: "Bike & Courier",
    priceMonthly: 1500,
    icon: "bike",
  },
  {
    id: "standard",
    name: "Standard",
    vehicleType: "Economy Sedan",
    priceMonthly: 3500,
    icon: "sedan",
    popular: true,
  },
  {
    id: "xl",
    name: "Cabby XL",
    vehicleType: "7 Seater",
    priceMonthly: 5500,
    icon: "suv",
  },
  {
    id: "luxury",
    name: "Luxury",
    vehicleType: "Executive Service",
    priceMonthly: 10000,
    icon: "luxury",
  },
];

// ─── Vehicle icon ──────────────────────────────────────────────────────────

const iconMap: Record<string, string> = {
  bike: "🏍️",
  sedan: "🚗",
  suv: "🚐",
  luxury: "🚘",
};

// ─── Plan card ─────────────────────────────────────────────────────────────

interface PlanCardProps {
  plan: SubscriptionPlan;
  selected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, selected, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.8}
    style={[
      cardStyles.card,
      selected ? cardStyles.cardSelected : cardStyles.cardUnselected,
    ]}
  >
    <View style={[cardStyles.iconBox, selected && cardStyles.iconBoxSelected]}>
      <Text style={cardStyles.iconEmoji}>{iconMap[plan.icon] ?? "🚗"}</Text>
    </View>

    <View style={cardStyles.textBlock}>
      <View style={cardStyles.nameRow}>
        <Text style={[cardStyles.name, selected && cardStyles.nameSelected]}>
          {plan.name}
        </Text>
        {plan.popular && (
          <View style={cardStyles.popularBadge}>
            <Text style={cardStyles.popularText}>most popular</Text>
          </View>
        )}
      </View>
      <Text
        style={[cardStyles.vehicle, selected && cardStyles.vehicleSelected]}
      >
        {plan.vehicleType}
      </Text>
    </View>

    <View style={cardStyles.priceBlock}>
      <Text style={[cardStyles.price, selected && cardStyles.priceSelected]}>
        KES {plan.priceMonthly.toLocaleString()}
      </Text>
      <Text style={[cardStyles.period, selected && cardStyles.periodSelected]}>
        Per Month
      </Text>
    </View>
  </TouchableOpacity>
);

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.subtle,
  },
  cardUnselected: { backgroundColor: Colors.white },
  cardSelected: { backgroundColor: Colors.black },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxSelected: { backgroundColor: Colors.white },
  iconEmoji: { fontSize: 26 },
  textBlock: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
  name: { ...Typography.labelLarge, fontSize: 16, color: Colors.black },
  nameSelected: { color: Colors.white },
  vehicle: { ...Typography.bodyMedium, color: Colors.gray500, marginTop: 2 },
  vehicleSelected: { color: Colors.gray300 },
  popularBadge: {
    backgroundColor: Colors.gray300,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.gray700,
    letterSpacing: 0.2,
  },
  priceBlock: { alignItems: "flex-end" },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.black,
    letterSpacing: -0.3,
  },
  priceSelected: { color: Colors.white },
  period: { fontSize: 11, color: Colors.gray400, marginTop: 1 },
  periodSelected: { color: Colors.gray400 },
});

// ─── Shield banner ─────────────────────────────────────────────────────────

const ShieldBanner = () => (
  <View style={bannerStyles.box}>
    <View style={bannerStyles.leftCol}>
      <View style={bannerStyles.iconCircle}>
        <Text style={bannerStyles.iconText}>!</Text>
      </View>
    </View>
    <View style={bannerStyles.rightCol}>
      <Text style={bannerStyles.eyebrow}>SUBSCRIPTION SHIELD</Text>
      <Text style={bannerStyles.headline}>100% FARE{"\n"}RETAINED</Text>
      <Text style={bannerStyles.body}>
        Your subscription ensures zero commission on all rides. You keep every
        shilling you earn.
      </Text>
    </View>
  </View>
);

const bannerStyles = StyleSheet.create({
  box: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
    ...Shadow.card,
  },
  leftCol: { paddingTop: Spacing.xs },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.gray400,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 12, fontWeight: "700", color: Colors.gray500 },
  rightCol: { flex: 1 },
  eyebrow: {
    ...Typography.labelSmall,
    color: Colors.gray500,
    marginBottom: Spacing.sm,
  },
  headline: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: Colors.black,
    lineHeight: 30,
    marginBottom: Spacing.md,
  },
  body: { ...Typography.bodyMedium, lineHeight: 20, color: Colors.gray500 },
});

// ─── Subscription Screen ───────────────────────────────────────────────────

export const SubscriptionScreen: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<SubscriptionTier>("standard");

  const selectedPlan = plans.find((p) => p.id === selected);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Step 3 of 3 — confirms they're near the end */}
      <StepProgressBar
        currentStep={3}
        totalSteps={3}
        labels={["Personal", "Driving", "Vehicle"]}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Drive</Text>
          {/* "pay after approval" — key change #1 */}
          <Text style={styles.subtitle}>
            Pick now, pay after approval. No charge until you're verified.
          </Text>
        </View>

        {/* Shield banner */}
        <ShieldBanner />

        {/* Plan cards */}
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            onSelect={() => setSelected(plan.id)}
          />
        ))}

        {/* Weekly option note */}
        <Text style={styles.weeklyNote}>
          Weekly payment available — ask about our flexible plan
        </Text>
      </ScrollView>

      {/* Sticky footer with selected plan name for clarity */}
      <View style={styles.footer}>
        <Button
          label={`Continue with ${selectedPlan?.name ?? "Standard"}`}
          onPress={() => navigation.navigate("Success")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  header: { marginBottom: Spacing.xxl },
  title: { ...Typography.displayLarge, fontSize: 28, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, lineHeight: 20 },
  weeklyNote: {
    ...Typography.caption,
    color: Colors.gray400,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    fontStyle: "italic",
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.offWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
});
