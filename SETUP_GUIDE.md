# 🚀 Getting Started - Elegance by Mahnoor Phase 2

## Installation & Setup

### Step 1: Install Node.js
If you haven't installed Node.js yet:
1. Visit https://nodejs.org/
2. Download LTS version
3. Install and restart your computer

### Step 2: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## Project Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type check with TypeScript
npm run type-check
```

---

## Navigation Features

### Desktop View
- Fixed glassmorphism navigation bar
- Full navigation menu visible
- Shopping cart icon always accessible
- Smooth scroll blur effect

### Mobile View
- Hamburger menu button
- Full-screen menu overlay on tap
- All navigation links in mobile menu
- Animated backdrop blur

### Scroll Effects
- Navigation becomes more opaque as you scroll
- Blur effect increases with scroll
- Gold gradient border appears
- All animations are smooth and performant

---

## Component Structure

### Navigation.tsx
Main navigation bar component with:
- Logo
- Desktop links
- Mobile hamburger
- Cart icon
- Scroll detection

### MobileMenu.tsx
Mobile menu panel with:
- Links list
- Menu animation
- Close backdrop
- CTA button

### Pages
- `/` - Home with hero section
- `/new-arrivals` - New products showcase
- `/custom-print-lab` - Custom design lab
- `/our-story` - Brand story

---

## Styling System

### Using the Theme
```tsx
import { colors, typography } from '@/lib/theme';
```

### Color Variables (CSS)
```css
var(--color-ivory)      /* #F9F8F1 */
var(--color-gold)       /* #D4AF37 */
var(--color-charcoal)   /* #333333 */
```

### Tailwind Classes
```tsx
className="bg-gold text-charcoal hover:bg-gold-dark"
```

### Glassmorphism
```tsx
className="glass"        /* Full glassmorphism */
className="glass-sm"     /* Less blur */
className="glass-lg"     /* More blur */
```

---

## Animations

All animations use Framer Motion. Examples:

### Button Animation
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Scroll Animation
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content appears on scroll
</motion.div>
```

---

## Troubleshooting

### npm command not found
- Make sure Node.js is installed
- Restart VS Code
- Add Node.js to PATH if on Windows

### Navigation not showing
- Make sure `Navigation` is imported in `layout.tsx`
- Clear `.next` folder and rebuild

### Styles not applying
- Run `npm install` again
- Restart dev server
- Clear browser cache

---

## Next: Phase 3 Features

Coming soon:
- Product catalog page
- Product grid with filtering
- Product detail pages
- Shopping cart functionality
- Image optimization

---

Need help? Check the files:
- `PHASE_2_SUMMARY.md` - Detailed Phase 2 overview
- `.github/copilot-instructions.md` - Full project guide
- `README.md` - General documentation
