'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Atmospheric blobs */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blob-primary z-0 transition-transform duration-700 ease-out"
        aria-hidden="true" />
      
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] blob-secondary z-0" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] blob-primary z-0 opacity-60" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full badge-eco text-sm font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              100% Natural · Free Shipping on All Orders
            </div>

            {/* Headline */}
            <h1 className="text-hero-xl font-extrabold text-foreground leading-none tracking-tight">
              Glow Naturally.<br />
              <span className="text-primary italic font-light">Live Consciously.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-light">
              Premium eco-certified skincare crafted from nature's finest botanicals. Zero harmful chemicals, 100% sustainable packaging — delivered free to your door.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/products"
                className="magnetic-btn px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
                
                Shop the Collection
              </Link>
              <Link
                href="/sign-up-login"
                className="px-8 py-4 border-2 border-border text-foreground rounded-full font-bold text-base tracking-wide hover:border-primary hover:text-primary transition-all">
                
                Join EcoGlow
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">50k+</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">120+</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Natural Products</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Avg. Rating</p>
              </div>
            </div>
          </div>

          {/* Right: Product Visual Grid */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative grid grid-cols-2 gap-4">
              {/* Main large card */}
              <div className="col-span-2 relative rounded-3xl overflow-hidden aspect-[16/9] group animate-float">
                <AppImage
                  src="https://images.unsplash.com/photo-1670942516132-854349a510b2"
                  alt="Bright studio flatlay of natural skincare bottles and green botanical leaves on white surface"
                  fill
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 glass-card rounded-2xl px-4 py-3">
                  <p className="text-xs font-bold text-foreground uppercase tracking-widest">Bestseller</p>
                  <p className="text-sm font-bold text-primary">HydraGlow Serum</p>
                </div>
              </div>

              {/* Two smaller cards */}
              <div className="relative rounded-2xl overflow-hidden aspect-square group animate-float-delayed">
                <AppImage
                  src="https://images.unsplash.com/photo-1644641811682-0439fd0185d0"
                  alt="Minimalist amber glass dropper bottle with rosehip oil on cream linen background"
                  fill
                  sizes="20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" />
                
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square group">
                <AppImage
                  src="https://images.unsplash.com/photo-1626636380419-3d0e55b9a032"
                  alt="Bamboo exfoliating scrub jar beside fresh green leaves and white flowers on spa background"
                  fill
                  sizes="20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" />
                
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-5 py-3 rounded-2xl shadow-xl rotate-3 font-bold text-sm">
              🌿 Eco Certified
            </div>
          </div>
        </div>
      </div>
    </section>);

}