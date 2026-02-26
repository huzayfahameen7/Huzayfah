import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'EB-GJ-001',
    name: 'Premium Embroidered Lawn',
    shortDescription: 'Golden jasmine-inspired hand-block printed Lawn suit with intricate embroidery.',
    price: 299,
    description: 'A luxurious hand-block printed suit featuring intricate golden motifs on premium fabric. Perfect for weddings and special occasions, this piece embodies elegance and traditional craftsmanship.',
    fabric: 'Lawn',
    images: ['/product-images/product-1.jpg'],
    category: 'Unstitched',
    blockPrintType: 'Traditional Hand-Block Print'
  },
  {
    id: '2',
    sku: 'EB-AB-002',
    name: 'Regal Karandi Ensemble',
    shortDescription: 'Stunning azure blue Karandi hand-block printed ensemble with luxe detailing.',
    price: 349,
    description: 'Stunning azure blue hand-block printed ensemble with delicate floral patterns. Crafted from the finest Karandi fabric, this suit offers both comfort and sophistication.',
    fabric: 'Karandi',
    images: ['/product-images/product-2.jpg'],
    category: 'Ready-to-wear',
    blockPrintType: 'Artisan Block Print'
  },
  {
    id: '3',
    sku: 'EB-CR-003',
    name: 'Crimson Rose Luxury Lawn',
    shortDescription: 'Bold crimson cotton hand-block printed suit with rose-inspired embroidery.',
    price: 279,
    description: 'Bold crimson hand-block printed suit adorned with rose motifs. Made from breathable cotton, this piece is ideal for festive occasions and everyday luxury.',
    fabric: 'Cotton',
    images: ['/product-images/product-3.jpg'],
    category: 'Unstitched',
    blockPrintType: 'Heritage Block Print'
  },
  {
    id: '4',
    sku: 'EB-EV-004',
    name: 'Emerald Chiffon Collection',
    shortDescription: 'Elegant emerald green Lawn hand-block printed suit with chiffon-inspired flow.',
    price: 399,
    description: 'Elegant emerald green hand-block printed suit with intricate vine patterns. Premium Lawn fabric ensures comfort while the traditional printing technique adds timeless appeal.',
    fabric: 'Lawn',
    images: ['/product-images/product-4.jpg'],
    category: 'Ready-to-wear',
    blockPrintType: 'Master Craft Block Print'
  },
  {
    id: '5',
    sku: 'EB-SW-005',
    name: 'Sapphire Couture Series',
    shortDescription: 'Mesmerizing sapphire blue Karandi hand-block printed suit with couture detailing.',
    price: 329,
    description: 'Mesmerizing sapphire blue hand-block printed suit featuring wave patterns. Crafted from soft Karandi fabric, this ensemble is perfect for both formal and semi-formal events.',
    fabric: 'Karandi',
    images: ['/product-images/product-5.jpg'],
    category: 'Unstitched',
    blockPrintType: 'Contemporary Block Print'
  },
  {
    id: '6',
    sku: 'EB-AS-006',
    name: 'Amber Royal Edition',
    shortDescription: 'Warm amber cotton hand-block printed suit inspired by royal sunset hues.',
    price: 359,
    description: 'Warm amber hand-block printed suit inspired by sunset hues. Made from premium cotton with traditional block printing techniques, this piece radiates warmth and elegance.',
    fabric: 'Cotton',
    images: ['/product-images/product-6.jpg'],
    category: 'Ready-to-wear',
    blockPrintType: 'Classic Block Print'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};