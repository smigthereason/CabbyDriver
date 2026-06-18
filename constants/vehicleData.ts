// constants/vehicleData.ts

export interface VehicleModel {
  label: string;
  value: string;
}

export interface VehicleMake {
  label: string;
  value: string;
  // Optional category for future filtering (not used yet)
  category?: "car" | "motorcycle" | "tuk-tuk" | "pickup" | "minibus";
}

// ─── Makes ────────────────────────────────────────────────────────────────
export const VEHICLE_MAKES: VehicleMake[] = [
  // ---- Cars (saloon, hatchback, SUV) ----
  { label: "Toyota", value: "toyota", category: "car" },
  { label: "Mazda", value: "mazda", category: "car" },
  { label: "Nissan", value: "nissan", category: "car" },
  { label: "Honda", value: "honda", category: "car" },
  { label: "Subaru", value: "subaru", category: "car" },
  { label: "Mitsubishi", value: "mitsubishi", category: "car" },
  { label: "Suzuki", value: "suzuki", category: "car" },
  { label: "Volkswagen", value: "volkswagen", category: "car" },
  { label: "Mercedes-Benz", value: "mercedes", category: "car" },
  { label: "BMW", value: "bmw", category: "car" },
  { label: "Audi", value: "audi", category: "car" },
  { label: "Ford", value: "ford", category: "car" },
  { label: "Chevrolet", value: "chevrolet", category: "car" },
  { label: "Hyundai", value: "hyundai", category: "car" },
  { label: "Kia", value: "kia", category: "car" },
  { label: "Peugeot", value: "peugeot", category: "car" },
  { label: "Citroën", value: "citroen", category: "car" },
  { label: "Renault", value: "renault", category: "car" },
  { label: "Dacia", value: "dacia", category: "car" },
  { label: "Mahindra", value: "mahindra", category: "car" },
  { label: "Tata", value: "tata", category: "car" },
  { label: "Proton", value: "proton", category: "car" },
  { label: "Daihatsu", value: "daihatsu", category: "car" },

  // ---- Motorcycles (boda bodas) ----
  {
    label: "Honda (Motorcycle)",
    value: "honda_motorcycle",
    category: "motorcycle",
  },
  {
    label: "Yamaha (Motorcycle)",
    value: "yamaha_motorcycle",
    category: "motorcycle",
  },
  {
    label: "Suzuki (Motorcycle)",
    value: "suzuki_motorcycle",
    category: "motorcycle",
  },
  {
    label: "Bajaj (Motorcycle)",
    value: "bajaj_motorcycle",
    category: "motorcycle",
  },
  {
    label: "TVS (Motorcycle)",
    value: "tvs_motorcycle",
    category: "motorcycle",
  },
  {
    label: "KTM (Motorcycle)",
    value: "ktm_motorcycle",
    category: "motorcycle",
  },
  {
    label: "Boxer (Motorcycle)",
    value: "boxer_motorcycle",
    category: "motorcycle",
  },
  {
    label: "Hero (Motorcycle)",
    value: "hero_motorcycle",
    category: "motorcycle",
  },

  // ---- Tuk-tuks (three‑wheelers) ----
  { label: "Bajaj (Tuk-tuk)", value: "bajaj_tuktuk", category: "tuk-tuk" },
  { label: "TVS (Tuk-tuk)", value: "tvs_tuktuk", category: "tuk-tuk" },
  { label: "Piaggio (Tuk-tuk)", value: "piaggio_tuktuk", category: "tuk-tuk" },
  {
    label: "Mahindra (Tuk-tuk)",
    value: "mahindra_tuktuk",
    category: "tuk-tuk",
  },

  // ---- Pickups & light trucks ----
  { label: "Isuzu", value: "isuzu", category: "pickup" },
  { label: "Toyota (Pickup)", value: "toyota_pickup", category: "pickup" },
  {
    label: "Mitsubishi (Pickup)",
    value: "mitsubishi_pickup",
    category: "pickup",
  },
  { label: "Ford (Pickup)", value: "ford_pickup", category: "pickup" },
  { label: "Nissan (Pickup)", value: "nissan_pickup", category: "pickup" },
  { label: "Mahindra (Pickup)", value: "mahindra_pickup", category: "pickup" },

  // ---- Minibuses & small buses ----
  { label: "Toyota (Minibus)", value: "toyota_minibus", category: "minibus" },
  { label: "Nissan (Minibus)", value: "nissan_minibus", category: "minibus" },
  {
    label: "Mitsubishi (Minibus)",
    value: "mitsubishi_minibus",
    category: "minibus",
  },

  // ---- Other / custom ----
  { label: "Other (please specify)", value: "other", category: undefined },
];

