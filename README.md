# Elegance by Mahnoor - Luxury Brand E-commerce

A modern, elegant e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Designed for luxury brands with a sophisticated aesthetic.

## 🎨 Color Palette

- **Ivory**: `#F9F8F1` - Primary background
- **Gold**: `#D4AF37` - Accent color for luxury feel
- **Charcoal**: `#333333` - Primary text color
- **Light Gold**: `#E8D5B7` - Secondary accent
- **Dark Gold**: `#B8960A` - Hover states

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Home page with hero section
├── components/          # Reusable React components
│   ├── Button.tsx       # Animated button component
│   ├── Container.tsx    # Layout container
│   ├── Heading.tsx      # Typography component
│   ├── Header.tsx       # Navigation header
│   └── index.ts         # Component exports
├── hooks/              # Custom React hooks
│   ├── useScroll.ts    # Scroll position hook
│   └── index.ts        # Hook exports
├── lib/                # Utility functions and constants
│   ├── theme.ts        # Theme configuration and design tokens
│   └── index.ts        # Library exports
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types (Product, User, CartItem)
└── styles/             # Global CSS
    └── globals.css     # Tailwind CSS with custom utilities

public/                 # Static assets (images, icons, etc.)

Configuration Files:
- tsconfig.json         # TypeScript configuration
- tailwind.config.js    # Tailwind CSS configuration
- next.config.js        # Next.js configuration
- postcss.config.js     # PostCSS configuration
- package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/elegance-by-mahnoor.git
cd elegance-by-mahnoor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Features

### Components
- **Button** - Animated button with multiple variants (primary, secondary, outline)
- **Container** - Responsive container component
- **Heading** - Typography component with luxury serif fonts
- **Header** - Navigation header with logo and links

### Hooks
- **useScroll** - Custom hook for tracking scroll position and scroll state

### Theme System
- CSS custom properties for colors, spacing, typography
- Tailwind CSS configuration with luxury colors
- Design tokens for consistent styling

### Animations
- Framer Motion integration for smooth transitions
- Staggered animations on component mount
- Scroll-triggered animations
- Hover effects on interactive elements

## 🎨 Customization

### Adding New Colors
1. Update CSS variables in `src/styles/globals.css`
2. Add colors to `src/lib/theme.ts`
3. Extend colors in `tailwind.config.js`

### Creating New Components
1. Create component file in `src/components/`
2. Use the `'use client'` directive if needed
3. Export from `src/components/index.ts`

### Adding New Pages
1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Styling and animations work automatically with Tailwind

## 📱 Responsive Design

The project is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Headers

Next.js is configured with security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Elegance by Mahnoor - Premium Luxury Brand

---

Built with ✨ elegance and precision.
