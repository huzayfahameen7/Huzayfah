import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ToastProvider } from '@/contexts/ToastContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Elegance By Mahnoor | Bespoke Hand-Block Artistry',
  description:
    'Elegance By Mahnoor celebrates bespoke hand-block artistry with premium lawns, organzas and silks, crafted in small batches by traditional artisans.',
  keywords: 'bespoke, hand-block, luxury, elegance, premium, fashion, Pakistan',
  authors: [{ name: 'Elegance by Mahnoor' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@400;600;700&family=League+Spartan:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23121212'/%3E%3Ctext x='50%25' y='56%25' text-anchor='middle' font-family='Georgia,serif' font-size='40' fill='%23D4AF37'%3EE%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body className="bg-[#FFDFB9] text-charcoal">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <CartDrawer />
              <FloatingWhatsAppButton />
              <main>
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
