import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { loginUser, isAuthenticated } from "../utils/authUtils";

function loginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Debug: Log the form data being sent (password as plain text)
      console.log('Login data being sent:', {
        username: formData.username,
        password: formData.password // Plain text password
      });

      const result = await loginUser(formData);

      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setSubmitStatus({ type: 'error', message: result.error });
      }
    } catch (error) {
      console.error('Login error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred during login. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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

                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Username *</label>
                          <input 
                            type="text" 
                            name="username"
                            placeholder="Enter Your Username" 
                            value={formData.username}
                            onChange={handleInputChange}
                            className={errors.username ? 'is-invalid' : ''}
                          />
                          {errors.username && <div className="text-danger small mt-1">{errors.username}</div>}
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
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? 'is-invalid' : ''}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                          {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="forgot-pass">
                            Forgotten Password
                          </a>
                        </div>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="account-btn"
                      disabled={isSubmitting}
                      style={{ 
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
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