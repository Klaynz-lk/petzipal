import Link from "next/link";
import React, { useState, useEffect } from "react";

function ShopCard({ serviceTypeId, selectedLocations }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const endpoint = `${backendUrl}/api/v1/pet-services`;

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        setLoading(true);
        if (!backendUrl) {
          throw new Error("Backend URL is not configured");
        }
        let url = endpoint;

        // If a specific service type is selected, add it as a query parameter
        if (serviceTypeId) {
          url += `?type=${serviceTypeId}`;
        }

        console.log("ShopCard - isMounted:", isMounted, "serviceTypeId prop:", serviceTypeId);
        console.log("ShopCard - Fetching URL:", url);

        const res = await fetch(url).catch(err => {
          console.warn("ShopCard: Network error fetching services:", err.message);
          return null;
        });

        if (!res) {
          if (isMounted) setError("Network error: Could not reach the server.");
          return;
        }

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        if (!isMounted) return;

        console.log("ShopCard - Received data count:", data.length);

        // Filter services by selected service type and locations
        let filteredServices = data;

        // Filter by service type (STRICT FRONTEND FILTER)
        if (serviceTypeId) {
          filteredServices = filteredServices.filter(service => {
            const currentTypeId = service.petServiceTypeID || service.petServiceType?.id;
            return String(currentTypeId) === String(serviceTypeId);
          });
          console.log("ShopCard - After type filter count:", filteredServices.length);
        }

        // Filter by locations
        if (selectedLocations && selectedLocations.length > 0) {
          filteredServices = filteredServices.filter(service => {
            const serviceLocation = service.location?.city || service.location?.name || service.location;
            return selectedLocations.includes(serviceLocation);
          });
          console.log("ShopCard - After location filter count:", filteredServices.length);
        }

        console.log("ShopCard - FINAL services to set:", filteredServices.map(s => s.id));
        setServices(filteredServices);
      } catch (error) {
        if (isMounted) {
          console.error("ShopCard - Error:", error);
          setError(error.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => { isMounted = false; };
  }, [endpoint, serviceTypeId, selectedLocations]);
  if (loading) {
    return (
      <div className="col-12 text-center">
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12 text-center">
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="col-12 text-center">
        <p>No services found for the selected criteria.</p>
      </div>
    );
  }

  return (
    <>
      {services.map((service) => {
        const {
          id,
          image,
          name,
          rating,
          price,
          description,
          provider_name,
          duration,
          location,
        } = service;
        return (
          <div key={id} className="col-lg-4 col-md-4 col-sm-6">
            <div className="collection-card">
              <div className="collection-img">
                <img className="img-fluid" src={image || "assets/images/bg/banner-img.jpg"} alt={name} />
                <ul className="cart-icon-list">
                  <li>
                    <a href="#">
                      <img src="assets/images/icon/Icon-cart3.svg" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="collection-content text-center">
                <h4 className="">
                  <Link legacyBehavior href={`/shop-details?id=${id}`}>
                    <a>{name}</a>
                  </Link>
                </h4>
                <div className="service-info mt-2">
                  <span className="d-block fw-bold text-primary">
                    Rs. {price || "Contact for price"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ShopCard;
