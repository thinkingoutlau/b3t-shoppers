import React from "react";
import { connect } from "react-redux";

import { addProduct, getCurrentOrder } from "../store/orders";

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

  handleAddGuestToCart(id, price, quantity) {
    const userId = this.props.auth.id;
    const product = {
      productId: id,
      price: price,
      quantity: quantity,
    };

    this.props.addToCart(userId, product);
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;

    let cart = this.props.currentOrder || {};

    const guestCart = localStorage;
    let guestProducts = Object.keys(guestCart);

    if (isLoggedIn && guestCart.length) {
      guestProducts.forEach((product) => {
        const price = localStorage.getItem(product).price;
        const quantity = localStorage.getItem(product).quantity;
        this.handleAddGuestToCart(product, price, quantity);
        return localStorage.removeItem(product);
      });
    }

    return (
      <div>
        {isLoggedIn ? (
          cart.products ? (
            cart.products.map((product) => {
              return (
                <div key={product.id}>
                  <img src={product.imageURL} />
                  {product.name} ${product.price}
                </div>
              );
            })
          ) : (
            <p> Nothing in your cart!</p>
          )
        ) : guestCart.length ? (
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
  addToCart: (userId, product) => dispatch(addProduct(userId, product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
