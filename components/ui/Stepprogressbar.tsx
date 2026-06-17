import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, Radius } from "../../theme";

interface Props {
  currentStep: number; // 1-indexed
  totalSteps: number;
  labels?: string[];
}

/**
 * StepProgressBar
 * Renders a linear progress indicator with step labels.
 * Used at the top of every sign-up screen (Phase 2–4).
 *
 * Example:
 *   <StepProgressBar currentStep={1} totalSteps={3} labels={['Personal', 'Driving', 'Vehicle']} />
 */
export const StepProgressBar: React.FC<Props> = ({
  currentStep,
  totalSteps,
  labels,
}) => {
  return (
    <View style={styles.container}>
      {/* Track */}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` },
          ]}
        />
        {/* Step dots */}
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          const done = stepNum < currentStep;
          const active = stepNum === currentStep;
          return (
            <View
              key={stepNum}
              style={[
                styles.dot,
                done && styles.dotDone,
                active && styles.dotActive,
                // position each dot evenly
                {
                  left: `${(i / (totalSteps - 1)) * 100}%`,
                  marginLeft: active ? -12 : -8,
                },
              ]}
            >
              {done && <Text style={styles.check}>✓</Text>}
              {active && <Text style={styles.activeNum}>{stepNum}</Text>}
            </View>
          );
        })}
      </View>

      {/* Labels */}
      {labels && (
        <View style={styles.labelsRow}>
          {labels.map((label, i) => (
            <Text
              key={label}
              style={[
                styles.label,
                i + 1 === currentStep && styles.labelActive,
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    marginBottom: Spacing.sm,
  },
  track: {
    height: 2,
    backgroundColor: Colors.gray200,
    borderRadius: 1,
    position: "relative",
    marginBottom: Spacing.lg,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 2,
    backgroundColor: Colors.black,
    borderRadius: 1,
  },
  dot: {
    position: "absolute",
    top: -7,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.gray300,
    alignItems: "center",
    justifyContent: "center",
  },
  dotDone: {
    backgroundColor: Colors.black,
  },
  dotActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -11,
    backgroundColor: Colors.black,
  },
  check: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  activeNum: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    ...Typography.caption,
    color: Colors.gray400,
    textAlign: "center",
    flex: 1,
  },
  labelActive: {
    color: Colors.black,
    fontWeight: "700",
  },
});
