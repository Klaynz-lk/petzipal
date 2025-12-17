import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSelectedLocations, setTempSelectedLocations] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedDays, setSelectedDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [endpoint]);

  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
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

  const handleTempLocationChange = (locationName, isChecked) => {
    setTempSelectedLocations(prev => {
      if (isChecked) {
        return [...prev, locationName];
      } else {
        return prev.filter(loc => loc !== locationName);
      }
    });
  };

  const handleDayChange = (day, isChecked) => {
    setSelectedDays(prev => {
      if (isChecked) {
        return [...prev, day];
      } else {
        return prev.filter(d => d !== day);
      }
    });
  };

  const openFilterModal = () => {
    setTempSelectedLocations([...selectedLocations]);
    setIsFilterOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFilterModal = () => {
    setIsFilterOpen(false);
    document.body.style.overflow = 'unset';
  };

  const applyFilters = () => {
    setSelectedLocations([...tempSelectedLocations]);
    closeFilterModal();
  };

  const cancelFilters = () => {
    setTempSelectedLocations([...selectedLocations]);
    closeFilterModal();
  };

  useEffect(() => {
    if (router.isReady && router.query.service) {
      setSelectedService(router.query.service);
    }
  }, [router.isReady, router.query.service]);

  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/css/mobile-bottom-bar.css" />
        <link rel="stylesheet" href="/assets/css/filter-modal.css" />
        <link rel="stylesheet" href="/assets/css/shop-responsive.css" />
      </Head>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
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
                    <h5 className="shop-widget-title">
                      <i className="bi bi-currency-rupee filter-icon"></i>
                      Price Range (LKR)
                    </h5>
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
                    <h5 className="shop-widget-title">
                      <i className="bi bi-calendar-check filter-icon"></i>
                      Availability
                    </h5>
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
                  <div className="multiselect-bar d-flex align-items-center justify-content-between gap-2 mobile-select-row">
                    <div className="single-select flex-grow-1">
                      <select
                        className="defult-select-drowpown w-100 mobile-select"
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
                    <div className="multiselect-area d-flex align-items-center justify-content-between gap-3 w-auto">
                      <div className="single-select show-select">
                        <div className="d-flex align-items-center gap-1">
                          <span className="text-nowrap mobile-label">Show</span>
                          <select
                            className="defult-select-drowpown mobile-select"
                            id="color-dropdown"
                          >
                            <option>12</option>
                            <option>15</option>
                            <option>18</option>
                            <option>21</option>
                            <option>25</option>
                          </select>
                        </div>
                      </div>
                      <div className="single-select default-select">
                        <select
                          style={{ outline: "none" }}
                          className="defult-select-drowpown mobile-select"
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

      {/* Mobile Bottom Search & Filter Bar */}
      <div className="d-lg-none mobile-bottom-bar">
        <div className="mobile-search-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mobile-search-input"
          />
          <i className="bi bi-search mobile-search-icon"></i>
        </div>
        <button
          onClick={openFilterModal}
          className="mobile-filter-btn"
        >
          <i className="bi bi-funnel"></i>
          Filter By
        </button>
      </div>

      {/* Mobile Filter Modal/Slide */}
      <div className={`filter-modal ${isFilterOpen ? 'active' : ''}`}>
        <div className="filter-overlay" onClick={closeFilterModal}></div>
        <div className="filter-content">
          <div className="filter-header">
            <h5>Filters</h5>
            <button className="close-btn" onClick={closeFilterModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="filter-body">
            {/* Location Filter */}
            <div className="shop-widget">
              <div className="check-box-item">
                <h5 className="shop-widget-title">
                  <i className="bi bi-geo-alt-fill filter-icon"></i>
                  Location
                </h5>
                <div className="district-filter">
                  <div className="district-group">
                    <div className="checkbox-container">
                      {loading ? (
                        <div className="loading-state">
                          <i className="bi bi-arrow-repeat spin-icon"></i>
                          <p className="loading-text">Loading locations...</p>
                        </div>
                      ) : error ? (
                        <div className="error-state">
                          <i className="bi bi-exclamation-circle"></i>
                          <p className="error-text">Error loading locations</p>
                        </div>
                      ) : locations.length > 0 ? (
                        locations.map((location) => (
                          <label
                            key={location.id}
                            className={`location-label ${tempSelectedLocations.includes(location.name) ? 'selected' : ''}`}
                          >
                            <span className="location-name">{location.name}</span>
                            <input
                              type="checkbox"
                              checked={tempSelectedLocations.includes(location.name)}
                              onChange={(e) => handleTempLocationChange(location.name, e.target.checked)}
                              className="location-checkbox"
                            />
                            <span className="custom-checkbox">
                              {tempSelectedLocations.includes(location.name) && (
                                <i className="bi bi-check"></i>
                              )}
                            </span>
                          </label>
                        ))
                      ) : (
                        <div className="empty-state">
                          <i className="bi bi-inbox"></i>
                          <p className="empty-text">No locations available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="shop-widget">
              <div className="check-box-item">
                <h5 className="shop-widget-title">
                  <i className="bi bi-currency-rupee filter-icon"></i>
                  Price Range
                </h5>
                <div className="price-range-container">
                  <div className="price-display">
                    <div className="price-badge">
                      Rs. {parseInt(priceRange).toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="price-range-slider"
                    style={{
                      background: `linear-gradient(to right, #ff5722 0%, #ff5722 ${(priceRange / 50000) * 100}%, #e0e0e0 ${(priceRange / 50000) * 100}%, #e0e0e0 100%)`
                    }}
                  />
                  <div className="price-labels">
                    <span>Rs. 0</span>
                    <span>Rs. 50,000+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="shop-widget">
              <div className="check-box-item">
                <h5 className="shop-widget-title">
                  <i className="bi bi-calendar-check filter-icon"></i>
                  Availability
                </h5>
                <div className="days-grid">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label
                      key={day}
                      className={`day-label ${selectedDays.includes(day) ? 'selected' : ''}`}
                    >
                      <span className="day-checkbox"></span>
                      <span className="day-name">{day}</span>
                      <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={(e) => handleDayChange(day, e.target.checked)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="filter-footer">
            <button className="btn btn-cancel" onClick={cancelFilters}>
              <i className="bi bi-x-circle"></i>
              Cancel
            </button>
            <button className="btn btn-apply" onClick={applyFilters}>
              <i className="bi bi-check-circle"></i>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Shop;