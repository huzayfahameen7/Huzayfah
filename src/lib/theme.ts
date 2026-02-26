/**
 * Elegance by Mahnoor - Global Theme Configuration
 * Luxury brand color palette and design tokens
 */

export const colors = {
  primary: {
    ivory: '#F9F8F1',
    gold: '#D4AF37',
    charcoal: '#333333',
  },
  secondary: {
    lightGray: '#F5F5F5',
    mediumGray: '#888888',
    darkGray: '#1A1A1A',
  },
  accents: {
    gold: '#D4AF37',
    lightGold: '#E8D5B7',
    darkGold: '#B8960A',
  },
};

export const typography = {
  fontFamily: {
    serif: "'Georgia', 'Garamond', serif",
    sans: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

export const theme = {
  colors,
  typography,
  spacing,
};

export default theme;
