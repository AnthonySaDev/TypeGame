import React, { forwardRef } from 'react';
import './styles.css'
interface CardProps {
  char: string;
  isActive: boolean;
  isCorrect: string;
}

const Card: React.ForwardRefRenderFunction<HTMLSpanElement, CardProps> = ({ char, isActive, isCorrect }, ref) => {
  return (
    <span 
    className={`card ${isActive ? 'active' : ''} ${isCorrect}`} 
    ref={ref}
    >
      {char}
    </span>
  );
};

export default forwardRef(Card);
