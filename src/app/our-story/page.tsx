'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import Heading from '@/components/Heading';

const cards = [
  {
    title: 'The Carved Block',
    body:
      'In quiet Mughal-era workshops, a single block of seasoned wood becomes our starting point. Each curve is carved by hand, echoing centuries-old geometry that still guides the rhythm of our prints today.',
  },
  {
    title: 'The Natural Palette',
    body:
      'Earth, stone, and flower yield the pigments that tint our fabrics. Layered slowly in small batches, these tones age gracefully, settling into the weave like memories impressed in cloth.',
  },
  {
    title: 'The Human Touch',
    body:
      'Every impression is pressed by hand, guided by the artisan’s trained eye and instinctive pause. Tiny variations in pressure and placement transform each suit into a one-of-one expression of bespoke elegance.',
  },
];

export default function OurStory() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <Heading level={1} className="mb-4">
            Our Story
          </Heading>
          <p className="text-sm md:text-base text-gray-medium max-w-2xl mx-auto">
            Elegance By Mahnoor is an ode to 17th-century Mughal ateliers, where patience, pigment,
            and hand-carved blocks transformed simple cloth into living art.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative h-full rounded-2xl border shadow-sm px-6 py-8 flex flex-col justify-between"
              style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(212,175,55,0.5)' }}
            >
              <div>
                <h2 className="font-serif text-lg md:text-xl text-charcoal-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {card.body}
                </p>
              </div>
              <div className="mt-6 h-px w-10 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
