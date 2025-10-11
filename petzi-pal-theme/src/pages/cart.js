import Link from "next/link";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ItemCounter from "../components/shop/ProductCount";
import Layout from "../layout/Layout";
import { getCart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } from "../utils/cartUtils";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart data from localStorage
    const loadCart = () => {
      const cart = getCart();
      setCartItems(cart);
      setCartTotal(getCartTotal());
      setIsLoading(false);
    };

    loadCart();

    // Listen for storage changes (when cart is updated from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'petzi_pal_cart') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = removeFromCart(itemId);
    setCartItems(updatedCart);
    setCartTotal(getCartTotal());
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = updateCartQuantity(itemId, newQuantity);
    setCartItems(updatedCart);
    setCartTotal(getCartTotal());
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setCartItems([]);
      setCartTotal(0);
    }
  };
  if (isLoading) {
    return (
      <Layout>
        <Breadcrumb pageName="Cart" pageTitle="Cart" />
        <div className="cart-section pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p>Loading cart...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb pageName="Cart" pageTitle="Cart" />
      <div className="cart-section pt-120 pb-120">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <div className="empty-cart">
                  <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
                  <h3>Your cart is empty</h3>
                  <p>Add some services to get started!</p>
                  <Link legacyBehavior href="/shop">
                    <a className="primary-btn2 btn-lg">Continue Shopping</a>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Cart Items ({cartItems.length})</h4>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="table-wrapper">
                    <table className="eg-table table cart-table">
                      <thead>
                        <tr>
                          <th>Delete</th>
                          <th>Image</th>
                          <th>Service Name</th>
                          <th>Provider</th>
                          <th>Duration</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td data-label="Delete">
                              <div 
                                className="delete-icon"
                                onClick={() => handleRemoveItem(item.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <i className="bi bi-x" />
                              </div>
                            </td>
                            <td data-label="Image">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                              />
                            </td>
                            <td data-label="Service Name">
                              <Link legacyBehavior href={`/shop-details?id=${item.id}`}>
                                <a>{item.name}</a>
                              </Link>
                            </td>
                            <td data-label="Provider">{item.provider}</td>
                            <td data-label="Duration">{item.duration}</td>
                            <td data-label="Price">Rs. {item.price}</td>
                            <td data-label="Quantity">
                              <div className="quantity d-flex align-items-center">
                                <div className="quantity-nav nice-number d-flex align-items-center">
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <span style={{ margin: "0 15px", minWidth: "30px", textAlign: "center" }}>
                                    {item.quantity}
                                  </span>
                                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td data-label="Subtotal">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <table className="table total-table">
                    <thead>
                      <tr>
                        <th>Cart Totals</th>
                        <th>Rs. {cartTotal.toFixed(2)}</th>
                      </tr>
                    </thead>
                  </table>
                  <ul className="cart-btn-group">
                    <li>
                      <Link legacyBehavior href="/shop">
                        <a className="primary-btn2 btn-lg">Continue Shopping</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/check-out">
                        <a className="primary-btn3 btn-lg">Proceed to Checkout</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
