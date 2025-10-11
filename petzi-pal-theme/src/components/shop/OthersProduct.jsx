import Link from "next/link";
import React, { useMemo } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
function OthersProduct({ otherServices }) {
  const productSlider = useMemo(() => {
    return {
      spaceBetween: 24,
      slidesPerView: "auto",
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 2200,
      },
      navigation: {
        nextEl: ".next-btn-12",
        prevEl: ".prev-btn-12",
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        420: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
        1600: {
          slidesPerView: 5,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-12 d-flex flex-wrap align-items-center justify-content-md-between justify-content-start gap-2 mb-60">
          <div className="inner-section-title">
            <h2>Other Services by {otherServices?.[0]?.provider_name || otherServices?.[0]?.vet_name || "Provider"}</h2>
          </div>
          <div className="swiper-btn-wrap d-flex align-items-center">
            <div className="slider-btn prev-btn-12">
              <i style={{ cursor: "pointer" }} className="bi bi-arrow-left" />
            </div>
            <div className="slider-btn next-btn-12">
              <i style={{ cursor: "pointer" }} className="bi bi-arrow-right" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Swiper {...productSlider} className="swiper essential-items-slider">
          <div className="swiper-wrapper">
            {otherServices && otherServices.length > 0 ? (
              otherServices.map((service) => (
                <SwiperSlide key={service.id} className="swiper-slide">
                  <div className="collection-card">
                    <div className="collection-img">
                      <img
                        className="img-gluid"
                        src={service.image || service.images?.[0] || "assets/images/bg/banner-img.jpg"}
                        alt={service.name}
                      />
                      <ul className="cart-icon-list">
                        <li>
                          <a href="#">
                            <img src="assets/images/icon/Icon-cart3.svg" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="collection-content text-center">
                      <h4>
                        <Link legacyBehavior href={`/shop-details?id=${service.id}`}>
                          <a>{service.name}</a>
                        </Link>
                      </h4>
                      <div className="price">
                        <h6>Rs. {service.price || "Contact for price"}</h6>
                      </div>
                      <div className="review mb-3">
                        <ul>
                          {[...Array(5)].map((_, index) => (
                            <li key={index}>
                              <i className={`bi bi-star${index < (service.rating || 5) ? '-fill' : ''}`} />
                            </li>
                          ))}
                        </ul>
                        <span>({service.review_count || 5})</span>
                      </div>
                      <div className="d-flex justify-content-center">
                        <Link href={`/shop-details?id=${service.id}`} legacyBehavior>
                          <a className="account-btn">View Details</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No other services available from this provider</p>
              </div>
            )}
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default OthersProduct;
