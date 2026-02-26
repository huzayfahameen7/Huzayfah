import { useCallback, useEffect, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
    });
    setIsScrolling(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleScrollEnd = () => {
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScrollEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return { scrollPosition, isScrolling };
};

export default useScroll;
