import React, { useState } from 'react';

const PurchasedServiceFilter = ({ services, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const filterCounts = {
    all: services.length,
    pending_review: services.filter(s => !s.reviewed && s.status === 'completed').length,
    reviewed: services.filter(s => s.reviewed).length
  };

  return (
    <div className="purchased-filter">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Services ({filterCounts.all})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'pending_review' ? 'active' : ''}`}
          onClick={() => handleFilterChange('pending_review')}
        >
          Pending Review ({filterCounts.pending_review})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'reviewed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('reviewed')}
        >
          Reviewed ({filterCounts.reviewed})
        </button>
      </div>
    </div>
  );
};

export default PurchasedServiceFilter;