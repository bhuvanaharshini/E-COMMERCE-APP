import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccountContent from '@/app/account/components/AccountContent';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={2} wishlistCount={3} />
      <AccountContent />
      <Footer />
    </main>
  );
}