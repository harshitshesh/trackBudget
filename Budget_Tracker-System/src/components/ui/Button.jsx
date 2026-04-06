import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Reusable Button component with different variants and framer-motion animations
 * @param {string} variant - 'primary', 'secondary', 'danger', 'ghost', 'outline'
 * @param {string} size - 'sm', 'md', 'lg'
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  fullWidth = false,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} className="btn__icon" />}
      <span className="btn__text">{children}</span>
    </motion.button>
  );
};

export default Button;
