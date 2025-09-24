import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ShopCard from "../components/shop/ShopCard";
import Layout from "../layout/Layout";
import servicesData from "../data/servicesData";

function Shop() {
  const [value, setValue] = React.useState(50);
  return (
    <Layout>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Location</h5>
                    <div className="district-filter">
                      <div className="district-group mb-2">
                        <div className="checkbox-container">
                          <strong>Colombo</strong>
                          <label className="containerss">
                            Dehiwala
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                          <label className="containerss">
                            Moratuwa
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                          <strong>Kalutara</strong>
                          <label className="containerss">
                            Dehiwala
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                          <label className="containerss">
                            Moratuwa
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Price Range (LKR)</h5>
                    <div className="px-2 py-3">
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        defaultValue="10000"
                        className="form-range w-100"
                        id="priceRange"
                      />
                      <div className="d-flex justify-content-between mt-2">
                        <span>Rs. 0</span>
                        <span>Rs. 50,000+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Availability</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Monday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Tuesday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Wednesday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Thursday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Friday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Saturday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Sunday
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="multiselect-bar d-flex align-items-center gap-3">
                    <div className="single-select">
                      <select
                        className="defult-select-drowpown"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Service
                        </option>
                        {servicesData.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="multiselect-area">
                      <div className="single-select">
                        <span>Show</span>
                        <select
                          className="defult-select-drowpown"
                          id="color-dropdown"
                        >
                          <option>12</option>
                          <option>15</option>
                          <option>18</option>
                          <option>21</option>
                          <option>25</option>
                        </select>
                      </div>
                      <div className="single-select two">
                        <select
                          style={{ outline: "none" }}
                          className="defult-select-drowpown"
                          id="eyes-dropdown"
                        >
                          <option>Default</option>
                          <option>Grid</option>
                          <option>Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                <ShopCard />
              </div>
              <div className="row pt-70">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-left-short" />
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            01
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            02
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            03
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-right-short" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
