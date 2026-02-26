"use client";

import Container from '@/components/Container';
import CustomPrintLab from '@/components/CustomPrintLab';
import { Product } from '@/types';

// Sample product for custom print lab
const SAMPLE_PRODUCT: Product = {
  id: 'custom-suit',
  sku: 'CPL-SUIT-001',
  name: 'Custom Hand-Block Print Suit',
  shortDescription: 'Create your own luxury custom print suit',
  price: 499,
  description: 'Design your personalized luxury suit with our advanced printing technology',
  fabric: 'Premium Lawn',
  images: ['/product-images/product-1.jpg'],
  category: 'Custom',
  blockPrintType: 'Hand-Block Print',
  customizable: true,
  printOptions: [
    '/images/patterns/mughal-gold.svg',
    '/images/patterns/vintage-floral.svg',
    '/images/patterns/royal-block.svg',
  ],
};

export default function CustomPrintLabPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="py-24 md:py-32">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-8">Custom Print Lab</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create your own personalized luxury items. Click on patterns to see live preview, then add to cart.
            </p>
          </div>

          {/* Custom Print Lab Component */}
          <CustomPrintLab product={SAMPLE_PRODUCT} />
        </Container>
      </section>
    </div>
  );
}
