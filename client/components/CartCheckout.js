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
      iconColor: "#aac0aa",
      color: "#aac0aa",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#aac0aa" },
      "::placeholder": { color: "#aac0aa" },
    },
    invalid: {
      iconColor: "#aac0aa",
      color: "#aac0aa",
    },
  },
};

function CartCheckout(props) {
  const [success, setSuccess] = useState(false);

  let showOrder;
  props.isLoggedIn
    ? (showOrder = props.order.products)
    : (showOrder = props.order.guestCart);

  let prices = showOrder.map((prod) => {
    let price;
    props.isLoggedIn
      ? (price = prod.order_products.price * prod.order_products.quantity)
      : (price = prod.price * Number(localStorage.getItem(prod.id)));
    return price;
  });

  const checkOutSum = prices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

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
          amount: checkOutSum,
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
      <div>
        <h2>Checkout</h2>
        {showOrder.map((product) => {
          return (
            <div className="checkout_prod_info" key={product.id}>
              <img src={product.imageURL} />
              <div>
                <h2>{product.name}</h2>
                <p>
                  $
                  {props.isLoggedIn
                    ? product.order_products.price
                    : product.price}
                  x
                  {props.isLoggedIn
                    ? product.order_products.quantity
                    : localStorage.getItem(product.id)}
                </p>
              </div>
            </div>
          );
        })}
        <h2>
          {checkOutSum
            ? `Total Amount: $${checkOutSum}`
            : "Nothing to checkout!"}
        </h2>
      </div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <div id="pay_button">
            <button
              type="button"
              className={showOrder.length ? "" : "disabled"}
            >
              Pay
            </button>
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
