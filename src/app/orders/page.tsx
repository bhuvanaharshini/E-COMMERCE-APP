import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrdersContent from '@/app/orders/components/OrdersContent';

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={2} wishlistCount={3} />
      <OrdersContent />
      <Footer />
    </main>
  );
}