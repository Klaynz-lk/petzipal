import Link from "next/link";
import React, { useState } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";

function signUpPage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Layout>
        <Breadcrumb pageName="Sign-Up" pageTitle="Sign-Up" />
        <div className="signup-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Sign Up</h3>
                    <p>
                      Do you already have an account?{" "}
                      <Link legacyBehavior href="/login">
                        <a>Log in here</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Frist Name *</label>
                          <input type="email" placeholder="Enter Frist Name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Last Name *</label>
                          <input type="email" placeholder="Enter Last Name" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Email *</label>
                          <input type="email" placeholder="Enter Your Email" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Number *</label>
                          <input
                            type="number"
                            placeholder="Enter Your Number"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-inner">
                          <label>Profile Picture</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        {image && (
                          <img
                            src={image}
                            alt="Profile Preview"
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: "80px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Address *</label>
                          <input
                            type="address"
                            placeholder="Enter Your Address"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Password *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Create A Password"
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Confirm Password *</label>
                          <input
                            type="password"
                            name="password"
                            id="password2"
                            placeholder="Confirm Password"
                          />
                          <i className="bi bi-eye-slash" id="togglePassword2" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input type="checkbox" id="html" />
                            <label htmlFor="html">
                              I agree to the Terms &amp; Policy
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Create Account</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>or signup WITH</h6>
                    <div className="btn-group gap-4">
                      <a
                        href="#"
                        className="eg-btn google-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-google" />
                        <span>signup whit google</span>
                      </a>
                    </div>
                  </div>
                  <div className="form-poicy-area">
                    <p>
                      By clicking the "signup" button, you create a PetziPal
                      account, and you agree to PetziPal's{" "}
                      <a href="#">Terms &amp; Conditions</a> &amp;{" "}
                      <a href="#">Privacy Policy.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default signUpPage;
