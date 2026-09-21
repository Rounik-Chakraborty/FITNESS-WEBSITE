import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  Role,
  ClassBooking,
  CartItem,
  Product,
  Lead,
  LeadStage,
  PRRecord,
  WeightLog,
  NotificationItem,
  AIMessage,
  GymClass,
  Trainer,
  TransformationCase,
} from './types';
import {
  INITIAL_USER,
  INITIAL_ADMIN_USER,
  INITIAL_BOOKINGS,
  INITIAL_LEADS,
  INITIAL_PR_RECORDS,
  WEIGHT_HISTORY,
  INITIAL_NOTIFICATIONS,
  GYM_CLASSES,
} from './mock-data';

interface AppState {
  // Auth State
  currentUser: User;
  isAuthenticated: boolean;
  switchRole: (role: Role) => void;
  updateUser: (data: Partial<User>) => void;

  // Bookings State
  classes: GymClass[];
  bookings: ClassBooking[];
  bookClass: (gymClass: GymClass) => { success: boolean; message: string };
  cancelBooking: (bookingId: string) => void;
  addClass: (gymClass: GymClass) => void;
  deleteClass: (classId: string) => void;

  // Cart & Store
  cart: CartItem[];
  promoCode: string | null;
  discountPercent: number;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  clearCart: () => void;

  // CRM Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'stage'>) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  updateLeadNotes: (id: string, notes: string) => void;

  // Progress & PRs
  prRecords: PRRecord[];
  weightHistory: WeightLog[];
  addPRRecord: (record: Omit<PRRecord, 'id' | 'date'>) => void;
  addWeightLog: (weight: number, bodyFat?: number) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  clearAllNotifications: () => void;

  // AI Fitness Coach
  aiMessages: AIMessage[];
  isAITyping: boolean;
  isAIWidgetOpen: boolean;
  setAIWidgetOpen: (open: boolean) => void;
  sendAIMessage: (userText: string) => void;
  resetAIChat: () => void;

  // Modals & UI States
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  isTrialModalOpen: boolean;
  trialModalLocation?: string;
  openTrialModal: (location?: string) => void;
  closeTrialModal: () => void;

  selectedClassModal: GymClass | null;
  openClassModal: (gymClass: GymClass) => void;
  closeClassModal: () => void;

  selectedTrainerModal: Trainer | null;
  openTrainerModal: (trainer: Trainer) => void;
  closeTrainerModal: () => void;

  selectedProductModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  selectedCaseModal: TransformationCase | null;
  openCaseModal: (trans: TransformationCase) => void;
  closeCaseModal: () => void;

