import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductPriceCount from "./ProductPriceCount";
import { addToCart, isInCart, getCartItem } from "../../utils/cartUtils";

function ProductDetails({ service }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isInCartState, setIsInCartState] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle service images - if service has multiple images, use them; otherwise use default
  const serviceImages = service?.images || [service?.image].filter(Boolean) || ["assets/images/bg/banner-img.jpg"];

  // Ensure we have at least 5 images for the tabs (duplicate if necessary)
  const displayImages = [];
  for (let i = 0; i < 5; i++) {
    displayImages.push(serviceImages[i % serviceImages.length]);
  }

  // Check if service is already in cart
  useEffect(() => {
    if (service?.id) {
      setIsInCartState(isInCart(service.id));
      const cartItem = getCartItem(service.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [service?.id]);

  const handleAddToCart = () => {
    if (service) {
      addToCart(service, quantity);
      setIsInCartState(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleBuyNow = () => {
    if (service) {
      addToCart(service, quantity);
      router.push("/check-out");
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };
  return (
    <>
      <div className="row g-lg-4 gy-5 mb-120">
        <div className="col-lg-7">
          <div className="shop-details-img">
            <img
              className="img-fluid w-100"
              src={service?.image || "assets/images/bg/banner-img.jpg"}
              alt={service?.name || "Service image"}
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content">
            <h3>{service?.name || "Service Name"}</h3>
            <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <i className={`bi bi-star${index < (service?.rating || 5) ? '-fill' : ''}`} />
                </li>
              ))}
              <li>
                <a href="#" className="review-no">
                  ({service?.review_count || 1} customer review)
                </a>
              </li>
            </ul>
            <div className="row g-2 mb-3">
              <div className="col-12">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Duration:</span>
                  <span>{service?.duration || "40 min"}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Provider Name:</span>
                  <span>{service?.provider_name || service?.vet_name || "Professional"}</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Location:</span>
                  <span>
                    {(() => {
                      const loc = service?.location;
                      if (!loc) return "Available";
                      if (typeof loc === 'string') return loc;
                      if (typeof loc === 'object') {
                        // Priority search for common location string fields
                        const value = loc.city || loc.name || loc.district || loc.location;
                        if (typeof value === 'object') return value.city || value.name || value.district || "Available";
                        return value || "Available";
                      }
                      return "Available";
                    })()}
                  </span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Date:</span>
                  <input type="date" className="form-control" style={{ maxWidth: '180px' }} />
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="model-number d-flex align-items-center gap-2">
                  <span className="fw-semibold">Pet Count:</span>
                  <select className="form-select" style={{ maxWidth: '180px' }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="price-tag">
              <h4>Rs. {service?.price || "Contact for price"}</h4>
            </div>
            <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
              <div className="quantity d-flex align-items-center">
                <ProductPriceCount
                  price={service?.price || 0}
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                />
              </div>
              <button
                className={`primary-btn3 ${isInCartState ? 'btn-success' : ''}`}
                onClick={handleAddToCart}
                style={{ marginLeft: '10px' }}
              >
                {isInCartState ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {showSuccessMessage && (
              <div className="alert alert-success mb-3" style={{ padding: '8px 12px', fontSize: '14px' }}>
                <i className="bi bi-check-circle me-2"></i>
                Service added to cart successfully!
              </div>
            )}

            <div className="buy-now-btn">
              <button onClick={handleBuyNow} className="primary-btn3 button-hover w-100">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
