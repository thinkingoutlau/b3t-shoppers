import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CartCheckOut from "./CartCheckOut";

//maybe need to log in for this key
const PUBLIC_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer({ isLoggedIn, order }) {
  let showOrder;
  isLoggedIn ? (showOrder = order.products) : (showOrder = order.guestCart);

  let prices = showOrder.map((prod) => {
    let price;
    isLoggedIn
      ? (price = prod.order_products.price * prod.order_products.quantity)
      : (price = prod.price * Number(localStorage.getItem(prod.id)));
    return price;
  });

  const checkOutSum = prices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return (
    <div>
      <div>
        <h2>Checkout</h2>
        {showOrder.map((product) => {
          return (
            <div className="checkout_prod_info" key={product.id}>
              <img src={product.imageURL} />
              <div>
                <h2>{product.name}</h2>
                <p>
                  ${isLoggedIn ? product.order_products.price : product.price} x
                  {isLoggedIn
                    ? product.order_products.quantity
                    : localStorage.getItem(product.id)}
                </p>
              </div>
            </div>
          );
        })}
        <h2>Total Amount: {checkOutSum}</h2>
      </div>
      <Elements stripe={stripeTestPromise}>
        <CartCheckOut total={checkOutSum} />
      </Elements>
    </div>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    order: state.currentOrder,
  };
};

export default connect(mapState)(StripeContainer);
