import React from 'react';
import Header from './Header';
import Hero from './Hero';
import HeroImage from './HeroImage';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

export default function SplitSmartLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <HeroImage />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
