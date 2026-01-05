import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import servicesData from "../data/servicesData";

const Services = () => {
  //const [servicesData, setServicesData] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const endpoint = `${backendUrl}/api/v1/pet-service-type`;

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const res = await fetch(endpoint);
  //       if (!res.ok) throw new Error("Failed to fetch services");
  //       const data = await res.json();
  //       setServicesData(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchServices();
  // }, [endpoint]);

  useEffect(() => {
    // simulate API delay (optional)
    setTimeout(() => {
      setServices(servicesData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <Layout>
        <Breadcrumb pageName="Services" pageTitle="Services" />
        <div className="container pt-120 mb-120">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <p>Loading services...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Breadcrumb pageName="Services" pageTitle="Services" />
        <div className="container pt-120 mb-120">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <p style={{ color: "red" }}>Error: {error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Breadcrumb pageName="Services" pageTitle="Services" />
      <section className="service-section section-padding">
        <div className="container pt-4 mb-100">
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
                  </form>
                </div>
              </div>
            </div>
            {/* {servicesData.map((service) */}
            {servicesData.map((service) => (
              <div key={service.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="service-card text-center h-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="img-fluid service-img mb-3"
                  />
                  <h3 className="service-title mb-4">{service.name}</h3>
                  <Link href={`/shop?service=${service.id}`} legacyBehavior>
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
