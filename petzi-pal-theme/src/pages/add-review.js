import React from 'react';
import Layout from '../layout/Layout';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import AddReviewForm from '../components/review/AddReviewForm';
import ReviewFormInfo from '../components/review/ReviewFormInfo';

const AddReview = () => {
  return (
    <Layout>
      <Breadcrumb pageName="Add Review" pageTitle="Add Review" />
      
      <section className="review-section">
        <div className="container-fluid">
          <div className="review-wrapper">
            <div className="review-sidebar">
              <ReviewFormInfo />
            </div>
            <div className="review-form-area">
              <AddReviewForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AddReview;
