import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll kun til toppen, hvis der ikke er et hash i URL'en
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Hvis der er et hash, find det specifikke element og scroll til det
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]); // Tilføj hash som dependency

  return null;
};

export default ScrollToTop;