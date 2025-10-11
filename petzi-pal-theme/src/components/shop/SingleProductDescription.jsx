import React from "react";

function SingleProductDescription({ service }) {
  return (
    <>
      <div className="row mb-120">
        <div className="col-lg-12">
          <div
            className="nav nav2 nav  nav-pills"
            id="v-pills-tab2"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="false"
            >
              Description
            </button>
            <button
              className="nav-link"
              id="v-pills-common-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-common"
              type="button"
              role="tab"
              aria-controls="v-pills-common"
              aria-selected="true"
            >
              Review
            </button>
          </div>
          <div className="tab-content tab-content2" id="v-pills-tabContent2">
            <div
              className="tab-pane fade active show"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <div className="description">
                {service?.description ? (
                  <div>
                    {service.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="para-2 mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="para-2 mb-3">
                      {service?.name || "Service"} is a professional pet care service 
                      provided by {service?.provider_name || service?.vet_name || "our experienced team"}. 
                      We are committed to providing the highest quality care for your beloved pets.
                    </p>
                    <p className="para-2 mb-3">
                      Our service includes professional care, attention to detail, and 
                      a focus on your pet's comfort and well-being. We understand that 
                      every pet is unique and requires personalized attention.
                    </p>
                    <p className="para-2 mb-0">
                      Contact us today to learn more about this service and how we can 
                      help take care of your pet's needs.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div
              className="tab-pane fade"
              id="v-pills-common"
              role="tabpanel"
              aria-labelledby="v-pills-common-tab"
            >
              <div className="reviews-area">
                <div className="row g-lg-4 gy-5">
                  <div className="col-lg-8">
                    <div className="number-of-review">
                      <h3>Review (02) :</h3>
                    </div>
                    <div className="review-list-area">
                      <ul className="review-list">
                        <li>
                          <div className="single-review d-flex justify-content-between flex-md-nowrap flex-wrap">
                            <div className="review-image">
                              <img
                                src="assets/images/bg/review-img-1.png"
                                alt="image"
                              />
                            </div>
                            <div className="review-content">
                              <div className="c-header d-flex align-items-center">
                                <div className="review-meta">
                                  <h5 className="mb-0">
                                    <a href="#">Rocky Mike ,</a>
                                  </h5>
                                  <div className="c-date">06 july,2022</div>
                                </div>
                                <div className="replay-btn">
                                  <a href="#">
                                    <i className="bi bi-reply" />
                                    Reply
                                  </a>
                                </div>
                              </div>
                              <ul className="product-review">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                              </ul>
                              <div className="c-body">
                                <p>
                                  I must explain to you how all this mistaken
                                  idea of denouncing pleasure and praising pain
                                  was born and I will give you a complete
                                  account.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="single-review d-flex justify-content-between flex-md-nowrap flex-wrap">
                            <div className="review-image">
                              <img
                                src="assets/images/bg/review-img-3.png"
                                alt="image"
                              />
                            </div>
                            <div className="review-content">
                              <div className="c-header d-flex align-items-center">
                                <div className="review-meta">
                                  <h5 className="mb-0">
                                    <a href="#">Rony Jhon ,</a>
                                  </h5>
                                  <div className="c-date">07 july,2022</div>
                                </div>
                                <div className="replay-btn">
                                  <a href="#">
                                    <i className="bi bi-reply" />
                                    Reply
                                  </a>
                                </div>
                              </div>
                              <ul className="product-review">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                              </ul>
                              <div className="c-body">
                                <p>
                                  I must explain to you how all this mistaken
                                  idea of denouncing pleasure and praising pain
                                  was born and I will give you a complete
                                  account.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductDescription;
