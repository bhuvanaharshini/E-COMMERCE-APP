'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
}

export default function Header({ cartCount = 0, wishlistCount = 0 }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Shop', href: '/products' },
    { label: 'Orders', href: '/orders' },
    { label: 'Account', href: '/account' },
  ];

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`nav-pill rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <AppLogo size={36} />
              <span className="font-extrabold text-lg tracking-tight text-foreground hidden sm:block">
                Eco<span className="text-primary">Glow</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link
                href="/account"
                className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
                aria-label="Wishlist"
              >
                <Icon name="HeartIcon" size={20} className="text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
                aria-label="Cart"
                data-cart-icon
              >
                <Icon name="ShoppingBagIcon" size={20} className="text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Sign In */}
              <Link
                href="/sign-up-login"
                className="hidden sm:flex items-center gap-1.5 px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-all magnetic-btn"
              >
                Sign In
              </Link>

              {/* Hamburger */}
              <button
                className="md:hidden p-2.5 rounded-full hover:bg-muted transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-foreground hover:text-primary transition-colors py-4 border-b border-border"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sign-up-login"
              onClick={() => setMenuOpen(false)}
              className="mt-6 w-full py-4 bg-primary text-primary-foreground rounded-full text-center text-base font-bold tracking-wide"
            >
              Sign In / Register
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}