  isQRPassModalOpen: boolean;
  setQRPassModalOpen: (open: boolean) => void;

  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const INITIAL_AI_MESSAGES: AIMessage[] = [
  {
    id: 'ai-init-1',
    sender: 'assistant',
    text: "Welcome to EliteFit AI. I am your elite performance architect and sports nutritionist. What is your primary fitness goal? (e.g., 'I want to drop 10kg', 'Build a 4-day strength split', or 'Optimize squat depth')",
    timestamp: 'Just now',
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      currentUser: INITIAL_USER,
      isAuthenticated: true,
      switchRole: (role: Role) => {
        if (role === 'admin') {
          set({ currentUser: INITIAL_ADMIN_USER, isAuthenticated: true });
        } else if (role === 'member') {
          set({ currentUser: INITIAL_USER, isAuthenticated: true });
        } else {
          set({
            currentUser: {
              ...INITIAL_USER,
              id: 'guest-01',
              name: 'Guest Athlete',
              role: 'guest',
              membershipPlan: 'Basic',
              membershipStatus: 'Trial',
            },
            isAuthenticated: false,
          });
        }
      },
      updateUser: (data) =>
        set((state) => ({
          currentUser: { ...state.currentUser, ...data },
        })),

      // Bookings & Classes
      classes: GYM_CLASSES,
      bookings: INITIAL_BOOKINGS,
      bookClass: (gymClass: GymClass) => {
        const state = get();
        const existing = state.bookings.find(
          (b) => b.classId === gymClass.id && b.status === 'Upcoming'
        );

        if (existing) {
          return { success: false, message: 'You have already booked this session.' };
        }

        const classInState = state.classes.find((c) => c.id === gymClass.id);
        if (classInState && classInState.bookedSeats >= classInState.totalSeats) {
          return { success: false, message: 'This class has reached full capacity.' };
        }

        const newBooking: ClassBooking = {
          id: `bk-${Date.now()}`,
          classId: gymClass.id,
          className: gymClass.title,
          category: gymClass.category,
          trainerName: gymClass.trainerName,
          date: gymClass.day,
          time: gymClass.time,
          location: gymClass.location,
          status: 'Upcoming',
          bookedAt: new Date().toISOString(),
          qrCheckinCode: `EF-CHK-${Math.floor(1000 + Math.random() * 9000)}`,
        };

        const updatedClasses = state.classes.map((c) =>
          c.id === gymClass.id ? { ...c, bookedSeats: c.bookedSeats + 1 } : c
        );

        set((s) => ({
          bookings: [newBooking, ...s.bookings],
          classes: updatedClasses,
          currentUser: {
            ...s.currentUser,
            stats: {
              ...s.currentUser.stats,
              weeklyClasses: s.currentUser.stats.weeklyClasses + 1,
            },
          },
        }));

        get().addNotification({
          title: 'Class Confirmed!',
          message: `Your booking for ${gymClass.title} on ${gymClass.day} at ${gymClass.time} is active.`,
          type: 'booking',
          actionUrl: '/dashboard/bookings',
        });

        return { success: true, message: `Successfully booked ${gymClass.title}!` };
      },

      cancelBooking: (bookingId: string) => {
        const state = get();
        const booking = state.bookings.find((b) => b.id === bookingId);
        if (!booking) return;

        const updatedClasses = state.classes.map((c) =>
          c.id === booking.classId ? { ...c, bookedSeats: Math.max(0, c.bookedSeats - 1) } : c
        );

        set((s) => ({
          bookings: s.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
          ),
          classes: updatedClasses,
        }));

        get().addNotification({
          title: 'Booking Cancelled',
          message: `Your reservation for ${booking.className} has been cancelled.`,
          type: 'booking',
        });
      },

      addClass: (gymClass: GymClass) =>
        set((state) => ({ classes: [gymClass, ...state.classes] })),

      deleteClass: (classId: string) =>
        set((state) => ({ classes: state.classes.filter((c) => c.id !== classId) })),

      // Cart
      cart: [],
      promoCode: null,
      discountPercent: 0,
      addToCart: (product, quantity = 1, selectedSize, selectedColor) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
          );

