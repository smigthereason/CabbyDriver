import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Colors, Typography, Spacing, Radius } from "@/theme";
import { Button } from "@/components/ui/Button";

interface Props {
  navigation: any;
}

export const SuccessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.title}>You're all set</Text>
        <Text style={styles.subtitle}>
          Your application is under review. We'll notify you as soon as you're
          verified and ready to start driving.
        </Text>
      </View>
      <View style={styles.cta}>
        <Button label="Done" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    backgroundColor: Colors.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  iconText: { fontSize: 32, color: Colors.white, fontWeight: "700" },
  title: {
    ...Typography.displayMedium,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.gray500,
    textAlign: "center",
    lineHeight: 22,
  },
  cta: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxl },
});
