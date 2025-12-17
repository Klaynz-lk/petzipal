import React from 'react';

const PurchasedServiceStats = ({ services }) => {
  const totalServices = services.length;
  const completedServices = services.filter(s => s.status === 'completed').length;
  const totalSpent = services.reduce((sum, service) => sum + service.price, 0);
  const reviewedServices = services.filter(s => s.reviewed).length;

  return (
    <div className="purchased-stats">
      <div className="stats-grid">
        <div className="stat-item">
          <h3>{totalServices}</h3>
          <p>Total Services</p>
        </div>
        <div className="stat-item">
          <h3>{completedServices}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-item">
          <h3>LKR {totalSpent.toLocaleString()}</h3>
          <p>Total Spent</p>
        </div>
        <div className="stat-item">
          <h3>{reviewedServices}</h3>
          <p>Reviewed</p>
        </div>
      </div>
    </div>
  );
};

export default PurchasedServiceStats;