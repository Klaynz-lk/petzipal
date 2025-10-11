import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ShopCard from "../components/shop/ShopCard";
import Layout from "../layout/Layout";

function Shop() {
  const router = useRouter();
  const [value, setValue] = React.useState(50);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [typeData, setTypeData] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const endpoint = `${backendUrl}/api/v1/pet-services`;
  const typeEndpoint = `${backendUrl}/api/v1/pet-service-type`;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(endpoint);
        const typeRes = await fetch(typeEndpoint);
        if (!res.ok) throw new Error("Failed to fetch services");
        if (!typeRes.ok) throw new Error("Failed to fetch service types");
        const data = await res.json();
        const typeData = await typeRes.json();
        setTypeData(typeData);
        setServicesData(data);
        
        // Extract unique locations from services data
        const uniqueLocations = [];
        const locationMap = new Map();
        
        data.forEach(service => {
          if (service.location) {
            const locationKey = service.location.city || service.location.name || service.location;
            if (locationKey && !locationMap.has(locationKey)) {
              locationMap.set(locationKey, {
                id: locationKey.toLowerCase().replace(/\s+/g, '-'),
                name: locationKey,
                city: service.location.city || service.location.name || service.location
              });
            }
          }
        });
        
        const extractedLocations = Array.from(locationMap.values());
        setLocations(extractedLocations);
        
        console.log("Services data:", data);
        console.log("Type data:", typeData);
        console.log("Extracted locations:", extractedLocations);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [endpoint]);

  // Handlers for filtering
  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    console.log("Service type changed to:", value);
    setSelectedType(value);
  };

  const handleLocationChange = (locationName, isChecked) => {
    setSelectedLocations(prev => {
      if (isChecked) {
        return [...prev, locationName];
      } else {
        return prev.filter(loc => loc !== locationName);
      }
    });
  };

  // Read service ID from URL query parameters
  useEffect(() => {
    if (router.isReady && router.query.service) {
      setSelectedService(router.query.service);
    }
  }, [router.isReady, router.query.service]);
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
                          {loading ? (
                            <p>Loading locations...</p>
                          ) : error ? (
                            <p style={{ color: "red" }}>Error loading locations</p>
                          ) : locations.length > 0 ? (
                            locations.map((location) => (
                              <label key={location.id} className="containerss">
                                {location.name}
                                <input 
                                  type="checkbox" 
                                  checked={selectedLocations.includes(location.name)}
                                  onChange={(e) => handleLocationChange(location.name, e.target.checked)}
                                />
                                <span className="checkmark" />
                              </label>
                            ))
                          ) : (
                            <p>No locations available</p>
                          )}
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
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Service
                        </option>
                        {loading ? (
                          <option disabled>Loading services...</option>
                        ) : error ? (
                          <option disabled>Error loading services</option>
                        ) : (
                          typeData.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))
                        )}
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
                <ShopCard 
                  selectedServiceType={selectedService} 
                  selectedLocations={selectedLocations}
                />
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
