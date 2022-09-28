import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CartCheckout from "./CartCheckout";

//maybe need to log in for this key
const PUBLIC_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer({ isLoggedIn, order }) {
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <CartCheckout />
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
