import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors, Typography, Spacing, Radius, Shadow } from "@/theme";
import { Button } from "@/components/ui/Button";

interface Props {
  navigation: any;
}

// ─── Plan data ────────────────────────────────────────────────────────────

interface SubscriptionPlan {
  id: string;
  name: string;
  vehicleType: string;
  priceMonthly: number;
  iconKey: string; // key to look up image
  weeklyAvailable: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    id: "boda",
    name: "Eco-Lite",
    vehicleType: "Motorcycle / Tuk‑Tuk",
    priceMonthly: 1500,
    iconKey: "boda",
    weeklyAvailable: true,
  },
  {
    id: "compact",
    name: "Standard",
    vehicleType: "Small Cars (Alto, Vitz, etc.)",
    priceMonthly: 3500,
    iconKey: "compact",
    weeklyAvailable: true,
  },
  {
    id: "sedan",
    name: "Cabby-XL",
    vehicleType: "7‑Seater",
    priceMonthly: 5500,
    iconKey: "xl",
    weeklyAvailable: true,
  },
  {
    id: "luxurr",
    name: "Cabby-LUX",
    vehicleType: "VIP (Benz,Prado,BMW)",
    priceMonthly: 10000,
    iconKey: "luxury",
    weeklyAvailable: true,
  },
  {
    id: "courier",
    name: "Courier & Utility",
    vehicleType: "Hilux, Probox, Pickup",
    priceMonthly: 5000,
    iconKey: "courier",
    weeklyAvailable: true,
  },
];

// ─── Static image imports ────────────────────────────────────────────────

// Replace these paths with the exact filenames you have in assets/icons/
const ICON_BODA = require("assets/icons/bike.png");
const ICON_COMPACT = require("assets/icons/Standard.png");
const ICON_XL = require("assets/icons/XL-clean.png");
const ICON_COURIER = require("assets/icons/pickup.png");
const ICON_LUXURY = require("assets/icons/luxury.png");

const iconMap: Record<string, any> = {
  boda: ICON_BODA,
  compact: ICON_COMPACT,
  xl: ICON_XL,
  courier: ICON_COURIER,
  luxury: ICON_LUXURY,
};

// ─── Plan card ─────────────────────────────────────────────────────────────

interface PlanCardProps {
  plan: SubscriptionPlan;
  selected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, selected, onSelect }) => {
  const imageSource = iconMap[plan.iconKey];

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.8}
      style={[
        cardStyles.card,
        selected ? cardStyles.cardSelected : cardStyles.cardUnselected,
      ]}
    >
      <View
        style={[cardStyles.iconBox, selected && cardStyles.iconBoxSelected]}
      >
        <Image
          source={imageSource}
          style={cardStyles.iconImage}
          resizeMode="contain"
        />
      </View>

      <View style={cardStyles.textBlock}>
        <Text style={[cardStyles.name, selected && cardStyles.nameSelected]}>
          {plan.name}
        </Text>
        <Text
          style={[cardStyles.vehicle, selected && cardStyles.vehicleSelected]}
        >
          {plan.vehicleType}
        </Text>
        {plan.weeklyAvailable && (
          <Text
            style={[
              cardStyles.weeklyTag,
              selected && cardStyles.weeklyTagSelected,
            ]}
          >
            Weekly options available
          </Text>
        )}
      </View>

      <View style={cardStyles.priceBlock}>
        <Text style={[cardStyles.price, selected && cardStyles.priceSelected]}>
          KES {plan.priceMonthly.toLocaleString()}
        </Text>
        <Text
          style={[cardStyles.period, selected && cardStyles.periodSelected]}
        >
          / month
        </Text>
      </View>
    </TouchableOpacity>
  );
};

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
    overflow: "hidden",
  },
  iconBoxSelected: { backgroundColor: Colors.white },
  iconImage: { width: 36, height: 36 },
  textBlock: { flex: 1 },
  name: { ...Typography.labelLarge, fontSize: 16, color: Colors.black },
  nameSelected: { color: Colors.white },
  vehicle: { ...Typography.bodyMedium, color: Colors.gray500, marginTop: 2 },
  vehicleSelected: { color: Colors.gray300 },
  weeklyTag: {
    ...Typography.caption,
    color: Colors.gray400,
    marginTop: 2,
    fontStyle: "italic",
  },
  weeklyTagSelected: { color: Colors.gray400 },
  priceBlock: { alignItems: "flex-end" },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.black,
    letterSpacing: -0.3,
  },
  priceSelected: { color: Colors.white },
  period: { fontSize: 11, color: Colors.gray400, marginTop: 1 },
});

// ─── Shield banner ───────────────────────────────────────────────────────

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

// ─── Screen ──────────────────────────────────────────────────────────────

export const SubscriptionScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>("sedan");

  const selectedPlan = plans.find((p) => p.id === selected);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + Spacing.lg,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Drive</Text>
          <Text style={styles.subtitle}>
            Pick now, pay after approval. No charge until you're verified.
          </Text>
        </View>

        <ShieldBanner />

        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            onSelect={() => setSelected(plan.id)}
          />
        ))}

        <Text style={styles.footerNote}>
          All plans include zero commission. Weekly payment options are
          available for every tier – ask our support team.
        </Text>
      </ScrollView>

      <View
        style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}
      >
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
  },
  header: { marginBottom: Spacing.xxl },
  title: { ...Typography.displayLarge, fontSize: 28, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyMedium, color: Colors.gray500, lineHeight: 20 },
  footerNote: {
    ...Typography.caption,
    color: Colors.gray400,
    textAlign: "center",
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.offWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
});
