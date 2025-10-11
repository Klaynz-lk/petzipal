import Link from "next/link";
import React, { useState, useEffect } from "react";

function ShopCard({ selectedServiceType, selectedLocations }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const endpoint = `${backendUrl}/api/v1/pet-services`;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let url = endpoint;
        
        // If a specific service type is selected, add it as a query parameter
        if (selectedServiceType) {
          url += `?type=${selectedServiceType}`;
        }
        
        console.log("ShopCard fetching services with URL:", url);
        console.log("Selected service type:", selectedServiceType);
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        console.log("Fetched services:", data);
        
        // Filter services by selected service type and locations
        let filteredServices = data;
        
        // Filter by service type
        if (selectedServiceType) {
          filteredServices = filteredServices.filter(service => {
            const serviceTypeId = service.petServiceType.id;
            return serviceTypeId == selectedServiceType;
          });
          console.log("After service type filtering:", filteredServices);
        }
        
        // Filter by locations
        if (selectedLocations && selectedLocations.length > 0) {
          filteredServices = filteredServices.filter(service => {
            const serviceLocation = service.location?.city || service.location?.name || service.location;
            return selectedLocations.includes(serviceLocation);
          });
          console.log("After location filtering:", filteredServices);
        }
        
        console.log("Final filtered services:", filteredServices);
        
        setServices(filteredServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, [endpoint, selectedServiceType, selectedLocations]);
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
                <div className="service-info ">
                  <p className="description mb-2">{description || "Professional pet service"}</p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-badge" title="Provider" />
                      {provider_name || "Professional"}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-geo-alt" title="Location" />
                      {location?.city || location || "Available"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-cash-coin" title="Price" />
                      Rs. {price || "Contact for price"}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock-history" title="Duration" />
                      {duration || "Flexible"}
                    </span>
                  </div>
                </div>

                <div className="review mb-3">
                  <ul>
                    {[...Array(5)].map((_, index) => (
                      <li key={index}>
                        <i className={`bi bi-star${index < (rating || 5) ? '-fill' : ''}`} />
                      </li>
                    ))}
                  </ul>
                  <span>({rating || 5})</span>
                </div>
                <div className="d-flex justify-content-center">
                  <Link href={`/shop-details?id=${id}`} legacyBehavior>
                    <a className="account-btn">View Details</a>
                  </Link>
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
