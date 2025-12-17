import React, { useState } from 'react';

const PurchasedServiceSearchFilter = ({ services, onSearchAndFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applySearchAndFilter(term, selectedFilter);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    applySearchAndFilter(searchTerm, filter);
  };

  const applySearchAndFilter = (search, filter) => {
    let filtered = [...services];

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(service => 
        service.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        service.provider.toLowerCase().includes(search.toLowerCase()) ||
        service.petName.toLowerCase().includes(search.toLowerCase()) ||
        service.orderId.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    switch (filter) {
      case 'pending_review':
        filtered = filtered.filter(s => !s.reviewed && s.status === 'completed');
        break;
      case 'reviewed':
        filtered = filtered.filter(s => s.reviewed);
        break;
      case 'pet_grooming':
        filtered = filtered.filter(s => s.serviceType === 'Pet Grooming');
        break;
      case 'veterinary_care':
        filtered = filtered.filter(s => s.serviceType === 'Veterinary Care');
        break;
      case 'pet_boarding':
        filtered = filtered.filter(s => s.serviceType === 'Pet Boarding');
        break;
      case 'dog_walking':
        filtered = filtered.filter(s => s.serviceType === 'Dog Walking');
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    onSearchAndFilter(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    onSearchAndFilter(services);
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter-wrapper">
        
        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search services, providers, pets, or order ID..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {searchTerm && (
              <button onClick={clearSearch} className="clear-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="filter-dropdown">
          <select 
            value={selectedFilter} 
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Services</option>
            <option value="pending_review">Pending Review</option>
            <option value="reviewed">Reviewed</option>
            <option value="pet_grooming">Pet Grooming</option>
            <option value="veterinary_care">Veterinary Care</option>
            <option value="pet_boarding">Pet Boarding</option>
            <option value="dog_walking">Dog Walking</option>
          </select>
          <div className="select-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

      </div>
      
      {/* Search Results Info */}
      {(searchTerm || selectedFilter !== 'all') && (
        <div className="search-info">
          <p>
            {searchTerm && `Searching for "${searchTerm}"`}
            {searchTerm && selectedFilter !== 'all' && ' • '}
            {selectedFilter !== 'all' && `Filtered by ${selectedFilter.replace('_', ' ')}`}
          </p>
          <button onClick={clearSearch} className="clear-all">Clear All</button>
        </div>
      )}
    </div>
  );
};

export default PurchasedServiceSearchFilter;