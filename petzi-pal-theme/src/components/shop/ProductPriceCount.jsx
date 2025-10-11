import { useRouter } from "next/router";
import React, { useReducer, useEffect } from "react";

const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "set":
      return { count: action.payload };
    default:
      throw new Error();
  }
}

function ProductPriceCount({ price, quantity, onQuantityChange }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentRoute = useRouter().pathname;

  // Update internal state when quantity prop changes
  useEffect(() => {
    if (quantity !== undefined) {
      dispatch({ type: "set", payload: quantity });
    }
  }, [quantity]);

  const increment = () => {
    const newCount = state.count + 1;
    dispatch({ type: "increment" });
    if (onQuantityChange) {
      onQuantityChange(newCount);
    }
  };

  const decrement = () => {
    if (state.count > 1) {
      const newCount = state.count - 1;
      dispatch({ type: "decrement" });
      if (onQuantityChange) {
        onQuantityChange(newCount);
      }
    }
  };
  return (
    <div className="product-total d-flex align-items-center">
      <div className="quantity">
        <div className="quantity d-flex align-items-center">
          <div className="quantity-nav nice-number d-flex align-items-center">
            <button onClick={decrement} type="button">
              <i className="bi bi-dash"></i>
            </button>
            <span
              style={{
                margin: "0 15px",
                fontFamily: "var(--font-cabin)",
                color: "var(--title-color1)",
                fontSize: "16px",
              }}
            >
              {state.count}
            </span>
            <button onClick={increment} type="button">
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>
      {currentRoute === "/shop-details" ? (
        ""
      ) : (
        <strong>
          {" "}
          <i className="bi bi-x-lg px-2" />
          <span
            className="product-price"
            style={{
              margin: "0 px",
              fontFamily: "var(--font-cabin)",
              color: "var(--title-color1)",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Rs. {state.count * price}
          </span>
        </strong>
      )}
    </div>
  );
}
export default ProductPriceCount;
