import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import type { RootStackParamList } from "@/types";

import { LoginScreen, OTPVerificationScreen } from "@/screens/auth/LoginScreen";
import {
  SignUpAccountScreen,
  SignUpVerificationScreen,
  SignUpLocationScreen,
  SignUpCredentialsScreen,
  SignUpEmergencyScreen,
} from "@/screens/auth/SignUpScreens";
import {
  Onboarding1Screen,
  Onboarding2Screen,
  Onboarding3Screen,
  OnboardingPlanScreen,
} from "@/screens/onboarding/OnboardingScreens";
import {
  CarDetailsScreen,
  CarPhotosScreen,
  CarDocsScreen,
} from "@/screens/main/CarVerificationScreen";
import { SubscriptionScreen } from "@/screens/main/SubscriptionScreen";
import { SuccessScreen } from "@/screens/main/SuccessScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
        <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
        <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
        <Stack.Screen name="OnboardingPlan" component={OnboardingPlanScreen} />
        <Stack.Screen name="SignUpAccount" component={SignUpAccountScreen} />
        <Stack.Screen
          name="SignUpVerification"
          component={SignUpVerificationScreen}
        />
        <Stack.Screen
          name="SignUpCredentials"
          component={SignUpCredentialsScreen}
        />
        <Stack.Screen name="SignUpLocation" component={SignUpLocationScreen} />
        <Stack.Screen
          name="SignUpEmergency"
          component={SignUpEmergencyScreen}
        />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
        <Stack.Screen name="CarPhotos" component={CarPhotosScreen} />
        <Stack.Screen name="CarDocs" component={CarDocsScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
