import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-bold text-base text-foreground">
                Eco<span className="text-primary">Glow</span>
              </span>
            </Link>
            <nav className="flex items-center gap-5 flex-wrap justify-center">
              <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
              <Link href="/orders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Orders</Link>
              <Link href="/account" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Account</Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            </nav>
          </div>
          {/* Copyright */}
          <p className="text-sm font-medium text-muted-foreground">
            © 2026 EcoGlow
          </p>
        </div>
      </div>
    </footer>
  );
}