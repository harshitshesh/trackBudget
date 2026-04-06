import React from 'react';
import { Filter, X, Search, ChevronDown } from 'lucide-react';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockData';
import './TransactionFilters.css';
import Button from '../ui/Button';

/**
 * TransactionFilters component for searching, filtering, and sorting transactions
 */
const TransactionFilters = () => {
  const { filters, setFilter, clearFilters } = useStore();

  const handleTypeChange = (type) => {
    setFilter('type', type);
  };

  const handleCategoryChange = (e) => {
    setFilter('category', e.target.value);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('-');
    setFilter('sortField', field);
    setFilter('sortOrder', order);
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.type !== 'all' || 
    filters.category !== 'all' || 
    filters.dateFrom !== '' || 
    filters.dateTo !== '';

  return (
    <div className="transaction-filters">
      <div className="filters-row">
        {/* Type Toggles */}
        <div className="type-toggle">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              className={`type-toggle__btn ${filters.type === t ? 'type-toggle__btn--active' : ''}`}
              onClick={() => handleTypeChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="filter-select-wrapper">
          <select 
            className="filter-select" 
            value={filters.category} 
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {Object.keys(CATEGORIES).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown size={14} className="select-chevron" />
        </div>

        {/* Sorting Dropdown */}
        <div className="filter-select-wrapper">
          <select 
            className="filter-select" 
            value={`${filters.sortField}-${filters.sortOrder}`} 
            onChange={handleSortChange}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
            <option value="description-asc">A-Z</option>
          </select>
          <ChevronDown size={14} className="select-chevron" />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="btn--clear-filters"
            icon={X}
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Search Input - Desktop focus */}
      <div className="search-filter-mobile">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search descriptions..." 
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />
      </div>
    </div>
  );
};

export default TransactionFilters;
