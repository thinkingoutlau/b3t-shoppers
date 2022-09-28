import React, { useState } from "react";
import { connect } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { clearCart, _clearGuestCart } from "../store/orders";
import { updateInventory } from "../store/singleProduct";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function CartCheckout(props) {
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8080/payment", {
          amount: props.total,
          id,
        });

        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
          if (props.isLoggedIn) {
            props.order.products.forEach((prod) => {
              props.updateInventory(prod.id, {
                inventory: prod.inventory - prod.order_products.quantity,
              });
            });

            props.clearOrder(props.auth.id, { status: "fulfilled" });
          } else {
            props.order.guestCart.forEach((prod) => {
              props.updateInventory(prod.id, {
                inventory: prod.inventory - localStorage.getItem(prod.id),
              });
            });

            props.clearGuestOrder();
            localStorage.clear();
          }
        }
      } catch (e) {
        console.log("error", e);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <div id="pay_button">
            <button>Pay</button>
          </div>
        </form>
      ) : (
        <div>
          <h2>Payment completed</h2>
        </div>
      )}
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

const mapDispatch = (dispatch) => ({
  clearOrder: (id, status) => dispatch(clearCart(id, status)),
  clearGuestOrder: () => dispatch(_clearGuestCart()),
  updateInventory: (id, quantity) => dispatch(updateInventory(id, quantity)),
});

export default connect(mapState, mapDispatch)(CartCheckout);
