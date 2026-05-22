import React from 'react';

export default function ProductsHero() {
  return (
    <div className="pt-28 pb-10 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary block mb-2">
              Full Collection
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              Shop All Products
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            120+ natural, eco-certified skincare products. Free shipping on every order.
          </p>
        </div>
        <div className="mt-6 h-px bg-border" />
      </div>
    </div>
  );
}