'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import Heading from '@/components/Heading';

export default function NewArrivals() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading level={1} className="mb-8 text-center">
            New Arrivals
          </Heading>
          <p className="text-center text-gray-medium text-lg max-w-2xl mx-auto">
            Discover our latest collection of premium products. Coming soon with exclusive designs
            crafted to elevate your lifestyle.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
