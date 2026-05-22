import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthContent from '@/app/sign-up-login/components/AuthContent';

export default function SignUpLoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AuthContent />
      <Footer />
    </main>
  );
}