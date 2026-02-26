'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { useCart } from '../contexts/CartContext';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href}>
    <span className="relative px-1 py-2 text-charcoal font-medium text-sm tracking-widest hover:text-crimson transition-colors duration-300 group inline-block cursor-pointer">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-crimson"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </span>
  </Link>
);

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCart();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      setPulse(true);
      window.setTimeout(() => setPulse(false), 600);
    };
    window.addEventListener('cart-pulse', handler as EventListener);
    return () => window.removeEventListener('cart-pulse', handler as EventListener);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setScrollY(scroll);
      setIsScrolled(scroll > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blurAmount = Math.min(scrollY / 100, 1) * 10;
  const opacity = Math.min(0.3 + scrollY / 500, 0.85);

  return (
    <>
      {/* Glassmorphism Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Blur Background Layer */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            backgroundColor: `rgba(249, 248, 241, ${opacity})`,
            backdropFilter: `blur(${blurAmount}px)`,
          }}
        />

        {/* Border Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 0.5 : 0.2 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl text-crimson">✨</span>
                <h1 className="font-display text-xl font-bold text-charcoal group-hover:text-crimson transition-colors">
                  Elegance
                </h1>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavLink href="/new-arrivals">New Arrivals</NavLink>
            <NavLink href="/products">Collection</NavLink>
            <NavLink href="/custom-print-lab">Custom Print Lab</NavLink>
            <NavLink href="/our-story">Our Story</NavLink>
          </motion.div>

          {/* Shopping Cart & Menu Toggle */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Shopping Cart Icon */}
            <motion.button
              id="cart-icon-button"
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-crimson/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={
                pulse
                  ? {
                      scale: [1, 1.18, 0.98, 1],
                      boxShadow: [
                        '0 0 0 rgba(0,0,0,0)',
                        '0 0 18px rgba(164,25,61,0.45)',
                        '0 0 10px rgba(164,25,61,0.28)',
                        '0 0 0 rgba(0,0,0,0)'
                      ]
                    }
                  : { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }
              }
              transition={{ duration: 0.5 }}
            >
              <ShoppingCart size={24} className="text-charcoal hover:text-crimson transition-colors" />
              {mounted && getTotalItems() > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-crimson text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-gold/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-charcoal" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-charcoal" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;
