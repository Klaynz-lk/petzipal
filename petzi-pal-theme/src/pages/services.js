import React from "react";
import Link from "next/link";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import servicesData from "../data/servicesData";

const Services = () => {
  return (
    <Layout>
      <Breadcrumb pageName="Services" pageTitle="Services" />
      <section className="service-section section-padding">
        <div className="container pt-120 mb-120">
          <div className="row justify-content-center">
            {/* Search */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="multiselect-bar d-flex justify-content-end">
                    <form className="service-search-bar col-md-4 position-relative">
                      <input
                        type="text"
                        className="form-control service-search-input pr-5"
                        placeholder="Search services..."
                        aria-label="Search services"
                      />
                      <span className="search-icon">
                        <i className="bi bi-search" />
                      </span>
                    </form>
                </div>
              </div>
            </div>
            {servicesData.map((service) => (
              <div key={service.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="service-card text-center h-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="img-fluid service-img mb-3"
                  />
                  <h3 className="service-title mb-4">{service.name}</h3>
                  <Link href="/shop" legacyBehavior>
                    <a className="account-btn">View Services</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
