'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const orderItems = [
{ id: 1, name: 'HydraGlow Serum', price: 48, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d677b008-1767289040310.png", alt: 'HydraGlow serum bottle' },
{ id: 5, name: 'Vitamin C Cream', price: 52, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae0eba2f-1772593906015.png", alt: 'Vitamin C cream jar' }];


export default function CheckoutContent() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    payment: 'card',
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  });

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">Order Placed!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Thank you for your order. We've sent a confirmation to your email. Your eco-friendly skincare is on its way!
          </p>
          <div className="badge-eco rounded-2xl px-5 py-3 inline-flex items-center gap-2">
            <Icon name="TruckIcon" size={16} className="text-primary" />
            <span className="text-sm font-bold text-primary">Free shipping · Estimated 3-5 business days</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/orders"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-all">
              
              Track Your Order
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border-2 border-border text-foreground rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all">
              
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">Checkout</h1>
        <div className="flex items-center gap-2 mb-8">
          <Icon name="LockClosedIcon" size={14} className="text-primary" />
          <p className="text-sm text-muted-foreground">Secure, encrypted checkout</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shipping */}
              <div className="bg-card rounded-3xl border border-border p-8">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="MapPinIcon" size={18} className="text-primary" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                  { name: 'firstName', label: 'First Name', placeholder: 'Emma', type: 'text' },
                  { name: 'lastName', label: 'Last Name', placeholder: 'Rodriguez', type: 'text' },
                  { name: 'email', label: 'Email', placeholder: 'emma@example.com', type: 'email' },
                  { name: 'phone', label: 'Phone', placeholder: '(555) 234-5678', type: 'tel' }].
                  map((field) =>
                  <div key={field.name}>
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      required
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">
                      Street Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      placeholder="123 Green Valley Drive"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                  </div>
                  {[
                  { name: 'city', label: 'City', placeholder: 'Portland', type: 'text' },
                  { name: 'state', label: 'State', placeholder: 'OR', type: 'text' },
                  { name: 'zip', label: 'ZIP Code', placeholder: '97201', type: 'text' }].
                  map((field) =>
                  <div key={field.name}>
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      required
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                    </div>
                  )}
                </div>

                {/* Free Shipping Badge */}
                <div className="mt-5 badge-eco rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Icon name="TruckIcon" size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary">Free shipping included on this order</span>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card rounded-3xl border border-border p-8">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="CreditCardIcon" size={18} className="text-primary" />
                  Payment Method
                </h2>

                <div className="flex gap-3 mb-6">
                  {['card', 'paypal'].map((method) =>
                  <button
                    type="button"
                    key={method}
                    onClick={() => setForm((p) => ({ ...p, payment: method }))}
                    className={`flex-1 py-3 rounded-2xl border-2 text-sm font-bold transition-all capitalize ${
                    form.payment === method ?
                    'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`
                    }>
                    
                      {method === 'card' ? '💳 Credit Card' : '🅿️ PayPal'}
                    </button>
                  )}
                </div>

                {form.payment === 'card' &&
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Card Number</label>
                      <input
                      name="cardNumber"
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={form.cardNumber}
                      onChange={handleChange}
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Name on Card</label>
                      <input
                      name="cardName"
                      type="text"
                      placeholder="Emma Rodriguez"
                      value={form.cardName}
                      onChange={handleChange}
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Expiry</label>
                      <input
                      name="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={handleChange}
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">CVV</label>
                      <input
                      name="cvv"
                      type="text"
                      placeholder="123"
                      value={form.cvv}
                      onChange={handleChange}
                      className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50" />
                    
                    </div>
                  </div>
                }
                {form.payment === 'paypal' &&
                <div className="bg-muted rounded-2xl p-6 text-center">
                    <p className="text-sm text-muted-foreground">You'll be redirected to PayPal to complete your payment.</p>
                  </div>
                }
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-3xl border border-border p-8 sticky top-28 space-y-6">
                <h2 className="text-lg font-extrabold text-foreground">Order Summary</h2>

                <div className="space-y-4">
                  {orderItems.map((item) =>
                  <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                        <AppImage src={item.image} alt={item.alt} fill className="object-cover" sizes="56px" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[9px] font-bold rounded-full flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                      </div>
                      <span className="text-sm font-bold text-foreground">${item.price * item.qty}</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-foreground">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-bold text-primary">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (est.)</span>
                    <span className="font-bold text-foreground">${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-extrabold text-foreground">${(subtotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-primary/90 transition-all magnetic-btn">
                  
                  <Icon name="LockClosedIcon" size={16} className="text-primary-foreground" />
                  Place Order · ${(subtotal * 1.08).toFixed(2)}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="ShieldCheckIcon" size={12} className="text-muted-foreground" /> SSL Secured
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ArrowPathIcon" size={12} className="text-muted-foreground" /> 30-Day Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>);

}