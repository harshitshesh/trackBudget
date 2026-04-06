/* ==========================================================
   CARD COMPONENT — Reusable Card Wrapper
   
   Yeh ek generic card component hai jo glass-morphism effect
   ke saath kisi bhi content ko wrap kar sakta hai.
   
   Props:
   - children: Card ke andar ka content
   - className: Extra CSS classes
   - hoverable: Hover effect enable/disable (default: true)
   - style: Inline styles override
   ========================================================== */

import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ children, className = '', hoverable = true, style = {}, onClick }) => {
  return (
    <motion.div
      // Framer Motion animation — card fade in + slide up on mount
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`card ${hoverable ? 'card--hoverable' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
