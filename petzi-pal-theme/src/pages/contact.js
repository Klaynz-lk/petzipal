import React, { useState } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Layout>
      <Breadcrumb pageName="Contact Us" pageTitle="Contact Us" />
      <>
        <div>
          <div className="contact-pages pt-120 mb-120">
            <div className="container">
              <div className="row align-items-center g-lg-4 gy-5">
                <div className="col-lg-5">
                  <div className="contact-left">
                    <div className="hotline mb-80">
                      <h3>Call Us Now</h3>
                      <div className="icon">
                        <img src="assets/images/icon/phone-icon4.svg" alt="" />
                      </div>
                      <div className="info">
                        <h6>
                          <a href="tel:+012-3456-789102">+012-3456-789102</a>
                        </h6>
                        <h6>
                          <a href="tel:+012-3456-789102">+012-3456-789102</a>
                        </h6>
                      </div>
                    </div>
                    <div className="location">
                      <h3>Call Us Now</h3>
                      <div className="icon">
                        <img src="assets/images/icon/location4.svg" alt="" />
                      </div>
                      <div className="info">
                        <h6>
                          <a href="#">
                            168/170, Ave 01, Mirpur,
                            <br />
                            Dhaka, Bangladesh
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-form">
                    <h2>Have Any Questions</h2>
                    
                    {submitStatus && (
                      <div 
                        className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '4px',
                          backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                          color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                          border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                        }}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12 mb-40">
                          <div className="form-inner">
                            <input 
                              type="text" 
                              name="name"
                              placeholder="Enter your name" 
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-40">
                          <div className="form-inner">
                            <input 
                              type="email" 
                              name="email"
                              placeholder="Enter your email" 
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-40">
                          <div className="form-inner">
                            <input 
                              type="text" 
                              name="subject"
                              placeholder="Subject" 
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-40">
                          <div className="form-inner">
                            <textarea
                              name="message"
                              placeholder="Your message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="5"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-inner">
                            <button 
                              type="submit"
                              className="primary-btn1"
                              disabled={isSubmitting}
                              style={{ 
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                              }}
                            >
                              {isSubmitting ? 'Sending...' : 'Send Message'} 
                              <i className="bi bi-arrow-right" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default Contact;
