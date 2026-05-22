import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsHero from '@/app/products/components/ProductsHero';
import ProductCatalog from '@/app/products/components/ProductCatalog';
import Product3DShowcase from '@/app/products/components/Product3DShowcase';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={2} wishlistCount={3} />
      <ProductsHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <Product3DShowcase />
      </div>
      <ProductCatalog />
      <Footer />
    </main>
  );
}