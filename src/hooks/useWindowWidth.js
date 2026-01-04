import { useState, useEffect } from 'react';

// Get current window width.
const get_win_width = () => {
  return typeof window === 'undefined' ? 0 : window.innerWidth;
};

// Custom Hook: Encapsulates reusable logic for tracking window size.
// Returns the current width and updates whenever it changes.
export default function useWindowWidth() {
  // useState: 'width' stores current value, 'set_width' updates it and triggers re-renders.
  const [width, set_width] = useState(get_win_width());

  // useEffect: Adds event listener after component mounts.
  useEffect(() => {
    function handle_resize() {
      set_width(get_win_width());
    }

    window.addEventListener('resize', handle_resize);
    
    // Cleanup Function: React runs this when component unmounts.
    // Removes listener to prevent memory leaks.
    return () => window.removeEventListener('resize', handle_resize);
  }, []);

  return width;
}
