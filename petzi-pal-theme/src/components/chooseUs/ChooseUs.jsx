import React from "react";

function ChooseUs() {
  return (
    <div className="h1-choose-area mb-120">
      <div className="container ">
        <div className="row g-lg-4 gy-5 justify-content-center">
          <div className="col-lg-5">
            <div className="section-title1">
              <span>
                <img src="assets/images/icon/section-vec-l1.svg" alt="" />
                Why Choose PetziPal
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>We care like family.</h2>
            </div>
            <div className="choose-content">
              <p>
                At PetziPal, we go beyond just connecEng pet owners and service
                providers — we create a trusted community built on love, care,
                and compassion. Every furry friend deserves the best, and we’re
                here to make pet care simple, safe, and rewarding for everyone.
              </p>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      01. What makes PetziPal special?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We’re Sri Lanka’s first complete pet care hub, bringing
                      together trusted service providers, verified reviews, and
                      a rewarding experience — all in one place. Our pla\orm
                      blends technology, transparency, and heart, ensuring your
                      pet always gets the best care while you enjoy peace of
                      mind.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      02. How do we ensure safety and trust?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Every PetziPal service provider is verified,
                      background-checked, and reviewed by real pet owners. We
                      ensure safe pracEces, professional standards, and honest
                      feedback — so you can confidently choose who cares for
                      your pet.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      03. What services can you find on PetziPal?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      From grooming and pet si`ng to training and vet visits,
                      PetziPal connects you with reliable providers across
                      Colombo 1–12, Dehiwala, and Mount Lavinia. You can book
                      services based on availability, read genuine reviews, and
                      even earn reward points for every booking.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-8">
            <div className="choose-img">
              <div className="batch">
                <img src="assets/images/icon/choose-star.svg" alt="" />
                <span>
                  100% Safe
                  <br />
                  Your Pet
                </span>
              </div>
              <div className="choose-vector">
                <img src="assets/images/icon/choose-vector.svg" alt="" />
              </div>
              <img
                className="img-fluid"
                src="assets/images/why-choose-us-img.jpg"
                alt="choose-img"
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="choose-feature">
              <ul>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="assets/images/icon/care.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>Personalized Care</h4>
                      <p>
                        Every pet is unique — we help you find care that matches
                        their personality, habits, and needs.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="assets/images/icon/team.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>Verified Providers</h4>
                      <p>
                        All service providers are screened, trusted, and rated
                        by real pet owners.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="assets/images/icon/mind.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>Rewards & Giving Back</h4>
                      <p>
                        Earn points for every service you book and help us give
                        back — a porEon of every transacEon goes toward feeding
                        and caring for street animals across Sri Lanka.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
