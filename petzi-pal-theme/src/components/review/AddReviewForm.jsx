import React, { useState } from 'react';

const AddReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      rating: rating
    });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', formData);
    // Add your submission logic here
    alert('Review submitted successfully!');
    setFormData({ name: '', email: '', rating: 5, message: '' });
    setHoverRating(0);
  };
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${(hoverRating || formData.rating) >= i ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-form-container">
      <h2 className="review-form-title">Share Your Experience</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-row">
          <div className="form-group full-width">
            <label className="field-label">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label className="field-label">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group full-width">
            <label className="field-label">Rating</label>
            <div className="star-rating">
              {renderStars()}
              <span className="rating-text">({formData.rating} out of 5)</span>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your review message"
              rows="6"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-row">
          <button type="submit" className="submit-btn">
            Send Review 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
