import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  BarChart3, 
  LogOut,
  Wallet
} from 'lucide-react';
import useStore from '../../store/useStore';
import './Sidebar.css';

/**
 * Navigation Sidebar component with logo and menu items
 */
const Sidebar = () => {
  const { activePage, setActivePage } = useStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <Wallet size={24} />
        </div>
        <h1 className="sidebar__logo-text">Finance<span>Flow</span></h1>
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__menu">
          <span className="sidebar__menu-label">Main Menu</span>
          <ul className="sidebar__list">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar__item">
                <button
                  className={`sidebar__link ${activePage === item.id ? 'sidebar__link--active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <item.icon size={20} className="sidebar__link-icon" />
                  <span className="sidebar__link-text">{item.label}</span>
                  {activePage === item.id && <div className="sidebar__indicator" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__logout">
          <LogOut size={20} className="sidebar__logout-icon" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
