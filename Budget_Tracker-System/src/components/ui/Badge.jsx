import React from 'react';
import './Badge.css';

/**
 * Badge component for statuses, categories, etc.
 * @param {string} type - 'income', 'expense', 'info', 'warning', 'primary', 'neutral'
 * @param {string} children - Label text
 * @param {string} className - Override or additional styles
 */
const Badge = ({ children, type = 'neutral', className = '', style = {} }) => {
  return (
    <span className={`badge badge--${type} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Badge;
