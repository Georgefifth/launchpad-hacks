import { QuotePreset } from '../types';

export const REDDIT_PRESETS: QuotePreset[] = [
  {
    id: 'dealer_60k_service',
    title: 'The Dealership 60,000-Mile "Wallet Flush"',
    subtitle: 'Reddit r/MechanicAdvice: "Dealer gave me a $1,180 quote for scheduled 60k service on my 2018 Civic. Am I getting scammed?"',
    sourceLabel: 'Reddit r/MechanicAdvice — 1.4k Upvotes',
    sourceUrl: 'https://reddit.com/r/MechanicAdvice',
    vehicle: {
      year: 2018,
      make: 'Honda',
      model: 'Civic EX',
      mileage: 62000,
      type: 'sedan',
    },
    laborRate: 165,
    shopSuppliesFee: 65,
    items: [
      {
        serviceId: 'oil_change_synthetic',
        quotedPartsPrice: 55,
        quotedLaborPrice: 45,
      },
      {
        serviceId: 'cabin_air_filter',
        quotedPartsPrice: 48,
        quotedLaborPrice: 45,
      },
      {
        serviceId: 'engine_air_filter',
        quotedPartsPrice: 52,
        quotedLaborPrice: 40,
      },
      {
        serviceId: 'fuel_induction_service',
        quotedPartsPrice: 45,
        quotedLaborPrice: 165,
      },
      {
        serviceId: 'transmission_flush',
        quotedPartsPrice: 120,
        quotedLaborPrice: 220,
      },
      {
        serviceId: 'brake_fluid_flush',
        quotedPartsPrice: 40,
        quotedLaborPrice: 140,
      },
      {
        serviceId: 'wheel_alignment',
        quotedPartsPrice: 0,
        quotedLaborPrice: 140,
      },
    ],
    redditQuoteStory:
      'Customer brought their 2018 Civic in for an oil change. The dealership service advisor presented a multi-line "Recommended 60,000 Mile Package" totaling $1,180 including non-OEM fuel induction flush, high-pressure transmission flush (prohibited by Honda), $93 cabin filter swap, and an unneeded wheel alignment.',
  },
  {
    id: 'front_brake_sticker_shock',
    title: 'Front Brake & Rotor Replacement Sticker Shock',
    subtitle: 'Reddit r/MechanicAdvice: "Chain shop quoted $890 for just front brakes on my 2016 Toyota RAV4! Is this insane?"',
    sourceLabel: 'Reddit r/MechanicAdvice — 890 Upvotes',
    sourceUrl: 'https://reddit.com/r/MechanicAdvice',
    vehicle: {
      year: 2016,
      make: 'Toyota',
      model: 'RAV4 LE',
      mileage: 78000,
      type: 'suv',
    },
    laborRate: 150,
    shopSuppliesFee: 48,
    items: [
      {
        serviceId: 'front_brake_pads_rotors',
        quotedPartsPrice: 380,
        quotedLaborPrice: 320,
      },
      {
        serviceId: 'brake_fluid_flush',
        quotedPartsPrice: 45,
        quotedLaborPrice: 145,
      },
    ],
    redditQuoteStory:
      'A national tire & brake chain quoted $380 for front pads and rotors (marked up 3x over wholesale aftermarket) and $320 labor for a job with a 1.6-hour book time, plus an automatic brake flush recommendation, pushing the total to nearly $900.',
  },
  {
    id: 'alternator_breakdown',
    title: 'Alternator Failure & 300% Parts Markup',
    subtitle: 'Reddit r/MechanicAdvice: "Car died on the highway. Tow shop says $860 for an alternator replacement on a 2014 Ford Focus."',
    sourceLabel: 'Reddit r/MechanicAdvice — 620 Upvotes',
    sourceUrl: 'https://reddit.com/r/MechanicAdvice',
    vehicle: {
      year: 2014,
      make: 'Ford',
      model: 'Focus SE',
      mileage: 104000,
      type: 'compact',
    },
    laborRate: 145,
    shopSuppliesFee: 35,
    items: [
      {
        serviceId: 'alternator_replacement',
        quotedPartsPrice: 460,
        quotedLaborPrice: 240,
      },
      {
        serviceId: 'serpentine_belt',
        quotedPartsPrice: 55,
        quotedLaborPrice: 70,
      },
    ],
    redditQuoteStory:
      'The repair shop quoted $460 for an aftermarket alternator that sells for $160 wholesale, and charged separate standalone labor for replacing the serpentine belt even though the belt must be completely removed to replace the alternator.',
  },
  {
    id: 'fair_honest_mechanic',
    title: 'Fair & Honest Independent Mechanic Baseline',
    subtitle: 'Reddit r/MechanicAdvice: "First time at a local mom-and-pop shop for 100k maintenance on 2015 Subaru Outback."',
    sourceLabel: 'Reddit r/MechanicAdvice — "Honest Shop Recognition"',
    sourceUrl: 'https://reddit.com/r/MechanicAdvice',
    vehicle: {
      year: 2015,
      make: 'Subaru',
      model: 'Outback 2.5i',
      mileage: 102000,
      type: 'suv',
    },
    laborRate: 120,
    shopSuppliesFee: 18,
    items: [
      {
        serviceId: 'spark_plugs_4cyl',
        quotedPartsPrice: 58,
        quotedLaborPrice: 120,
      },
      {
        serviceId: 'oil_change_synthetic',
        quotedPartsPrice: 38,
        quotedLaborPrice: 35,
      },
      {
        serviceId: 'serpentine_belt',
        quotedPartsPrice: 35,
        quotedLaborPrice: 60,
      },
    ],
    redditQuoteStory:
      'A reputable independent specialist who quoted standard book time labor rates ($120/hr) with fair 25% parts markup and zero phantom flush upsells. AutoFair rates this quote as Fair & Trustworthy.',
  },
];