          if (existingIndex > -1) {
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated, isCartOpen: true };
          }

          return {
            cart: [...state.cart, { product, quantity, selectedSize, selectedColor }],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (productId: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateCartQuantity: (productId: string, quantity: number) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((i) => i.product.id !== productId)
              : state.cart.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                ),
        })),

      applyPromoCode: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'ELITE10' || clean === 'TRAINHARD') {
          set({ promoCode: clean, discountPercent: 10 });
          return { success: true, message: '10% Elite discount applied!' };
        }
        if (clean === 'ELITE20' || clean === 'SUMMER20') {
          set({ promoCode: clean, discountPercent: 20 });
          return { success: true, message: '20% VIP athlete discount applied!' };
        }
        return { success: false, message: 'Invalid promo code. Try ELITE10' };
      },

      clearCart: () => set({ cart: [], promoCode: null, discountPercent: 0 }),

      // Leads CRM
      leads: INITIAL_LEADS,
      addLead: (leadData) => {
        const newLead: Lead = {
          ...leadData,
          id: `lead-${Date.now()}`,
          stage: 'NEW',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ leads: [newLead, ...state.leads] }));
      },

      updateLeadStage: (id: string, stage: LeadStage) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, stage } : l)),
        })),

      updateLeadNotes: (id: string, notes: string) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, notes } : l)),
        })),

      // Progress & PRs
      prRecords: INITIAL_PR_RECORDS,
      weightHistory: WEIGHT_HISTORY,
      addPRRecord: (record) => {
        const newPR: PRRecord = {
          ...record,
          id: `pr-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ prRecords: [newPR, ...state.prRecords] }));
        get().addNotification({
          title: 'New Personal Record!',
          message: `Logged ${record.weight}${record.unit} on ${record.exercise}!`,
          type: 'achievement',
          actionUrl: '/dashboard/progress',
        });
      },

      addWeightLog: (weight: number, bodyFat?: number) => {
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        set((state) => ({
          weightHistory: [...state.weightHistory, { date: today, weight, bodyFat }],
        }));
      },

      // Notifications
      notifications: INITIAL_NOTIFICATIONS,
      markNotificationAsRead: (id: string) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      addNotification: (notif) => {
        const newNotif: NotificationItem = {
          ...notif,
          id: `notif-${Date.now()}`,
          timestamp: 'Just now',
          read: false,
        };
        set((state) => ({ notifications: [newNotif, ...state.notifications] }));
      },

      clearAllNotifications: () => set({ notifications: [] }),

      // AI Fitness Coach
      aiMessages: INITIAL_AI_MESSAGES,
      isAITyping: false,
      isAIWidgetOpen: false,
      setAIWidgetOpen: (open: boolean) => set({ isAIWidgetOpen: open }),

      sendAIMessage: (userText: string) => {
        const userMsg: AIMessage = {
          id: `ai-user-${Date.now()}`,
          sender: 'user',
          text: userText,
          timestamp: 'Just now',
        };

        set((s) => ({
          aiMessages: [...s.aiMessages, userMsg],
          isAITyping: true,
        }));

        // Realistic intelligent simulated AI reply based on goal keywords
        setTimeout(() => {
          const lower = userText.toLowerCase();
          let replyText = "Let's build a sustainable, science-backed performance protocol around your objective.";
          let structuredPlan: AIMessage['structuredPlan'] = undefined;

          if (lower.includes('lose') || lower.includes('fat') || lower.includes('weight') || lower.includes('10kg')) {
            replyText = "Dropping body fat while preserving lean contractile tissue requires a controlled 400-500 kcal deficit, high protein (2.0g/kg), and compound resistance training to signal muscle retention.";
            structuredPlan = {
              goal: 'Fat Loss & Athletic Body Recomposition',
              weeklySplit: [
                { day: 'Monday', focus: 'Upper Body Heavy + Core', exercises: ['Incline Dumbbell Press (4x8)', 'Chest-Supported Row (4x10)', 'Hanging Leg Raises (3x15)'] },
                { day: 'Tuesday', focus: 'HIIT Inferno Studio Class', exercises: ['Assault Bike Intervals', 'Kettlebell Swings (5x20)', 'Battle Rope Waves'] },
                { day: 'Thursday', focus: 'Lower Body Strength & Glutes', exercises: ['Barbell Back Squats (4x6)', 'Romanian Deadlifts (4x8)', 'Walking DB Lunges (3x12/leg)'] },
                { day: 'Saturday', focus: 'Boxing Conditioning or Hyrox', exercises: ['6 Rounds Heavy Bag', 'Sled Push 50m (5 sets)', 'Row Erg 2000m'] },
              ],
              nutritionTips: [
                'Maintain a steady ~450 kcal deficit below maintenance',
                'Prioritize 160g-180g protein spread across 4 meals',
                'Hydrate with minimum 3.5 Litres of water + electrolytes daily',
              ],
              recommendedClasses: ['HIIT Inferno', 'Championship Boxing', 'Zen Flow Yoga'],
            };
          } else if (lower.includes('muscle') || lower.includes('hypertrophy') || lower.includes('bulk') || lower.includes('strength')) {
            replyText = "Maximum hypertrophy requires progressive mechanical tension, training within 1-3 RIR (Reps in Reserve), and a 250-300 kcal clean surplus.";
            structuredPlan = {
              goal: '4-Day Hypertrophy & Progressive Overload',
              weeklySplit: [
                { day: 'Monday', focus: 'Chest, Shoulders & Triceps', exercises: ['Barbell Flat Bench (4x6)', 'Overhead Dumbbell Press (3x8)', 'Cable Lateral Raises (4x12)', 'Skull Crushers (3x10)'] },
                { day: 'Tuesday', focus: 'Back & Biceps', exercises: ['Weighted Pull-Ups (4x6)', 'Barbell Bent-Over Row (4x8)', 'Incline DB Curls (3x12)'] },
                { day: 'Thursday', focus: 'Quad & Calves Focus', exercises: ['Barbell Squat (4x6)', 'Leg Press (3x12 drop set)', 'Bulgarian Split Squats (3x10)'] },
                { day: 'Friday', focus: 'Posterior Chain & Hamstrings', exercises: ['Conventional Deadlift (3x5)', 'Lying Leg Curls (4x12)', 'Seated Calf Raises (4x15)'] },
              ],
              nutritionTips: [
                'Target 1.8g-2.2g of protein per kg bodyweight',
                'Take 5g Creatine Monohydrate daily for ATP regeneration',
                'Consume 40-50g fast carbs 45 mins before training',
              ],
              recommendedClasses: ['Iron & Hypertrophy', 'Hyrox Athletic Prep'],
            };
          } else if (lower.includes('mobility') || lower.includes('squat') || lower.includes('pain') || lower.includes('recovery')) {
            replyText = "Restoring joint range of motion unlocks deeper force production and prevents tendon overuse.";
            structuredPlan = {
              goal: 'Squat Mobility & Hip Decompression',
              weeklySplit: [
                { day: 'Daily AM', focus: 'Hip Capsule & Ankle Dorsiflexion', exercises: ['90/90 Hip Switches (2 mins)', 'Weighted Ankle Dorsiflexion Stretch (2x60s)', 'Couch Stretch (90s/side)'] },
                { day: 'Pre-Workout', focus: 'Thoracic & Glute Activation', exercises: ['Cat-Cow with Breathwork (10 reps)', 'Banded Monster Walks (3x15)', 'Deep Goblet Squat Pry (60s)'] },
              ],
              nutritionTips: [
                'Prioritize Omega-3 EPA/DHA (2000mg) for joint inflammation',
                'Incorporate 10-15g collagen peptides 30 mins before mobility work',
              ],
              recommendedClasses: ['Zen Flow Yoga', 'Athletic Mobility & Recovery'],
            };
          } else {
            replyText = `Understood. At EliteFit, we tailor training around your exact athletic baseline. I recommend starting with our InBody 570 scan and joining an introductory session with one of our master coaches.`;
          }

          const aiReply: AIMessage = {
            id: `ai-reply-${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            timestamp: 'Just now',
            structuredPlan,
          };

          set((s) => ({
            aiMessages: [...s.aiMessages, aiReply],
            isAITyping: false,
          }));
        }, 900);
      },

      resetAIChat: () => set({ aiMessages: INITIAL_AI_MESSAGES }),

      // UI Modals
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      isTrialModalOpen: false,
      trialModalLocation: undefined,
      openTrialModal: (location) =>
        set({ isTrialModalOpen: true, trialModalLocation: location }),
      closeTrialModal: () =>
        set({ isTrialModalOpen: false, trialModalLocation: undefined }),

      selectedClassModal: null,
      openClassModal: (gymClass) => set({ selectedClassModal: gymClass }),
      closeClassModal: () => set({ selectedClassModal: null }),

      selectedTrainerModal: null,
      openTrainerModal: (trainer) => set({ selectedTrainerModal: trainer }),
      closeTrainerModal: () => set({ selectedTrainerModal: null }),

      selectedProductModal: null,
      openProductModal: (product) => set({ selectedProductModal: product }),
      closeProductModal: () => set({ selectedProductModal: null }),

      selectedCaseModal: null,
      openCaseModal: (trans) => set({ selectedCaseModal: trans }),
      closeCaseModal: () => set({ selectedCaseModal: null }),

      isQRPassModalOpen: false,
      setQRPassModalOpen: (open) => set({ isQRPassModalOpen: open }),

      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
    }),
    {
      name: 'elitefit-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        bookings: state.bookings,
        cart: state.cart,
        leads: state.leads,
        prRecords: state.prRecords,
        weightHistory: state.weightHistory,
        notifications: state.notifications,
        aiMessages: state.aiMessages,
      }),
    }
  )
);
