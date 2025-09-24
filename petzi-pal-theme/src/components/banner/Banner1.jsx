import Link from "next/link";
import React from "react";
import Morphext from "../morphext/Morphext";

function Banner1() {
  const phrases = ["Cart .", "Dog .", "Cat ."];
  return (
    <div className="hero-style-1">
      <div className="container pt-120">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-xxl-8 d-flex align-items-center">
                <div className="banner-content ">
                  <div className="tag">
                    <ul>
                      <li>Trustworthy</li>
                      <li>Safely</li>
                      <li>Loyalty</li>
                    </ul>
                  </div>
                  <h1 className="mb-5">
                    To Ensure Perfect
                    <br /> Service Of Your{" "}
                    <Morphext
                      animation="fadeInLeft"
                      speed="3000"
                      phrases={phrases}
                    />
                  </h1>
                  <div className="reservation-review">
                    <div className="reservation-btn">
                      <Link legacyBehavior href="/services">
                        <a className="primary-btn1">Explore More</a>
                      </Link>
                    </div>
                  </div>
                  <h5 className="col-12 banner-desc">
                    Welcome to PetziPal—your trusted partner in pet care!
                    Whether you have a playful pup, a curious cat, or any furry
                    friend, we make pet parenting simple and joyful. Discover
                    expert advice, book trusted services, and find everything
                    your pet needs to thrive—all in one place. With PetziPal,
                    your pet’s happiness and well-being always come first.
                  </h5>
                  {/* Dropdowns and Search Bar Row */}
                  <div className="row align-items-center mt-4 g-2 mb-4">
                    <div className="col-md-3 col-12 mb-2 mb-md-0">
                      <select className="form-select" defaultValue="">
                        <option value="" disabled>
                          Services
                        </option>
                        <option value="grooming">Grooming</option>
                        <option value="vet">Vet Consultation</option>
                        <option value="boarding">Boarding</option>
                        <option value="training">Training</option>
                      </select>
                    </div>
                    <div className="col-md-3 col-12 mb-2 mb-md-0">
                      <select className="form-select" defaultValue="">
                        <option value="" disabled>
                          Pet Count
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    <div className="col-md-3 col-12 mb-2 mb-md-0">
                      <select className="form-select" defaultValue="">
                        <option value="" disabled>
                          Location
                        </option>
                        <option value="colombo">Colombo</option>
                        <option value="dehiwala">Dehiwala</option>
                        <option value="moratuwa">Moratuwa</option>
                        <option value="kalutara">Kalutara</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 col-12">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <button className="btn btn-success col-1" type="button">
                        <i className="bi bi-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner1;
