'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
  alt: string;
}

const initialItems: CartItem[] = [
{ id: 1, name: 'HydraGlow Serum', category: 'Serums', price: 48, qty: 1, image: "https://images.unsplash.com/photo-1656147962464-5060440361c4", alt: 'Clear glass dropper serum bottle with gold cap surrounded by aloe vera leaves' },
{ id: 5, name: 'Vitamin C Cream', category: 'Moisturizers', price: 52, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_187a63991-1772732306826.png", alt: 'White ceramic jar of vitamin C brightening cream beside sliced oranges on light wood' }];


export default function CartContent() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
    prev.map((item) =>
    item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
          Your Cart
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>

        {items.length === 0 ?
        <div className="text-center py-24 space-y-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="ShoppingBagIcon" size={36} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some natural goodness to your routine.</p>
            <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-all">
            
              <Icon name="ArrowLeftIcon" size={16} className="text-primary-foreground" />
              Continue Shopping
            </Link>
          </div> :

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) =>
            <div
              key={item.id}
              className="bg-card rounded-3xl border border-border p-5 flex gap-5 items-center">
              
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                    <AppImage
                  src={item.image}
                  alt={item.alt}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full" />
                
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {item.category}
                    </p>
                    <h3 className="text-base font-bold text-foreground truncate">{item.name}</h3>
                    <p className="text-lg font-extrabold text-primary mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1.5">
                      <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                    aria-label="Decrease quantity">
                    
                        <Icon name="MinusIcon" size={14} className="text-foreground" />
                      </button>
                      <span className="text-sm font-bold text-foreground w-5 text-center">{item.qty}</span>
                      <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                    aria-label="Increase quantity">
                    
                        <Icon name="PlusIcon" size={14} className="text-foreground" />
                      </button>
                    </div>
                    <button
                  onClick={() => removeItem(item.id)}
                  className="w-9 h-9 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
                  aria-label="Remove item">
                  
                      <Icon name="TrashIcon" size={16} className="text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                </div>
            )}

              <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mt-2">
              
                <Icon name="ArrowLeftIcon" size={16} className="text-primary" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-card rounded-3xl border border-border p-8 sticky top-28 space-y-6">
                <h2 className="text-xl font-extrabold text-foreground">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span className="font-bold text-foreground">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-bold text-primary flex items-center gap-1">
                      <Icon name="TruckIcon" size={14} className="text-primary" />
                      Free
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-extrabold text-foreground">${subtotal}</span>
                  </div>
                </div>

                <div className="badge-eco rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Icon name="TruckIcon" size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary">Free shipping on this order!</span>
                </div>

                <Link
                href="/checkout"
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm tracking-wide text-center flex items-center justify-center gap-2 hover:bg-primary/90 transition-all magnetic-btn">
                
                  Proceed to Checkout
                  <Icon name="ArrowRightIcon" size={16} className="text-primary-foreground" />
                </Link>

                <p className="text-center text-xs text-muted-foreground">
                  Secure checkout · 30-day returns
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}