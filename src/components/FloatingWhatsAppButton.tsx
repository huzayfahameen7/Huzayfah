'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Asalam-o-Alaikum! Welcome to Elegance By Mahnoor. How can I help you today?'
    );
    window.open(`https://wa.me/923120026897?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-colors"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.div>
  );
}
