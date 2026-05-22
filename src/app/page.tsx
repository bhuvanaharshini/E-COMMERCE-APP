import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import ValuesSection from '@/app/components/ValuesSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import CtaBanner from '@/app/components/CtaBanner';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header cartCount={2} wishlistCount={3} />
      <HeroSection />
      <FeaturedProducts />
      <ValuesSection />
      <TestimonialsSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}