'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: {
    opacity: 0,
    y: -20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/products', label: 'Collection' },
    { href: '/custom-print-lab', label: 'Custom Print Lab' },
    { href: '/our-story', label: 'Our Story' },
    { href: '#cart', label: 'Shopping Cart' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            className="fixed top-16 left-0 right-0 bg-ivory border-b border-gold/20 z-40 md:hidden shadow-lg"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link href={item.href}>
                    <motion.a
                      className="block px-4 py-3 rounded-lg text-charcoal font-medium hover:bg-gold/10 hover:text-gold transition-all duration-300"
                      whileHover={{ x: 8, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                    >
                      {item.label}
                    </motion.a>
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <motion.div className="my-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

              {/* Mobile CTA */}
              <motion.button
                className="w-full px-4 py-3 bg-gradient-to-r from-gold to-gold-dark text-charcoal font-bold rounded-lg hover:shadow-gold transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
              >
                Start Shopping
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
