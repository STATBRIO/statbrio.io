import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once !== false) {
          observer.unobserve(entry.target);
        }
      } else if (options.once === false) {
        setInView(false);
      }
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px',
    });

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return [ref, inView];
}
