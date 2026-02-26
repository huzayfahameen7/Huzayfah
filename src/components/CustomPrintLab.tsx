"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import Button from './Button';
import { useCart } from '../contexts/CartContext';

interface Props {
  product: Product;
}

const FABRICS = ['Pure Silk', 'Organza', 'Cotton Net', 'Lawn', 'Karandi', 'Cotton'] as const;
type Fabric = (typeof FABRICS)[number];

const COLORS = [
  { id: 'deep-maroon', name: 'Deep Maroon', hex: '#4A1B2A' },
  { id: 'zinc-blue', name: 'Zinc Blue', hex: '#223347' },
  { id: 'emerald-green', name: 'Emerald Green', hex: '#094C3B' },
  { id: 'mustard-gold', name: 'Mustard Gold', hex: '#D4AF37' },
  { id: 'ivory', name: 'Ivory', hex: '#FFFFF0' },
] as const;

const PATTERNS = [
  {
    id: 'mughal-gold',
    name: 'Mughal Gold Leaf',
    description: 'Bespoke gold leafing inspired by 17th century motifs.',
    asset: '/images/patterns/mughal-gold.svg',
  },
  {
    id: 'floral-vines',
    name: 'Floral Vines',
    description: 'Trailing vines with delicate florals.',
    asset: '/images/patterns/vintage-floral.svg',
  },
  {
    id: 'royal-block',
    name: 'Royal Block Border',
    description: 'Geometric borders with Mughal symmetry.',
    asset: '/images/patterns/royal-block.svg',
  },
] as const;

export default function CustomPrintLab({ product }: Props) {
  const { addItem } = useCart();

  const [selectedFabric, setSelectedFabric] = useState<Fabric>('Pure Silk');
  const [selectedColorId, setSelectedColorId] = useState<string>('deep-maroon');
  const [selectedPatternId, setSelectedPatternId] = useState<string>('mughal-gold');
  const [goldFoil, setGoldFoil] = useState<boolean>(true);
  
  // Bespoke Form State
  const [measurements, setMeasurements] = useState('');

  const selectedColor = COLORS.find((c) => c.id === selectedColorId) ?? COLORS[0];
  const selectedPattern = PATTERNS.find((p) => p.id === selectedPatternId) ?? PATTERNS[0];

  const configurationText = `I want the ${selectedPattern.name} pattern in ${
    goldFoil ? 'Gold Foil' : 'classic ink'
  } on ${selectedColor.name} ${selectedFabric} fabric from "${product.name}". Measurements: ${measurements || 'To be shared later'}`;

  const whatsappHref = `https://wa.me/923001234567?text=${encodeURIComponent(configurationText)}`;

  const handleAddConfiguredToCart = () => {
    addItem(product, {
      fabric: selectedFabric,
      baseColor: selectedColor.name,
      pattern: selectedPattern.name,
      goldFoil: goldFoil,
      print: null 
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 rounded-3xl border shadow-xl bg-ivory" style={{ borderColor: '#D4AF37' }}>
      <div className="grid gap-12 lg:grid-cols-[1fr,0.8fr] items-start">
        
        {/* Left: Preview & Bespoke Form */}
        <section className="space-y-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal-900 italic">The Artisan's Canvas</h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Design your heritage piece. Select from our curated palette and traditional motifs.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border-2 border-gold/20 shadow-2xl bg-white p-2">
            <div className="relative rounded-2xl overflow-hidden h-[350px] md:h-[450px]">
              <motion.div
                key={`${selectedPattern.id}-${selectedColor.id}-${goldFoil}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  backgroundColor: selectedColor.hex,
                  backgroundImage: `url(${selectedPattern.asset})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '220px 220px',
                  mixBlendMode: goldFoil ? 'screen' : 'multiply',
                  filter: goldFoil ? 'brightness(1.1) contrast(1.1)' : 'none',
                }}
              />
              <div className="absolute inset-0 bg-black/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
              
              <div className="absolute top-6 left-6 space-y-2">
                <span className="block px-4 py-1.5 rounded-full bg-white/90 text-[10px] font-bold tracking-[0.2em] uppercase text-charcoal-900 backdrop-blur-md">
                  {selectedFabric}
                </span>
                <span className="block px-4 py-1.5 rounded-full bg-gold text-[10px] font-bold tracking-[0.2em] uppercase text-charcoal-900 shadow-lg">
                  {selectedPattern.name}
                </span>
              </div>
            </div>
          </div>

          {/* Bespoke Consultation Form */}
          <div className="bg-white/50 p-6 rounded-2xl border border-gold/10 backdrop-blur-sm">
            <h3 className="font-serif text-xl text-charcoal-900 mb-4">Bespoke Details</h3>
            <div className="space-y-4">
              <textarea
                value={measurements}
                onChange={(e) => setMeasurements(e.target.value)}
                placeholder="Share specific measurements or requests (e.g., Neck design, sleeve length...)"
                className="w-full bg-white border border-gold/20 p-4 rounded-xl text-sm focus:ring-1 focus:ring-gold outline-none transition-all h-24"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleAddConfiguredToCart} className="flex-1 bg-charcoal-900 text-ivory hover:bg-gold hover:text-charcoal-900 py-4 text-sm tracking-widest uppercase">
                  Add To Luxury Cart
                </Button>
                <a href={whatsappHref} target="_blank" className="flex-1 flex items-center justify-center gap-2 border-2 border-gold text-charcoal-900 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gold/5 transition-all">
                  WhatsApp Design Inquiry
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Customization Steps */}
        <section className="space-y-8">
          {/* Fabric Step */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Step 01 — Fabric</h4>
            <div className="grid grid-cols-2 gap-3">
              {FABRICS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFabric(f)}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                    selectedFabric === f ? 'bg-gold text-charcoal-900 border-gold' : 'bg-white border-gold/10 hover:border-gold'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Color Step */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Step 02 — Palette</h4>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColorId(c.id)}
                  className={`w-12 h-12 rounded-full border-2 transition-all shadow-lg ${
                    selectedColorId === c.id ? 'scale-110 border-gold ring-4 ring-gold/10' : 'border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Pattern Step */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Step 03 — Motif</h4>
            <div className="space-y-3">
              {PATTERNS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatternId(p.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    selectedPatternId === p.id ? 'bg-white border-gold shadow-md scale-[1.02]' : 'bg-white/50 border-transparent hover:border-gold/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-ivory border border-gold/20 flex items-center justify-center p-2">
                    <img src={p.asset} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-charcoal-900">{p.name}</p>
                    <p className="text-[10px] text-gray-medium">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Finish Step */}
          <div className="space-y-4 pt-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Step 04 — Finish</h4>
            <div className="flex gap-4">
              <button onClick={() => setGoldFoil(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${goldFoil ? 'bg-gold text-charcoal-900 border-gold shadow-lg' : 'border-gold/20'}`}>
                Gold Foil
              </button>
              <button onClick={() => setGoldFoil(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${!goldFoil ? 'bg-charcoal-900 text-ivory border-charcoal-900 shadow-lg' : 'border-gold/20'}`}>
                Classic Ink
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}