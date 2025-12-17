import React from 'react';

const ReviewFormInfo = () => {
  return (
    <div className="review-info-wrapper">
      <div className="review-info-card">
        <h3>Review Guidelines</h3>
        <div className="info-item">
          <div className="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="info-content">
            <p><strong>5 Stars:</strong> Exceptional service</p>
            <p><strong>4 Stars:</strong> Very good experience</p>
            <p><strong>3 Stars:</strong> Good, meets expectations</p>
            <p><strong>2 Stars:</strong> Below average</p>
            <p><strong>1 Star:</strong> Poor service</p>
          </div>
        </div>
      </div>

      <div className="review-info-card">
        <h3>Review Tips</h3>
        <div className="info-item">
          <div className="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="info-content">
            <p>• Be honest and specific about your experience</p>
            <p>• Mention staff behavior and service quality</p>
            <p>• Include details about cleanliness and facilities</p>
            <p>• Help other pet owners make informed decisions</p>
          </div>
        </div>
      </div>

      <div className="review-info-card">
        <h3>What to Include</h3>
        <div className="info-item">
          <div className="icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="info-content">
            <p>• Quality of pet care received</p>
            <p>• Waiting time and appointment scheduling</p>
            <p>• Staff professionalism and friendliness</p>
            <p>• Value for money and pricing</p>
            <p>• Overall recommendation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormInfo;
