export type Role = 'member' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar: string;
  membershipPlan: 'Basic' | 'Pro' | 'Elite' | 'VIP';
  membershipStatus: 'Active' | 'Expiring Soon' | 'Expired' | 'Trial';
  membershipExpires: string;
  joinedDate: string;
  homeBranch: string;
  qrPassCode: string;
  stats: {
    weeklyWorkouts: number;
    weeklyClasses: number;
    weeklyCalories: number;
    streakDays: number;
    totalCheckins: number;
  };
}

export interface PlanFeature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  elite: boolean | string;
  pt: boolean | string;
  category: 'Access' | 'Amenities' | 'Coaching' | 'Perks';
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  badge?: string;
  isPopular?: boolean;
  color: string;
  description: string;
  features: string[];
  limitations?: string[];
  targetAudience: string;
}

export interface GymClass {
  id: string;
  title: string;
  category: 'HIIT' | 'CrossFit' | 'Yoga' | 'Strength' | 'Boxing' | 'Mobility' | 'Functional';
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  trainerRole: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  durationMinutes: number;
  totalSeats: number;
  bookedSeats: number;
  intensity: 'Medium' | 'High' | 'Extreme' | 'All Levels';
  calorieBurn: string;
  location: string;
  description: string;
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  coverImage: string;
  bio: string;
  philosophy: string;
  certifications: string[];
  specialties: string[];
  instagram: string;
  availableSlots: { day: string; times: string[] }[];
  classesTaught: string[];
}

export interface TransformationCase {
  id: string;
  name: string;
  age: number;
  occupation: string;
  durationWeeks: number;
  weightChangeKg: number;
  bodyFatChangePercent: number;
  beforeImage: string;
  afterImage: string;
  category: 'Fat Loss' | 'Muscle Gain' | 'Athletic Recomp' | 'Strength';
  trainerName: string;
  quote: string;
  story: string;
  protocol: {
    training: string;
    nutrition: string;
    frequency: string;
  };
}

export interface GymLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  image: string;
  mapEmbedUrl: string;
  facilities: string[];
  managerName: string;
  headTrainer: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Gear' | 'Supplements' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  sizes?: string[];
  colors?: string[];
  description: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type LeadStage = 'NEW' | 'CONTACTED' | 'TRIAL BOOKED' | 'CONVERTED';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredLocation: string;
  preferredDate: string;
  fitnessGoal: string;
  stage: LeadStage;
  source: 'Website Trial' | 'WhatsApp Direct' | 'Referral' | 'Instagram';
  createdAt: string;
  notes?: string;
}

export interface PRRecord {
  id: string;
  exercise: string;
  weight: number;
  unit: 'kg' | 'lbs';
  reps: number;
  date: string;
  previousRecord?: number;
}

export interface WeightLog {
  date: string;
  weight: number;
  bodyFat?: number;
}

export interface ClassBooking {
  id: string;
  classId: string;
  className: string;
  category: string;
  trainerName: string;
  date: string;
  time: string;
  location: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  bookedAt: string;
  qrCheckinCode: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'membership' | 'achievement' | 'broadcast';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structuredPlan?: {
    goal: string;
    weeklySplit: { day: string; focus: string; exercises: string[] }[];
    nutritionTips: string[];
    recommendedClasses: string[];
  };
}
