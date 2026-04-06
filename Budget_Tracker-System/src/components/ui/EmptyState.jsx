import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import './EmptyState.css';

/**
 * EmptyState component for lists and tables
 * @param {string} title - Heading
 * @param {string} description - Supporting text
 * @param {node} icon - Optional icon component override
 * @param {node} action - Optional button/link action component
 */
const EmptyState = ({ title, description, icon: Icon = Search, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="empty-state"
    >
      <div className="empty-state__icon-wrapper">
        <Icon size={40} className="empty-state__icon" strokeWidth={1.5} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
