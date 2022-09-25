import React from "react";
import { connect } from "react-redux";

import { addProduct, getCurrentOrder, updateProduct } from "../store/orders";

import CartProduct from "./CartProduct";

class Cart extends React.Component {
  constructor() {
    super();

    this.handleAddGuestToCart = this.handleAddGuestToCart.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.auth.id) {
      if (this.props.auth.id !== prevProps.auth.id) {
        this.props.getCart(this.props.auth.id);
      }
    }
  }

  handleAddGuestToCart(productId, price, quantity) {
    const userId = this.props.auth.id;
    const product = {
      productId: productId,
      price: price,
      quantity: quantity,
    };

    //BUG: localstorage not giving proper quantity?
    this.props.addToCart(userId, product);
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;

    const cart = this.props.currentOrder || {};
    const cartProducts = cart.products || [];

    const guestCart = localStorage;
    const guestProducts = Object.keys(guestCart);

    if (isLoggedIn) {
      guestProducts.forEach((product) => {
        if (product !== "token") {
          const price = localStorage.getItem(product).price;
          const quantity = localStorage.getItem(product).quantity;
          this.handleAddGuestToCart(product, price, quantity);
          return localStorage.removeItem(product);
        }
      });
    }

    return (
      <div>
        {isLoggedIn ? (
          cartProducts.length ? (
            cartProducts.map((product) => {
              return <CartProduct product={product} key={product.id} />;
            })
          ) : (
            <p> Nothing in your cart!</p>
          )
        ) : guestCart.length && !guestCart.token ? (
          guestProducts.map((product) => {
            return (
              <div key={product}>
                <img src={JSON.parse(localStorage.getItem(product)).image} />
                <p>{JSON.parse(localStorage.getItem(product)).name}</p>
                <p>${JSON.parse(localStorage.getItem(product)).price}</p>
                <p>{JSON.parse(localStorage.getItem(product)).quantity}</p>
              </div>
            );
          })
        ) : (
          <p> Nothing in your cart! </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentOrder: state.currentOrder,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCart: (id) => dispatch(getCurrentOrder(id)),
  addToCart: (id, product) => dispatch(addProduct(id, product)),
  updateCart: (id, product) => dispatch(updateProduct(id, product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
