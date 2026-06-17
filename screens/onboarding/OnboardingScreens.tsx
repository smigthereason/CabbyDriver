import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors, Typography, Spacing, Radius, Shadow } from "@/theme";
import { Button } from "@/components/ui/Button";
import { OnboardingNav } from "@/components/ui/ScreenLayout";

const { width } = Dimensions.get("window");

// ─── Slide data ────────────────────────────────────────────────────────────

interface SlideData {
  title: string;
  body: string;
  imagePlaceholder: string;
  stats?: Array<{ label: string; value: string }>;
  subBody?: string;
}

const slides: SlideData[] = [
  {
    // Slide A — core value prop
    title: "Your Sweat,\nYour Money",
    body: "Keep 100% of every fare. No commission cuts, ever. Pay a flat monthly subscription and the rest is yours.",
    imagePlaceholder: "[car-angled-front.png]",
    stats: [
      { label: "Commission", value: "KES 0" },
      { label: "You Keep", value: "100%" },
      { label: "Payout", value: "Instant" },
    ],
  },
  {
    // Slide B — flexibility
    title: "Drive When\nYou Want",
    body: "No minimum hours. No penalties for going offline. Your schedule, fully in your control.",
    imagePlaceholder: "[car-top-view.png]",
    subBody:
      "If you drive 8 trips/day this month:\n  Subscription         KES 3,500\n  You take home    KES 44,500",
  },
  {
    // Slide C — social proof
    title: "Join 12,000+\nKenyan Drivers",
    body: "Drivers who switched say they earn more and stress less. No more sharing your fare.",
    imagePlaceholder: "[car-rear-view.png]",
  },
];

// ─── Slide A/B/C shared component ─────────────────────────────────────────

interface OnboardingProps {
  navigation: any;
  slideIndex: number;
}

const OnboardingSlide: React.FC<OnboardingProps> = ({
  navigation,
  slideIndex,
}) => {
  const slide = slides[slideIndex];
  const isLast = slideIndex === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      // After last story slide → Plan preview (new slide 4)
      navigation.navigate("OnboardingPlan");
    } else {
      navigation.navigate(`Onboarding${slideIndex + 2}` as any);
    }
  };

  const handleBack = () => {
    if (slideIndex === 0) navigation.goBack();
    else navigation.navigate(`Onboarding${slideIndex}` as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingNav
        onBack={handleBack}
        onSkip={() => navigation.navigate("OnboardingPlan")}
      />

      {/* Hero circle */}
      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderEmoji}>🚗</Text>
            <Text style={styles.imagePlaceholderLabel}>
              {slide.imagePlaceholder}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats strip — slide A only */}
      {slide.stats && (
        <View style={styles.statsRow}>
          {slide.stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < slide.stats!.length - 1 && (
                <View style={styles.statDivider} />
              )}
            </React.Fragment>
          ))}
        </View>
      )}

      {/* Copy */}
      <View style={styles.copyBlock}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>

        {/* Earnings example — slide B only */}
        {slide.subBody && (
          <View style={styles.earningsBox}>
            <Text style={styles.earningsText}>{slide.subBody}</Text>
          </View>
        )}
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === slideIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        {isLast ? (
          <Button
            label="Get started — it's free to join"
            onPress={handleNext}
          />
        ) : (
          <Button label="Next" onPress={handleNext} />
        )}
      </View>
    </SafeAreaView>
  );
};

// ─── Plan Preview Screen (Slide 4 — shown BEFORE signup wall) ─────────────
//     "Pick now, pay after approval. No charge until you're verified."

interface PlanOption {
  id: string;
  name: string;
  vehicleType: string;
  priceMonthly: number;
  popular?: boolean;
  icon: string;
}

const previewPlans: PlanOption[] = [
  {
    id: "eco-lite",
    name: "Eco-Lite",
    vehicleType: "Bike & Courier",
    priceMonthly: 1500,
    icon: "🏍️",
  },
  {
    id: "standard",
    name: "Standard",
    vehicleType: "Economy Sedan",
    priceMonthly: 3500,
    popular: true,
    icon: "🚗",
  },
  {
    id: "xl",
    name: "Cabby XL",
    vehicleType: "7 Seater",
    priceMonthly: 5500,
    icon: "🚐",
  },
  {
    id: "luxury",
    name: "Luxury",
    vehicleType: "Executive Service",
    priceMonthly: 10000,
    icon: "🚘",
  },
];

