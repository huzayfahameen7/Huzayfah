'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight, Home, ShoppingBag, FlaskConical, Info, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { href: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { href: '/products', label: 'Collections', icon: <ShoppingBag className="w-5 h-5" /> },
    { href: '/custom-lab', label: 'Custom Lab', icon: <FlaskConical className="w-5 h-5" /> },
    { href: '/our-story', label: 'About Us', icon: <Info className="w-5 h-5" /> },
    { href: '/#contact', label: 'Contact', icon: <Phone className="w-5 h-5" /> },
  ];

  const categories = [
    { name: '3-Piece', href: '/products?category=3-piece' },
    { name: 'Pishwas', href: '/products?category=pishwas' },
    { name: 'Sari', href: '/products?category=sari' },
    { name: 'Kaftan', href: '/products?category=kaftan' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-display text-xl font-black text-charcoal">ELEGANCE</span>
              <button onClick={onClose} className="p-2 -mr-2 text-charcoal">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Main Nav */}
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-ivory-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-crimson/5 flex items-center justify-center text-crimson">
                      {item.icon}
                    </div>
                    <span className="font-bold text-charcoal flex-1">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </Link>
                ))}
              </nav>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4">Shop Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={onClose}
                      className="p-4 rounded-2xl border border-gray-100 text-sm font-bold text-charcoal text-center hover:border-crimson hover:text-crimson transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Promo Card */}
              <div className="p-6 rounded-3xl bg-crimson text-white">
                <h4 className="font-bold mb-2">Exclusive Offer</h4>
                <p className="text-sm opacity-90 mb-4">Use code ELEGANCE20 for 20% off your first order.</p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="inline-block px-4 py-2 bg-white text-crimson rounded-lg text-xs font-bold"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">© 2024 Elegance By Mahnoor</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
