import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import './styles.css'
interface CardProps {
  char: string;
  isActive: boolean;
  isCorrect: string;
}

const Card: React.ForwardRefRenderFunction<HTMLSpanElement, CardProps> = ({ char, isActive, isCorrect }, ref) => {
  return (
    <motion.span 
    className={`card ${isActive ? 'active' : ''} ${isCorrect}`} 
    ref={ref}
    initial={{ rotate: 0 }}
    animate={{ rotate: isActive ? [0, -5, 0, 5, 0] : 0 }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    >
      {char}
    </motion.span>
  );
};

export default forwardRef(Card);
