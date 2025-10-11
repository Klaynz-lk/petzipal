import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import BillingDetails from "../components/shop/BillingDetails";
import OrderSummary from "../components/shop/OrderSummary";
import Payment from "../components/shop/Payment";
import ShipingAddress from "../components/shop/ShipingAddress";
import Layout from "../layout/Layout";
import { getCart, getCartTotal } from "../utils/cartUtils";

function checOutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart data from localStorage
    const loadCart = () => {
      const cart = getCart();
      if (cart.length === 0) {
        // Redirect to cart if empty
        router.push('/cart');
        return;
      }
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
  }, [router]);

  if (isLoading) {
    return (
      <Layout>
        <Breadcrumb pageName="Check Out" pageTitle="Check Out" />
        <div className="checkout-section pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <p>Loading checkout...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Breadcrumb pageName="Check Out" pageTitle="Check Out" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <BillingDetails />
            </div>
            <aside className="col-lg-5">
              <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
              <Payment />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default checOutPage;
