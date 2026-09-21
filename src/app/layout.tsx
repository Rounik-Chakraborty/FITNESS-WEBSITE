import type { Metadata, Viewport } from 'next';
import './globals.css';
import { RoleSwitcherBanner } from '@/components/common/RoleSwitcherBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MemberBottomNav } from '@/components/layout/MemberBottomNav';
import { GlobalSearchModal } from '@/components/common/GlobalSearchModal';
import { FreeTrialModal } from '@/components/common/FreeTrialModal';
import { QRPassModal } from '@/components/common/QRPassModal';
import { ClassBookingModal } from '@/components/booking/ClassBookingModal';
import { TrainerBookingModal } from '@/components/booking/TrainerBookingModal';
import { CaseStudyModal } from '@/components/transformations/CaseStudyModal';
import { ProductModal } from '@/components/store/ProductModal';
import { CartSlideover } from '@/components/store/CartSlideover';
import { EliteFitAIWidget } from '@/components/ai/EliteFitAIWidget';
import { WhatsAppFloatingCTA } from '@/components/common/WhatsAppFloatingCTA';

export const metadata: Metadata = {
  title: 'EliteFit | Premium Athletic Club, Performance Platform & Gym Management',
  description: 'Train stronger. Move better. Live elite. Join EliteFit and experience world-class strength floors, recovery cryo suites, high-energy studio classes, and intelligent coaching across Eastern India.',
  keywords: ['EliteFit gym', 'premium fitness club Kolkata', 'boxing training', 'hyrox prep', 'personal training', 'HIIT class', 'Olympic lifting', 'dry sauna recovery'],
  authors: [{ name: 'EliteFit Performance Labs' }],
  openGraph: {
    title: 'EliteFit | Train Hard. Live Elite.',
    description: 'A high-performance athletic club ecosystem combining Olympic-tier equipment, science-backed biomechanical coaching, and elite recovery suites.',
    url: 'https://elitefit.club',
    siteName: 'EliteFit Athletic Club',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'EliteFit Athletic Club Arena',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EliteFit | Train Hard. Live Elite.',
    description: 'Transform your physical threshold with science-backed periodized training and bespoke recovery.',
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070709',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070709] text-[#F3F4F6] min-h-screen flex flex-col font-sans selection:bg-[#E2F163] selection:text-black">
        {/* Top Role Switcher for seamless demo testing */}
        <RoleSwitcherBanner />

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 pb-16 md:pb-0">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Fixed Mobile Member Bottom Navigation */}
        <MemberBottomNav />

        {/* Global Modals & Floating Tools */}
        <GlobalSearchModal />
        <FreeTrialModal />
        <QRPassModal />
        <ClassBookingModal />
        <TrainerBookingModal />
        <CaseStudyModal />
        <ProductModal />
        <CartSlideover />
        <EliteFitAIWidget />
        <WhatsAppFloatingCTA />
      </body>
    </html>
  );
}
