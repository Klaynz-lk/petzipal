import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";

function Contact() {
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
                    <form>
                      <div className="row">
                        <div className="col-lg-12 mb-40">
                          <div className="form-inner">
                            <input type="text" placeholder="Enter your name" />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-40">
                          <div className="form-inner">
                            <input type="text" placeholder="Enter your email" />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-40">
                          <div className="form-inner">
                            <input type="text" placeholder="Subject" />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-40">
                          <div className="form-inner">
                            <textarea
                              placeholder="Your message"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-inner">
                            <button className="primary-btn1">
                              Send Message <i className="bi bi-arrow-right" />
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
