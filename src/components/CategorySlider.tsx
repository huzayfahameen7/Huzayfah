'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'luxury-lawn',
    name: 'Luxury Lawn',
    image: 'https://placehold.co/600x800?text=Luxury+Lawn',
    description: 'Premium lawn collection'
  },
  {
    id: 'organza',
    name: 'Organza',
    image: 'https://placehold.co/600x800?text=Organza',
    description: 'Delicate organza pieces'
  },
  {
    id: 'karandi',
    name: 'Karandi',
    image: 'https://placehold.co/600x800?text=Karandi',
    description: 'Traditional karandi wear'
  },
  {
    id: 'silk',
    name: 'Pure Silk',
    image: 'https://placehold.co/600x800?text=Pure+Silk',
    description: 'Luxurious silk ensembles'
  },
  {
    id: 'chiffon',
    name: 'Chiffon',
    image: 'https://placehold.co/600x800?text=Chiffon',
    description: 'Light chiffon designs'
  },
  {
    id: 'premium',
    name: 'Premium',
    image: 'https://placehold.co/600x800?text=Premium',
    description: 'Exclusive premium range'
  }
];

export default function CategorySlider() {
  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12 text-[#A4193D]">
          Shop by Category
        </h2>
        
        <div className="relative">
          {/* Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: 'easeInOut',
                    delay: index * 0.1 
                  }}
                >
                  <Link href={`/products?category=${category.id}`}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 20px 40px rgba(164, 25, 61, 0.15)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-white border-2 border-transparent hover:border-crimson cursor-pointer group"
                    >
                      <div className="relative w-full h-full">
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-400 group-hover:scale-110"
                          style={{ backgroundImage: `url(${category.image})` }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <motion.h3 
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="font-display text-sm md:text-base font-bold text-center"
                          >
                            {category.name}
                          </motion.h3>
                          <motion.p 
                            initial={{ y: 10, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.1 }}
                            className="text-xs text-center opacity-90"
                          >
                            {category.description}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Gradient Edges for Scroll Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FFDFB9] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FFDFB9] to-transparent z-10 pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
