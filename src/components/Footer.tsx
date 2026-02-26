"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '923120026897';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const collections = [
    { href: '/products?collection=lawn', label: 'Lawn' },
    { href: '/products?collection=chiffon', label: 'Chiffon' },
    { href: '/products?collection=silk', label: 'Silk' },
    { href: '/custom-print-lab', label: 'Custom Lab' },
  ];

  const customerCare = [
    { href: '/shipping', label: 'Shipping' },
    { href: '/returns', label: 'Returns' },
    { href: '/size-guide', label: 'Size Guide' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    setEmail('');
    alert('Thanks for subscribing to Elegance by Mahnoor!');
  };

  const linkHover = { y: -3, transition: { duration: 0.18 } };

  return (
    <footer className="relative mt-24">
      {/* Premium Gold Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />

      <div className="bg-[#121212] text-[#f4f1ea] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Story Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8a2e] flex items-center justify-center text-[#121212] font-bold text-lg shadow-lg shadow-gold/10">
                  EM
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold tracking-tight">Elegance</h3>
                  <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em]">By Mahnoor</p>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Crafting luxury textiles with timeless elegance and fine detail. Discover curated collections of premium fabrics.
              </p>
              <div className="space-y-2">
                <a href="tel:+923120026897" className="flex items-center gap-2 text-white/70 hover:text-[#d4af37] transition-colors text-sm">
                   <span className="opacity-80">📞</span> 0312-0026897
                </a>
                <a href="tel:+923453452593" className="flex items-center gap-2 text-white/70 hover:text-[#d4af37] transition-colors text-sm">
                   <span className="opacity-80">📞</span> 0345-3452593
                </a>
              </div>
            </div>

            {/* Shop Collections */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37]">Collections</h4>
              <ul className="space-y-4">
                {collections.map((c) => (
                  <li key={c.label}>
                    <motion.div whileHover={linkHover} className="inline-block">
                      <Link href={c.href} className="text-white/60 hover:text-[#d4af37] text-sm transition-all duration-300">
                        {c.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37]">Information</h4>
              <ul className="space-y-4">
                {customerCare.map((c) => (
                  <li key={c.label}>
                    <motion.div whileHover={linkHover} className="inline-block">
                      <Link href={c.href} className="text-white/60 hover:text-[#d4af37] text-sm transition-all duration-300">
                        {c.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37]">Stay Connected</h4>
              <p className="text-sm text-white/60 mb-6 leading-relaxed">Join our inner circle for exclusive updates and private previews.</p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-white/20"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-[#d4af37] text-[#121212] py-3 rounded-md font-bold text-xs uppercase tracking-widest shadow-lg shadow-gold/20"
                >
                  Subscribe
                </motion.button>
              </form>

              {/* Social Icons */}
              <div className="flex items-center gap-5 mt-8">
                <motion.a whileHover={{ y: -3 }} href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="text-white/40 hover:text-[#d4af37] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.707 5.403 2.051 7.747L2.792 22l8.287-2.174c2.256 1.235 4.787 1.887 7.456 1.887 5.412 0 9.814-4.402 9.814-9.813 0-2.622-.727-5.093-2.113-7.218a9.842 9.842 0 00-7.476-3.481z"/></svg>
                </motion.a>
                <motion.a whileHover={{ y: -3 }} href="mailto:info@elegancebymahnoor.com" className="text-white/40 hover:text-[#d4af37] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" /></svg>
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:row justify-between items-center gap-4 text-white/30 text-[10px] uppercase tracking-[0.3em]">
            <p>© {currentYear} Elegance by Mahnoor. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}