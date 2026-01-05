import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Morphext from "../morphext/Morphext";
import { useState, useEffect, useRef } from "react";

function Banner1() {
  const router = useRouter();
  const [petService, setPetService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const phrases = ["Safe .", "Easy .", "Rewarding ."];

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const endpoint = `${backendUrl}/api/v1/pet-services`;

  useEffect(() => {
    const fetchPetServices = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Failed to fetch pet services");
        const data = await res.json();
        setPetService(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPetServices();
  }, [endpoint]);

  // Filter suggestions based on search query (services only)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = petService.filter((service) => {
      const serviceName = service.name?.toLowerCase() || "";
      const providerName =
        service.provider_name?.toLowerCase() ||
        service.vet_name?.toLowerCase() ||
        "";
      const location =
        service.location?.city?.toLowerCase() ||
        service.location?.name?.toLowerCase() ||
        "";
      const query = searchQuery.toLowerCase();

      return (
        serviceName.includes(query) ||
        providerName.includes(query) ||
        location.includes(query)
      );
    });

    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0 && isSearchFocused);
  }, [searchQuery, petService, isSearchFocused]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionClick = (service) => {
    setSearchQuery("");
    setShowSuggestions(false);
    setIsSearchFocused(false);
    router.push(`/shop-details?id=${service.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      // Navigate to first result
      handleSuggestionClick(suggestions[0]);
    } else if (searchQuery.trim() !== "") {
      // Navigate to shop page with search query
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
    setShowSuggestions(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hero-style-1">
      <div className="container pt-120">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-xxl-8 d-flex align-items-center">
                <div className="banner-content ">
                  <div className="tag">
                    <ul>
                      <li>Trustworthy</li>
                      <li>Safely</li>
                      <li>Loyalty</li>
                    </ul>
                  </div>
                  <h1 className="mb-5">
                    Sri Lanka’s Pet Care Hub
                    <br /> {" "}
                    <Morphext
                      animation="fadeInLeft"
                      speed="3000"
                      phrases={phrases}
                    />
                  </h1>
                  <div className="reservation-review">
                    <div className="reservation-btn">
                      <Link legacyBehavior href="/services">
                        <a className="primary-btn1">Explore More</a>
                      </Link>
                    </div>
                  </div>
                  <h5 className="col-12 banner-desc">
                    Care for your pets, earn rewards, and join us in caring for
                    Sri Lanka’s street animals
                  </h5>
                  {/* Dropdowns and Search Bar Row */}
                  {loading && <p>Loading pet services...</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {/* Search Bar with Suggestions */}
                  <div className="row align-items-center mt-4 g-2 mb-4">
                    <div className="col-md-3 col-12 mb-2 mb-md-0">
                      <select className="form-select" defaultValue="">
                        <option value="" disabled>
                          Pet Count
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    <div className="col-md-3 col-12 mb-2 mb-md-0">
                      <select className="form-select" defaultValue="">
                        <option value="" disabled>
                          Location
                        </option>
                        {petService.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.location.city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 col-12">
                    <div className="position-relative">
                      <form onSubmit={handleSearchSubmit}>
                        <div className="input-group">
                          <input
                            ref={searchInputRef}
                            type="text"
                            className="form-control"
                            placeholder="Search services"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                            autoComplete="off"
                          />
                          <button
                            className="btn btn-success col-1"
                            type="submit"
                          >
                            <i className="bi bi-search" />
                          </button>
                        </div>
                      </form>

                      {/* Suggestions Dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <div
                          ref={searchResultsRef}
                          className="suggestions-dropdown"
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            borderTop: "none",
                            borderRadius: "0 0 8px 8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                            maxHeight: "300px",
                            overflowY: "auto",
                          }}
                        >
                          {suggestions.map((service) => (
                            <div
                              key={service.id}
                              className="suggestion-item"
                              style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                borderBottom: "1px solid #f0f0f0",
                                transition: "background-color 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#f8f9fa";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "white";
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault(); // Prevent input blur
                                handleSuggestionClick(service);
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: "500",
                                  color: "#333",
                                  fontSize: "14px",
                                }}
                              >
                                {service.name}
                              </div>
                              {service.provider_name || service.vet_name ? (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "4px",
                                  }}
                                >
                                  {service.provider_name || service.vet_name}
                                </div>
                              ) : null}
                              {service.location?.city ? (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#888",
                                    marginTop: "2px",
                                  }}
                                >
                                  {service.location.city}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner1;
