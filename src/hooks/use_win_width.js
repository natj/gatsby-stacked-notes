import { useState, useEffect } from 'react';

// Get current window width.
const get_win_width = () => {
  return typeof window === 'undefined' ? 0 : window.innerWidth;
};

// Provides current window width to components.
export default function use_win_width() {
  const [width, set_width] = useState(get_win_width());

  useEffect(() => {
    function handle_resize() {
      set_width(get_win_width());
    }

    window.addEventListener('resize', handle_resize);
    
    // Cleanup event listener on unmount.
    return () => window.removeEventListener('resize', handle_resize);
  }, []);

  return width;
}
