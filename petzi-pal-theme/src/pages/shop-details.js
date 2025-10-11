import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import OthersProduct from "../components/shop/OthersProduct";
import ProductDetails from "../components/shop/ProductDetails";
import SingleProductDescription from "../components/shop/SingleProductDescription";
import Layout from "../layout/Layout";

function ShopDetails() {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const servicesEndpoint = `${backendUrl}/api/v1/pet-services`;

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!router.isReady || !router.query.id) return;

      try {
        setLoading(true);
        
        // Fetch all services to find the specific one and get provider's other services
        const res = await fetch(servicesEndpoint);
        if (!res.ok) throw new Error("Failed to fetch services");
        
        const allServices = await res.json();
        console.log("All services:", allServices);
        
        // Find the specific service by ID
        const currentService = allServices.find(s => s.id == router.query.id);
        if (!currentService) {
          throw new Error("Service not found");
        }
        
        setService(currentService);
        console.log("Current service:", currentService);
        
        // Find other services from the same provider
        const providerName = currentService.provider_name || currentService.vet_name;
        if (providerName) {
          const providerServices = allServices.filter(s => 
            s.id !== currentService.id && 
            (s.provider_name === providerName || s.vet_name === providerName)
          );
          setOtherServices(providerServices);
          console.log("Provider other services:", providerServices);
        }
        
      } catch (error) {
        console.error("Error fetching service data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [router.isReady, router.query.id, servicesEndpoint]);

  if (loading) {
    return (
      <Layout>
        <Breadcrumb pageName="Service Details" pageTitle="Service Details" />
        <div className="shop-details-page pt-120 mb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p>Loading service details...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Breadcrumb pageName="Service Details" pageTitle="Service Details" />
        <div className="shop-details-page pt-120 mb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p style={{ color: "red" }}>Error: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <Breadcrumb pageName="Service Details" pageTitle="Service Details" />
        <div className="shop-details-page pt-120 mb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p>Service not found</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb pageName="Service Details" pageTitle="Service Details" />
      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
          <ProductDetails service={service} />
          <SingleProductDescription service={service} />
          <OthersProduct otherServices={otherServices} />
        </div>
      </div>
    </Layout>
  );
}

export default ShopDetails;
