import React from 'react';
import Link from 'next/link';

const PurchasedServiceCard = ({ service }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`review-star ${i <= rating ? 'filled' : ''}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="purchased-service-card">
      <div className="service-image">
        <img src={service.image} alt={service.serviceName} />
      </div>
      
      <div className="service-content">
        <div className="service-header">
          <h4>{service.serviceName}</h4>
          <span className="order-id">#{service.orderId}</span>
        </div>
        
        <div className="service-details">
          <p><strong>Provider:</strong> {service.provider}</p>
          <p><strong>Pet:</strong> {service.petName} ({service.petType})</p>
          <p><strong>Date:</strong> {formatDate(service.date)} at {service.time}</p>
          <p><strong>Status:</strong> 
            <span className={`status ${service.status}`}>{service.status}</span>
          </p>
        </div>
        
        <div className="service-footer">
          <div className="price">
            <span>LKR {service.price.toLocaleString()}</span>
          </div>
          
          <div className="actions">
            {!service.reviewed && service.status === 'completed' && (
              <Link href="/add-review" className="review-btn">
                Add Review
              </Link>
            )}
            {service.reviewed && (
              <div className="review-stars-display">
                <div className="stars-wrapper">
                  {renderStars(service.rating)}
                </div>
                <span className="rating-text">({service.rating}/5)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedServiceCard;