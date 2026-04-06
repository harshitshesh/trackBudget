import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useStore from '../../store/useStore';
import Button from './Button';
import './ThemeToggle.css';

/**
 * Theme toggle switch for dark/light mode
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="theme-toggle__icon theme-toggle__icon--moon" />
      ) : (
        <Sun size={20} className="theme-toggle__icon theme-toggle__icon--sun" />
      )}
    </Button>
  );
};

export default ThemeToggle;