export const OnboardingPlanScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<string>("standard");

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingNav
        onBack={() => navigation.navigate("Onboarding3")}
        onSkip={() => navigation.navigate("Login")}
      />

      <View style={planStyles.header}>
        <Text style={planStyles.title}>Choose your plan</Text>
        <Text style={planStyles.subtitle}>
          Pick now, pay after approval. No charge until you're verified.
        </Text>
      </View>

      <View style={planStyles.list}>
        {previewPlans.map((plan) => {
          const isSelected = selected === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              style={[planStyles.card, isSelected && planStyles.cardSelected]}
              onPress={() => setSelected(plan.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  planStyles.iconBox,
                  isSelected && planStyles.iconBoxSelected,
                ]}
              >
                <Text style={planStyles.iconEmoji}>{plan.icon}</Text>
              </View>
              <View style={planStyles.textCol}>
                <View style={planStyles.nameRow}>
                  <Text
                    style={[
                      planStyles.name,
                      isSelected && planStyles.nameSelected,
                    ]}
                  >
                    {plan.name}
                  </Text>
                  {plan.popular && (
                    <View style={planStyles.badge}>
                      <Text style={planStyles.badgeText}>most popular</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    planStyles.vehicle,
                    isSelected && planStyles.vehicleSelected,
                  ]}
                >
                  {plan.vehicleType}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    planStyles.price,
                    isSelected && planStyles.priceSelected,
                  ]}
                >
                  KES {plan.priceMonthly.toLocaleString()}
                </Text>
                <Text
                  style={[
                    planStyles.period,
                    isSelected && planStyles.periodSelected,
                  ]}
                >
                  Per Month
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.cta}>
        <Button
          label="Continue with Standard"
          onPress={() => navigation.navigate("Login")}
        />
        <TouchableOpacity
          style={planStyles.compareLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={planStyles.compareLinkText}>
            Compare plans in detail
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ─── Exported Onboarding screens ───────────────────────────────────────────

export const Onboarding1Screen: React.FC<{ navigation: any }> = ({
  navigation,
}) => <OnboardingSlide navigation={navigation} slideIndex={0} />;
export const Onboarding2Screen: React.FC<{ navigation: any }> = ({
  navigation,
}) => <OnboardingSlide navigation={navigation} slideIndex={1} />;
export const Onboarding3Screen: React.FC<{ navigation: any }> = ({
  navigation,
}) => <OnboardingSlide navigation={navigation} slideIndex={2} />;

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxxl,
  },
  circle: {
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: (width * 0.72) / 2,
    borderWidth: 1.5,
    borderColor: Colors.gray300,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: Colors.white,
  },
  imagePlaceholder: { alignItems: "center" },
  imagePlaceholderEmoji: { fontSize: 80, opacity: 0.25 },
  imagePlaceholderLabel: {
    ...Typography.caption,
    color: Colors.gray300,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
  // Stats strip
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    ...Shadow.subtle,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.black,
    letterSpacing: -0.4,
  },
  statLabel: { ...Typography.caption, color: Colors.gray500, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: Colors.gray200 },
  // Copy
  copyBlock: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.6,
    lineHeight: 36,
    color: Colors.black,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  body: {
    ...Typography.bodyMedium,
    textAlign: "center",
    lineHeight: 22,
    color: Colors.gray500,
  },
  earningsBox: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    alignSelf: "stretch",
    ...Shadow.subtle,
  },
  earningsText: {
    ...Typography.bodySmall,
    color: Colors.gray700,
    lineHeight: 22,
    fontFamily: "Courier",
  },
  // Dots
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray300,
  },
  dotActive: { width: 20, backgroundColor: Colors.black },
  // CTA
  cta: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
});

const planStyles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.displayLarge,
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.gray500,
    lineHeight: 20,
  },
  list: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.subtle,
  },
  cardSelected: { backgroundColor: Colors.black },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxSelected: { backgroundColor: Colors.white },
  iconEmoji: { fontSize: 22 },
  textCol: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  name: { ...Typography.labelLarge, color: Colors.black },
  nameSelected: { color: Colors.white },
  vehicle: { ...Typography.bodySmall, color: Colors.gray500, marginTop: 2 },
  vehicleSelected: { color: Colors.gray400 },
  badge: {
    backgroundColor: Colors.gray200,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 10, fontWeight: "600", color: Colors.gray700 },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
    textAlign: "right",
  },
  priceSelected: { color: Colors.white },
  period: {
    fontSize: 10,
    color: Colors.gray400,
    textAlign: "right",
    marginTop: 1,
  },
  periodSelected: { color: Colors.gray400 },
  compareLink: { alignItems: "center", marginTop: Spacing.lg },
  compareLinkText: {
    ...Typography.bodyMedium,
    color: Colors.gray500,
    textDecorationLine: "underline",
  },
});
