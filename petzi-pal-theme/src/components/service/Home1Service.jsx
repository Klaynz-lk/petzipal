import Link from "next/link";
import React, { useState, useEffect } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

function Home1Service() {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Only change: use service-types API
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const endpoint = `${backendUrl}/api/v1/pet-service-type`;

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Failed to fetch service types");
        const data = await res.json();
        setServiceTypes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceTypes();
  }, [endpoint]);

  const serviceSlider = {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: ".next-btn-1",
      prevEl: ".prev-btn-1",
    },
    breakpoints: {
      280: { slidesPerView: 1, spaceBetween: 15 },
      480: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
      1400: { slidesPerView: 4 },
      1600: { slidesPerView: 4 },
    },
  };

  // Default icon mapping
  const getServiceIcon = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes("daycare"))
      return "assets/images/icon/daycare-center2.svg";
    if (name.includes("grooming")) return "assets/images/icon/grooming2.svg";
    if (name.includes("boarding")) return "assets/images/icon/boarding2.svg";
    if (name.includes("veterinary") || name.includes("vet"))
      return "assets/images/icon/veterinary2.svg";
    return "assets/images/icon/daycare-center2.svg"; // default icon
  };

  return (
    <div className="h1-service-area pt-120 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="section-title1 text-center">
              <span>
                <img src="assets/images/icon/section-vec-l1.svg" alt="" />
                Services
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>Find and Book the Best Pet Services</h2>
            </div>
          </div>
        </div>

        {/* Slider buttons */}
        <div className="row d-sm-flex d-none">
          <div className="col-lg-12">
            <div className="swiper-btn-wrap d-flex align-items-center justify-content-between">
              <div className="slider-btn prev-btn-1">
                <i style={{ cursor: "pointer" }} className="bi bi-arrow-left" />
              </div>
              <div className="slider-btn next-btn-1">
                <i
                  style={{ cursor: "pointer" }}
                  className="bi bi-arrow-right"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {loading && (
            <div className="col-12 text-center">
              <p>Loading service types...</p>
            </div>
          )}

          {error && (
            <div className="col-12 text-center">
              <p style={{ color: "red" }}>Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <Swiper {...serviceSlider} className="swiper home1-services-slider">
              <div className="swiper-wrapper">
                {serviceTypes.map((service, index) => {
                  const cardClasses = ["services-card1"];
                  if (index === 1) cardClasses.push("two");
                  if (index === 2) cardClasses.push("three");
                  if (index === 3) cardClasses.push("four");

                  return (
                    <SwiperSlide key={service.id} className="swiper-slide">
                      <div className={cardClasses.join(" ")}>
                        <img
                          className="services-card-vec"
                          src="assets/images/bg/services-card-vec.png"
                          alt=""
                        />
                        <div className="icon">
                          <img src={getServiceIcon(service.name)} alt="" />
                        </div>
                        <div className="content">
                          <h3>
                            <Link legacyBehavior href="/services">
                              <a>{service.name}</a>
                            </Link>
                          </h3>
                        </div>
                        <Link
                          legacyBehavior
                          href={`/shop?service=${service.id}`}
                        >
                          <a className="more-btn">
                            More Details
                            <img
                              src="assets/images/icon/btn-arrow1.svg"
                              alt=""
                            />
                          </a>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home1Service;
