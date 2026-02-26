'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { Instagram } from 'lucide-react';

// Local luxury product imagery for Instagram strip (7–12)
const instagramShots = [
  {
    src: '/product image/product-7.jpg',
    title: 'Royal Velvet Touch',
    label: 'Look 07',
  },
  {
    src: '/product image/product-8.jpg',
    title: 'Golden Grace Edition',
    label: 'Look 08',
  },
  {
    src: '/product image/product-9.jpg',
    title: 'Midnight Bloom Collection',
    label: 'Look 09',
  },
  {
    src: '/product image/product-10.jpg',
    title: 'Opulent Pearl Ensemble',
    label: 'Look 10',
  },
  {
    src: '/product image/product-11.jpg',
    title: 'Regal Ember Luxe',
    label: 'Look 11',
  },
  {
    src: '/product image/product-12.jpg',
    title: 'Moonlit Silk Reverie',
    label: 'Look 12',
  },
];

// Fade-in-up animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function InstagramFeed() {
  return (
    <section className="bg-ivory py-20 border-t border-gray-light">
      <Container>
        <div className="text-center mb-10">
          <Heading
            level={2}
            className="font-serif text-3xl md:text-4xl tracking-wide mb-3"
          >
            Follow Our Journey @EleganceByMahnoor
          </Heading>
          <p className="text-gray-medium max-w-2xl mx-auto text-sm md:text-base">
            Glimpses of hand-block artistry, embroidered heirlooms, and
            behind-the-scenes moments from our atelier.
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-full">
            {instagramShots.map((shot, index) => (
              <motion.a
                key={shot.src}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[220px] sm:w-[260px] md:w-[280px] flex-shrink-0 rounded-xl overflow-hidden bg-charcoal-900/5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeInUpVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  {/* Using Next.js Image component for optimization */}
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 220px, (max-width: 1024px) 260px, 280px"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                  
                  {/* Title appears on hover in elegant Serif font */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                    <div className="text-center px-4">
                      <h3 className="font-serif text-xl md:text-2xl text-ivory tracking-wide drop-shadow-lg">
                        {shot.title}
                      </h3>
                      <p className="font-serif text-xs text-gold mt-2 uppercase tracking-[0.2em]">
                        {shot.label}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle gold dust shimmer */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.28),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(212,175,55,0.22),transparent_55%)] mix-blend-screen opacity-0 group-hover:opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  
                  {/* Instagram icon */}
                  <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold/90 text-charcoal-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out shadow-gold">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>

                {/* Label always visible at bottom */}
                <div className="bg-white/95 px-3 py-2 border-t border-gold/30">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-gray-medium line-clamp-1">
                    {shot.label}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

