import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function AnimatedSection({ children, delay = 0, direction = 'up', style, className }) {
  const [ref, inView] = useInView();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
