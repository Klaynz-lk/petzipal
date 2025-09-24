import React from "react";
import ProductPriceCount from "./ProductPriceCount";

function OrderSummary() {
  return (
    <>
      <div className="added-product-summary mb-30">
        <h5 className="title-25 checkout-title">Order Summary</h5>
        <ul className="added-products">
          <li className="single-product d-flex justify-content-start">
            <div className="product-img">
              <img src="assets/images/bg/check-out-01.png" alt="" />
            </div>
            <div className="product-info">
              <h5 className="product-title">
                <a href="#">Pet Grooming.</a>
              </h5>
              <ProductPriceCount price={2000} />
            </div>
            <div className="delete-btn">
              <i className="bi bi-x-lg" />
            </div>
          </li>
          <li className="single-product d-flex justify-content-start">
            <div className="product-img">
              <img src="assets/images/bg/check-out-02.png" alt="" />
            </div>
            <div className="product-info">
              <h5 className="product-title">
                <a href="#">Veterinary Care.</a>
              </h5>
              <ProductPriceCount price={2000} />
            </div>
            <div className="delete-btn">
              <i className="bi bi-x-lg" />
            </div>
          </li>
          <li className="single-product d-flex justify-content-start">
            <div className="product-img">
              <img src="assets/images/bg/check-out-03.png" alt="" />
            </div>
            <div className="product-info">
              <h5 className="product-title">
                <a href="#">Pet Boarding.</a>
              </h5>
              <ProductPriceCount price={1000} />
            </div>
            <div className="delete-btn">
              <i className="bi bi-x-lg" />
            </div>
          </li>
        </ul>
      </div>
      <div className="summery-card total-cost mb-30">
        <table className="table cost-summery-table total-cost">
          <thead>
            <tr>
              <th>Total</th>
              <th>Rs. 5000.00</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default OrderSummary;
