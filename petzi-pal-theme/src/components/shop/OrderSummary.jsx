import React from "react";
import Link from "next/link";
import ProductPriceCount from "./ProductPriceCount";

function OrderSummary({ cartItems = [], cartTotal = 0 }) {
  return (
    <>
      <div className="added-product-summary mb-30">
        <h5 className="title-25 checkout-title">Order Summary</h5>
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <p>No items in cart</p>
            <Link legacyBehavior href="/shop">
              <a className="btn btn-primary">Continue Shopping</a>
            </Link>
          </div>
        ) : (
          <ul className="added-products">
            {cartItems.map((item) => (
              <li key={item.id} className="single-product d-flex justify-content-start">
                <div className="product-img">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                </div>
                <div className="product-info">
                  <h5 className="product-title">
                    <Link legacyBehavior href={`/shop-details?id=${item.id}`}>
                      <a>{item.name}</a>
                    </Link>
                  </h5>
                  <div className="product-details">
                    <small className="text-muted d-block">Provider: {item.provider}</small>
                    <small className="text-muted d-block">Duration: {item.duration}</small>
                    <small className="text-muted d-block">Qty: {item.quantity}</small>
                  </div>
                  <div className="product-price">
                    <span className="fw-bold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    {item.quantity > 1 && (
                      <small className="text-muted d-block">
                        Rs. {item.price} × {item.quantity}
                      </small>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="summery-card total-cost mb-30">
        <table className="table cost-summery-table total-cost">
          <thead>
            <tr>
              <th>Total ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</th>
              <th>Rs. {cartTotal.toFixed(2)}</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default OrderSummary;
