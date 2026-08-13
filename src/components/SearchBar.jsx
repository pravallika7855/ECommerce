import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

/**
 * SearchBar Component
 * Search input and sort controls wrapper.
 * Receives `searchTerm`, `onSearchChange`, `sortOption`, and `onSortChange` via props.
 */
const SearchBar = ({
  searchTerm = '',
  onSearchChange,
  sortOption = 'default',
  onSortChange
}) => {
  return (
    <div className="search-filter-bar">
      {/* Search Input Box */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search products by title or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Sort Select Controls */}
      <div className="sort-select-wrapper">
        <ArrowUpDown size={18} style={{ color: 'var(--text-muted)' }} />
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
