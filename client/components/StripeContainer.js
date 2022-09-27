import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CartCheckOut from "./CartCheckOut";

//maybe need to log in for this key
const PUBLIC_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <CartCheckOut />
    </Elements>
  );
}
