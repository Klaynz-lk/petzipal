import Link from "next/link";
import React from "react";
import ProductPriceCount from "./ProductPriceCount";

function ProductDetails() {
  return (
    <>
      <div className="row g-lg-4 gy-5 mb-120">
        <div className="col-lg-7">
          <div className="tab-content tab-content1" id="v-pills-tabContent">
            <div
              className="tab-pane fade active show"
              id="v-pills-img1"
              role="tabpanel"
              aria-labelledby="v-pills-img1-tab"
            >
              <img
                className="img-fluid"
                src="assets/images/bg/banner-img.jpg"
                alt=""
              />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-img2"
              role="tabpanel"
              aria-labelledby="v-pills-img2-tab"
            >
              <img
                className="img-fluid"
                src="assets/images/bg/banner-img.jpg"
                alt=""
              />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-img3"
              role="tabpanel"
              aria-labelledby="v-pills-img3-tab"
            >
              <img
                className="img-fluid"
                src="assets/images/bg/banner-img.jpg"
                alt=""
              />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-img4"
              role="tabpanel"
              aria-labelledby="v-pills-img4-tab"
            >
              <img
                className="img-fluid"
                src="assets/images/bg/banner-img.jpg"
                alt=""
              />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-img5"
              role="tabpanel"
              aria-labelledby="v-pills-img5-tab"
            >
              <img
                className="img-fluid"
                src="assets/images/bg/banner-img.jpg"
                alt=""
              />
            </div>
          </div>
          <div
            className="nav nav1 nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active"
              id="v-pills-img1-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-img1"
              type="button"
              role="tab"
              aria-controls="v-pills-img1"
              aria-selected="true"
            >
              <img src="assets/images/bg/shop-sm-01.png" alt="" />
            </button>
            <button
              className="nav-link"
              id="v-pills-img2-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-img2"
              type="button"
              role="tab"
              aria-controls="v-pills-img2"
              aria-selected="false"
            >
              <img src="assets/images/bg/shop-sm-02.png" alt="" />
            </button>
            <button
              className="nav-link"
              id="v-pills-img3-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-img3"
              type="button"
              role="tab"
              aria-controls="v-pills-img3"
              aria-selected="false"
            >
              <img src="assets/images/bg/shop-sm-03.png" alt="" />
            </button>
            <button
              className="nav-link"
              id="v-pills-img4-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-img4"
              type="button"
              role="tab"
              aria-controls="v-pills-img4"
              aria-selected="false"
            >
              <img src="assets/images/bg/shop-sm-04.png" alt="" />
            </button>
            <button
              className="nav-link"
              id="v-pills-img5-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-img5"
              type="button"
              role="tab"
              aria-controls="v-pills-img5"
              aria-selected="false"
            >
              <img src="assets/images/bg/shop-sm-05.png" alt="" />
            </button>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content">
            <h3>Full Grooming Package.</h3>
            <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
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
              <li>
                <a href="#" className="review-no">
                  (1 customer review)
                </a>
              </li>
            </ul>
            <div className="row g-2 mb-3">
              <div className="col-12">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Duration:</span>
                  <span>40 min</span>
                </div>
              </div>
              <div className="col-12">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Provider Name:</span>
                  <span>Akalanka Perera</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Location:</span>
                  <span>Dehiwala</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Date:</span>
                  <input type="date" className="form-control" style={{maxWidth: '180px'}} />
                </div>
              </div>
            </div>
            <div className="price-tag">
              <h4>Rs. 5000.00</h4>
            </div>
            <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
              <div className="quantity d-flex align-items-center">
                <ProductPriceCount price={30} />
              </div>
              <Link legacyBehavior href="/cart">
                <a className="primary-btn3">Add to cart</a>
              </Link>
            </div>
            <div className="buy-now-btn">
              <Link legacyBehavior href="/cart">
                <a>Buy Now</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
