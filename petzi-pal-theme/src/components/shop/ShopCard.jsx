import Link from "next/link";
import React from "react";
import petCollection from "../../data/petCollection.json";
function ShopCard() {
  return (
    <>
      {petCollection.map((item) => {
        const {
          id,
          img,
          title,
          review,
          offer_price,
          description,
          vet_name,
          time_duration,
          location,
        } = item;
        return (
          <div key={id} className="col-lg-4 col-md-4 col-sm-6">
            <div className="collection-card">
              <div className="collection-img">
                <img className="img-fluid" src={img} alt="" />
                {/* Removed View Details from here */}
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
                  <Link legacyBehavior href="/shop-details">
                    <a>{title}</a>
                  </Link>
                </h4>
                <div className="service-info ">
                  <p className="description mb-2">{description}</p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-badge" title="Vet" />
                      {vet_name}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-geo-alt" title="Location" />
                      {location}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-cash-coin" title="Price" />
                      Rs. {offer_price}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock-history" title="Duration" />
                      {time_duration}
                    </span>
                  </div>
                </div>

                <div className="review mb-3">
                  <ul>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                  </ul>
                  <span>({review})</span>
                </div>
                <div className="d-flex justify-content-center">
                  <Link href="/shop-details" legacyBehavior>
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
