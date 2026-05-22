import React from 'react';
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-primary rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 blob-secondary opacity-40" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-48 h-48 blob-primary opacity-30" aria-hidden="true" />

          <div className="relative z-10 space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground/60">
              Free Shipping · Always
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground tracking-tight leading-tight">
              Start Your Natural<br />
              <span className="italic font-light">Skincare Journey.</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto font-light">
              Join 50,000+ customers who've made the switch to clean, eco-certified beauty. Free shipping on every order, always.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/products"
                className="magnetic-btn px-8 py-4 bg-primary-foreground text-primary rounded-full font-bold text-base tracking-wide hover:bg-primary-foreground/90 transition-all"
              >
                Shop Now
              </Link>
              <Link
                href="/sign-up-login"
                className="px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground rounded-full font-bold text-base tracking-wide hover:border-primary-foreground transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}