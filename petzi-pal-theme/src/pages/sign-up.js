import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { 
  registerUser, 
  convertImageToBase64, 
  validateEmail, 
  validatePassword, 
  validatePhoneNumber 
} from "../utils/authUtils";

function signUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    contact_number: '',
    address: '',
    password: '',
    confirmPassword: '',
    role_id: 0, // This value will be sent
    has_provider_access: false
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureBase64, setProfilePictureBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      try {
        const base64 = await convertImageToBase64(file);
        setProfilePictureBase64(base64);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Error processing image'
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Contact number validation
    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!validatePhoneNumber(formData.contact_number)) {
      newErrors.contact_number = 'Please enter a valid phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const userData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        contact_number: formData.contact_number,
        address: formData.address,
        password: formData.password,
        has_provider_access: formData.has_provider_access,
        role_id: formData.role_id, // <-- THIS IS THE CORRECTED LINE
        ...(profilePictureBase64 && { profile_picture: profilePictureBase64 })
      };

      const result = await registerUser(userData);

      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Account created successfully! Redirecting to login...' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setSubmitStatus({ type: 'error', message: result.error });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred during registration. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
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
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Full Name *</label>
                          <input 
                            type="text" 
                            name="name"
                            placeholder="Enter Your Full Name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            className={errors.name ? 'is-invalid' : ''}
                          />
                          {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
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
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Email *</label>
                          <input 
                            type="email" 
                            name="email"
                            placeholder="Enter Your Email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'is-invalid' : ''}
                          />
                          {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Contact Number *</label>
                          <input
                            type="tel"
                            name="contact_number"
                            placeholder="Enter Your Number"
                            value={formData.contact_number}
                            onChange={handleInputChange}
                            className={errors.contact_number ? 'is-invalid' : ''}
                          />
                          {errors.contact_number && <div className="text-danger small mt-1">{errors.contact_number}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Profile Picture</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {errors.profilePicture && <div className="text-danger small mt-1">{errors.profilePicture}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        {profilePicture && (
                          <div className="text-center mb-3">
                            <img
                              src={profilePicture}
                              alt="Profile Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                border: "2px solid #ddd"
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Address *</label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Enter Your Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={errors.address ? 'is-invalid' : ''}
                          />
                          {errors.address && <div className="text-danger small mt-1">{errors.address}</div>}
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
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? 'is-invalid' : ''}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                          {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Confirm Password *</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="password2"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={errors.confirmPassword ? 'is-invalid' : ''}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword2" />
                          {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input 
                              type="checkbox" 
                              id="providerAccess"
                              name="has_provider_access"
                              checked={formData.has_provider_access}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="providerAccess">
                              I want to provide services (Provider Access)
                            </label>
                          </div>
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
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
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

export default signUpPage;