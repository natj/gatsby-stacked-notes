import { useState, useEffect } from 'react';

// Monitor window resize and return the current width.
const useWindowWidth = (): number => {
  // Initialize with a safe default (Desktop-ish) for SSR consistency.
  const [width, set_width] = useState<number>(1200);

  useEffect(() => {
    // Only access 'window' inside useEffect (client-side only).
    const handle_resize = () => set_width(window.innerWidth);
    
    set_width(window.innerWidth);
    window.addEventListener('resize', handle_resize);
    
    return () => window.removeEventListener('resize', handle_resize);
  }, []);

  return width;
};

export default useWindowWidth;