// ─── Model mapping ──────────────────────────────────────────────────────
// For makes without an entry, the component will fall back to a text input.
export const MODEL_MAP: Record<string, VehicleModel[]> = {
  // ---- Toyota cars ----
  toyota: [
    { label: "Vitz", value: "vitz" },
    { label: "Fielder", value: "fielder" },
    { label: "Allion", value: "allion" },
    { label: "Premio", value: "premio" },
    { label: "Prado", value: "prado" },
    { label: "Land Cruiser", value: "lc" },
    { label: "Hilux (Pickup)", value: "hilux" },
    { label: "Corolla", value: "corolla" },
    { label: "Camry", value: "camry" },
    { label: "Rav4", value: "rav4" },
    { label: "Harrier", value: "harrier" },
    { label: "Sienta", value: "sienta" },
    { label: "Noah", value: "noah" },
    { label: "Voxy", value: "voxy" },
    { label: "Hiace (Minibus)", value: "hiace" },
    { label: "Probox", value: "probox" },
    { label: "Succeed", value: "succeed" },
    { label: "Avanza", value: "avanza" },
    { label: "Rumion", value: "rumion" },
    { label: "Yaris", value: "yaris" },
    { label: "Crown", value: "crown" },
  ],
  // ---- Mazda ----
  mazda: [
    { label: "Demio", value: "demio" },
    { label: "Axela", value: "axela" },
    { label: "Atenza", value: "atenza" },
    { label: "CX-5", value: "cx5" },
    { label: "CX-3", value: "cx3" },
    { label: "BT-50 (Pickup)", value: "bt50" },
    { label: "Familia", value: "familia" },
    { label: "Tribute", value: "tribute" },
  ],
  // ---- Nissan ----
  nissan: [
    { label: "Note", value: "note" },
    { label: "March", value: "march" },
    { label: "Sunny", value: "sunny" },
    { label: "Bluebird", value: "bluebird" },
    { label: "X-Trail", value: "xtrail" },
    { label: "Qashqai", value: "qashqai" },
    { label: "Navara (Pickup)", value: "navara" },
    { label: "Urvan (Minibus)", value: "urvan" },
    { label: "Hardbody (Pickup)", value: "hardbody" },
    { label: "Juke", value: "juke" },
    { label: "Leaf", value: "leaf" },
  ],
  // ---- Honda ----
  honda: [
    { label: "Fit", value: "fit" },
    { label: "Civic", value: "civic" },
    { label: "Accord", value: "accord" },
    { label: "CR-V", value: "crv" },
    { label: "HR-V", value: "hrv" },
    { label: "Odyssey", value: "odyssey" },
    { label: "Stepwgn", value: "stepwgn" },
    { label: "Stream", value: "stream" },
  ],
  // ---- Subaru ----
  subaru: [
    { label: "Impreza", value: "impreza" },
    { label: "Legacy", value: "legacy" },
    { label: "Forester", value: "forester" },
    { label: "Outback", value: "outback" },
    { label: "XV", value: "xv" },
    { label: "Levon", value: "levon" },
  ],
  // ---- Mitsubishi ----
  mitsubishi: [
    { label: "Lancer", value: "lancer" },
    { label: "Galant", value: "galant" },
    { label: "Outlander", value: "outlander" },
    { label: "Pajero", value: "pajero" },
    { label: "Pajero Sport", value: "pajero_sport" },
    { label: "Colt", value: "colt" },
    { label: "L200 (Pickup)", value: "l200" },
    { label: "Fuso (Truck)", value: "fuso" },
    { label: "Delica (Minibus)", value: "delica" },
  ],
  // ---- Suzuki ----
  suzuki: [
    { label: "Alto", value: "alto" },
    { label: "Swift", value: "swift" },
    { label: "Baleno", value: "baleno" },
    { label: "SX4", value: "sx4" },
    { label: "Vitara", value: "vitara" },
    { label: "Jimny", value: "jimny" },
    { label: "Ertiga", value: "ertiga" },
    { label: "Spresso", value: "spresso" },
    { label: "Celerio", value: "celerio" },
  ],
  // ---- Volkswagen ----
  volkswagen: [
    { label: "Polo", value: "polo" },
    { label: "Golf", value: "golf" },
    { label: "Passat", value: "passat" },
    { label: "Jetta", value: "jetta" },
    { label: "Tiguan", value: "tiguan" },
    { label: "Touareg", value: "touareg" },
    { label: "Amarok (Pickup)", value: "amarok" },
  ],
  // ---- Mercedes-Benz ----
  mercedes: [
    { label: "C-Class", value: "c_class" },
    { label: "E-Class", value: "e_class" },
    { label: "S-Class", value: "s_class" },
    { label: "GLA", value: "gla" },
    { label: "GLC", value: "glc" },
    { label: "GLB", value: "glb" },
    { label: "Sprinter (Minibus)", value: "sprinter" },
  ],
  // ---- BMW ----
  bmw: [
    { label: "1 Series", value: "1_series" },
    { label: "3 Series", value: "3_series" },
    { label: "5 Series", value: "5_series" },
    { label: "X1", value: "x1" },
    { label: "X3", value: "x3" },
    { label: "X5", value: "x5" },
  ],
  // ---- Audi ----
  audi: [
    { label: "A3", value: "a3" },
    { label: "A4", value: "a4" },
    { label: "A6", value: "a6" },
    { label: "Q3", value: "q3" },
    { label: "Q5", value: "q5" },
    { label: "Q7", value: "q7" },
  ],
  // ---- Ford ----
  ford: [
    { label: "Focus", value: "focus" },
    { label: "Fiesta", value: "fiesta" },
    { label: "Mustang", value: "mustang" },
    { label: "Ranger (Pickup)", value: "ranger" },
    { label: "Everest", value: "everest" },
    { label: "Transit (Minibus)", value: "transit" },
  ],
  // ---- Chevrolet ----
  chevrolet: [
    { label: "Cruze", value: "cruze" },
    { label: "Malibu", value: "malibu" },
    { label: "Equinox", value: "equinox" },
    { label: "Trailblazer", value: "trailblazer" },
    { label: "Spark", value: "spark" },
  ],
  // ---- Hyundai ----
  hyundai: [
    { label: "i10", value: "i10" },
    { label: "i20", value: "i20" },
    { label: "i30", value: "i30" },
    { label: "Elantra", value: "elantra" },
    { label: "Tucson", value: "tucson" },
    { label: "Santa Fe", value: "santa_fe" },
    { label: "Palisade", value: "palisade" },
  ],
  // ---- Kia ----
  kia: [
    { label: "Picanto", value: "picanto" },
    { label: "Rio", value: "rio" },
    { label: "Cerato", value: "cerato" },
    { label: "Sportage", value: "sportage" },
    { label: "Sorento", value: "sorento" },
    { label: "Telluride", value: "telluride" },
  ],
  // ---- Peugeot ----
  peugeot: [
    { label: "206", value: "206" },
    { label: "207", value: "207" },
    { label: "208", value: "208" },
    { label: "3008", value: "3008" },
    { label: "5008", value: "5008" },
    { label: "Partner", value: "partner" },
    { label: "Boxer (Minibus)", value: "boxer" },
  ],
  // ---- Citroën ----
  citroen: [
    { label: "C3", value: "c3" },
    { label: "C4", value: "c4" },
    { label: "C5", value: "c5" },
    { label: "Berlingo", value: "berlingo" },
    { label: "Jumpy (Minibus)", value: "jumpy" },
  ],
  // ---- Renault ----
  renault: [
    { label: "Clio", value: "clio" },
    { label: "Megane", value: "megane" },
    { label: "Kadjar", value: "kadjar" },
    { label: "Koleos", value: "koleos" },
    { label: "Trafic (Minibus)", value: "trafic" },
    { label: "Master (Minibus)", value: "master" },
  ],
  // ---- Dacia ----
  dacia: [
    { label: "Logan", value: "logan" },
    { label: "Sandero", value: "sandero" },
    { label: "Duster", value: "duster" },
  ],
  // ---- Mahindra ----
  mahindra: [
    { label: "Bolero (Pickup)", value: "bolero" },
    { label: "Scorpio", value: "scorpio" },
    { label: "XUV500", value: "xuv500" },
    { label: "Thar", value: "thar" },
  ],
  // ---- Tata ----
  tata: [
    { label: "Indica", value: "indica" },
    { label: "Indigo", value: "indigo" },
    { label: "Safari", value: "safari" },
    { label: "Sumo", value: "sumo" },
    { label: "Xenon (Pickup)", value: "xenon" },
  ],
  // ---- Proton ----
  proton: [
    { label: "Persona", value: "persona" },
    { label: "Saga", value: "saga" },
    { label: "Wira", value: "wira" },
    { label: "Exora", value: "exora" },
  ],
  // ---- Daihatsu ----
  daihatsu: [
    { label: "Charade", value: "charade" },
    { label: "Mira", value: "mira" },
    { label: "Terios", value: "terios" },
    { label: "Sirion", value: "sirion" },
  ],

  // ---- Motorcycles ----
  honda_motorcycle: [
    { label: "Activa", value: "activa" },
    { label: "CB 125", value: "cb125" },
    { label: "CB 150", value: "cb150" },
    { label: "CBR 250", value: "cbr250" },
    { label: "CRF 250", value: "crf250" },
    { label: "Big Bikes", value: "big_bikes" },
  ],
  yamaha_motorcycle: [
    { label: "YZF-R125", value: "yzfr125" },
    { label: "YZF-R15", value: "yzfr15" },
    { label: "FZ-S", value: "fzs" },
    { label: "MT-15", value: "mt15" },
    { label: "NMAX", value: "nmax" },
    { label: "XMAX", value: "xmax" },
  ],
  suzuki_motorcycle: [
    { label: "GSX-R150", value: "gsxr150" },
    { label: "GSX-S150", value: "gsxs150" },
    { label: "Access 125", value: "access125" },
    { label: "Burgman", value: "burgman" },
  ],
  bajaj_motorcycle: [
    { label: "Boxer", value: "boxer" },
    { label: "Pulsar", value: "pulsar" },
    { label: "Discover", value: "discover" },
    { label: "CT100", value: "ct100" },
  ],
  tvs_motorcycle: [
    { label: "Apache", value: "apache" },
    { label: "RTR 160", value: "rtr160" },
    { label: "RTR 200", value: "rtr200" },
    { label: "Jupiter", value: "jupiter" },
  ],
  ktm_motorcycle: [
    { label: "Duke 200", value: "duke200" },
    { label: "Duke 390", value: "duke390" },
    { label: "RC 200", value: "rc200" },
    { label: "RC 390", value: "rc390" },
  ],
  boxer_motorcycle: [{ label: "Boxer BM150", value: "bm150" }],
  hero_motorcycle: [
    { label: "Splendor", value: "splendor" },
    { label: "Passion", value: "passion" },
    { label: "Karizma", value: "karizma" },
  ],

  // ---- Tuk-tuks ----
  bajaj_tuktuk: [
    { label: "RE 4S", value: "re4s" },
    { label: "RE 4S (CNG)", value: "re4s_cng" },
    { label: "RE 4S (EV)", value: "re4s_ev" },
    { label: "Qute (4‑wheeler)", value: "qute" },
  ],
  tvs_tuktuk: [
    { label: "King", value: "king" },
    { label: "King Deluxe", value: "king_deluxe" },
    { label: "King EV", value: "king_ev" },
  ],
  piaggio_tuktuk: [
    { label: "Ape", value: "ape" },
    { label: "Ape EV", value: "ape_ev" },
    { label: "Ape City", value: "ape_city" },
  ],
  mahindra_tuktuk: [
    { label: "Alfa", value: "alfa" },
    { label: "Alfa EV", value: "alfa_ev" },
  ],

  // ---- Pickups ----
  isuzu: [
    { label: "D-Max (Pickup)", value: "dmax" },
    { label: "NPR (Truck)", value: "npr" },
    { label: "ELF (Truck)", value: "elf" },
  ],
  toyota_pickup: [
    { label: "Hilux", value: "hilux_pickup" },
    { label: "Tacoma", value: "tacoma" },
  ],
  mitsubishi_pickup: [
    { label: "L200", value: "l200_pickup" },
    { label: "Triton", value: "triton" },
  ],
  ford_pickup: [
    { label: "Ranger", value: "ranger_pickup" },
    { label: "F-150", value: "f150" },
  ],
  nissan_pickup: [
    { label: "Navara", value: "navara_pickup" },
    { label: "Hardbody", value: "hardbody_pickup" },
  ],
  mahindra_pickup: [
    { label: "Bolero", value: "bolero_pickup" },
    { label: "Scorpio (Pickup)", value: "scorpio_pickup" },
  ],

  // ---- Minibuses ----
  toyota_minibus: [
    { label: "Hiace", value: "hiace_minibus" },
    { label: "Coaster", value: "coaster" },
    { label: "Sienna", value: "sienna" },
  ],
  nissan_minibus: [
    { label: "Urvan", value: "urvan_minibus" },
    { label: "NV350", value: "nv350" },
  ],
  mitsubishi_minibus: [
    { label: "Delica", value: "delica_minibus" },
    { label: "L300", value: "l300" },
  ],

  // ---- "Other" gets no models – we'll show a text input ----
};
