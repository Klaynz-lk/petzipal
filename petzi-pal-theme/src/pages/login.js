import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";

function loginPage() {
  return (
    <>
      <Layout>
        <Breadcrumb pageName="Login" pageTitle="Login" />
        <div className="login-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Log In</h3>
                    <p>
                      New Member?{" "}
                      <Link legacyBehavior href="/sign-up">
                        <a>signup here</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Username *</label>
                          <input type="email" placeholder="Enter Your Username" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Password *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Your Password"
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input type="checkbox" id="html" />
                            <label htmlFor="html">
                              I agree to the <a href="#">Terms &amp; Policy</a>
                            </label>
                          </div>
                          <a href="#" className="forgot-pass">
                            Forgotten Password
                          </a>
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Log in</button>
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

export default loginPage;
