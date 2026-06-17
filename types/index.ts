// ─── Cabby Driver — Shared Types ──────────────────────────────────────────

export type SubscriptionTier = "eco-lite" | "standard" | "xl" | "luxury";

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  vehicleType: string;
  priceMonthly: number;
  icon: "bike" | "sedan" | "suv" | "luxury";
  popular?: boolean;
}

export interface DriverProfile {
  fullName: string;
  email: string;
  phone: string;
}

export interface DrivingCredentials {
  dlNumber: string;
  dlExpiry: string;
  frontLicenceUri?: string;
  backLicenceUri?: string;
}

export interface IdentityVerification {
  idNumber: string;
  kraPin: string;
  frontIdUri?: string;
  backIdUri?: string;
}

export interface LocationResidency {
  cityCounty: string;
  residentialArea: string;
  houseStreet?: string;
}

export interface EmergencyContact {
  /** Kept: name + phone only (email removed to reduce sign-up friction) */
  fullName: string;
  phone: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: string;
  registrationPlate: string;
  vehicleImageUris: string[];
  logbookUri?: string;
  ntsaInspectionUri?: string;
  psvInsuranceUri?: string;
}

export interface OnboardingState {
  profile: Partial<DriverProfile>;
  credentials: Partial<DrivingCredentials>;
  identity: Partial<IdentityVerification>;
  location: Partial<LocationResidency>;
  emergencyContact: Partial<EmergencyContact>;
  vehicle: Partial<VehicleDetails>;
  selectedPlan: SubscriptionTier | null;
}

// ─── Navigation param types ────────────────────────────────────────────────

export type RootStackParamList = {
  // Phase 1 — Story + Plan preview (before auth wall)
  Login: undefined;
  OTPVerification: { phone: string };
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  OnboardingPlan: undefined; // NEW — plan preview before signup

  // Phase 2 — Personal details (step 1 of 3)
  SignUpAccount: undefined;
  SignUpVerification: undefined;

  // Phase 3 — Driving credentials (step 2 of 3)
  SignUpCredentials: undefined;
  SignUpEmergency: undefined; // Moved here; email removed

  // Phase 4 — Vehicle setup (step 3 of 3, split into 3 sub-screens)
  CarDetails: undefined; // NEW sub-screen 1
  CarPhotos: undefined; // NEW sub-screen 2
  CarDocs: undefined; // NEW sub-screen 3

  // Subscription + completion
  Subscription: undefined;
  Success: undefined;
};
