import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetailContent from './components/ProductDetailContent';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={0} wishlistCount={0} />
      <ProductDetailContent productId={params.id} />
      <Footer />
    </main>
  );
}
