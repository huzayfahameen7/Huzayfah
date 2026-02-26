import React from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}` as const;

  const baseLuxuryStyle = 'font-serif text-charcoal font-semibold';

  const sizes: Record<number, string> = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  };

  return (
    <Tag className={`${baseLuxuryStyle} ${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
