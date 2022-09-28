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
      {!success ? (
        <div>
          <div className="checkout_component">
            <div className="checkout_title">
              <img src="/images/100_Bells_NH_Inv_Icon.png" />
              <h2>Checkout</h2>
              <img src="/images/100_Bells_NH_Inv_Icon.png" />
            </div>
            {showOrder.length ? (
              <div className="checkout_avail_text">
                <div className="checkout_items">
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
                            &nbsp;x&nbsp;
                            {props.isLoggedIn
                              ? product.order_products.quantity
                              : localStorage.getItem(product.id)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h3>Total Amount: ${checkOutSum}</h3>
              </div>
            ) : (
              <div className="checkout_avail_text">
                <h3>{"You don't have items to checkout!"}</h3>
              </div>
            )}
          </div>
          <form>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <div id="pay_button">
              <button
                type="button"
                className={showOrder.length ? "" : "disabled"}
                onClick={handleSubmit}
              >
                Pay
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="purchase_confirm">
          <img src="/images/Nook's_Cranny_(Upgraded)_NH_Map_Icon.png" />
          <h2>Purchase completed!</h2>
          <h3>
            Come again soon! <img src="/images/logo.png" />
          </h3>
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
