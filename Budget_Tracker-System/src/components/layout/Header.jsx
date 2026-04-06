import React from 'react';
import { Search, User, ChevronDown, Bell } from 'lucide-react';
import useStore from '../../store/useStore';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
import { ROLES } from '../../data/mockData';
import './Header.css';

/**
 * Top Header component containing search, role toggle, theme switch and profile
 */
const Header = () => {
  const { role, setRole, filters, setFilter } = useStore();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSearchChange = (e) => {
    setFilter('search', e.target.value);
  };

  return (
    <header className="header">
      <div className="header__inner">
        {/* Search Bar - Integrated with data filters */}
        <div className="header__search">
          <Search size={18} className="header__search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={handleSearchChange}
            className="header__search-input"
          />
        </div>

        {/* Action Elements - Role, Theme, Notifications etc */}
        <div className="header__actions">
       
          <Button variant="ghost" size="sm" className="header__icon-btn">
            <Bell size={20} />
            <span className="header__notification-dot" />
          </Button>

          {/* Theme Switcher */}
          <ThemeToggle />

          <div className="header__divider" />

          <div className="header__role-select">
            <select 
              value={role} 
              onChange={handleRoleChange} 
              className="header__role-dropdown"
              title="Role Switcher"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label} View
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="header__select-chevron" />
          </div>

          <div className="header__user-profile">
            <div className="header__user-avatar">
              <User size={18} />
            </div>
            <div className="header__user-info">
              <span className="header__user-name">Professional User</span>
              <span className="header__user-role">{role.charAt(0).toUpperCase() + role.slice(1)} Access</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
