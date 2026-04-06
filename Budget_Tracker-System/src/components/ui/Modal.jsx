import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';
import './Modal.css';

/**
 * Modal component for forms, confirmations, etc.
 * @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Close callback
 * @param {string} title - Modal heading
 * @param {node} children - Modal content
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          <div className="modal-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`modal-content modal-content--${size}`}
            >
              <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <Button variant="ghost" size="sm" onClick={onClose} className="btn--close">
                  <X size={20} />
                </Button>
              </div>
              <div className="modal-body">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
