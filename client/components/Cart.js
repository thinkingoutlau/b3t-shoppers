import React from "react";
import { connect } from "react-redux";

import {
  addProduct,
  getCurrentOrder,
  updateProduct,
  addGuestProduct,
  _clearGuestProduct,
} from "../store/orders";

import CartProduct from "./CartProduct";

class Cart extends React.Component {
  constructor() {
    super();

    this.handleAddGuestToCart = this.handleAddGuestToCart.bind(this);
  }

  componentDidMount() {
    if (localStorage) {
      const guestCart = localStorage;
      const guestProdIds = Object.keys(guestCart);

      if (guestProdIds.length !== this.props.currentOrder.products.length) {
        guestProdIds.map((prodId) => {
          if (prodId !== "token") {
            return this.props.addGuestProduct(prodId);
          }
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.auth.id) {
      if (this.props.auth.id !== prevProps.auth.id) {
        this.props.getCart(this.props.auth.id);

        const guestCart = localStorage;
        const guestProdIds = Object.keys(guestCart);

        if (guestProdIds.length !== this.props.currentOrder.products.length) {
          guestProdIds.forEach((prodId) => {
            if (prodId !== "token") {
              this.props.addGuestProduct(prodId);

              const userId = this.props.auth.id;

              this.props.currentOrder.guestCart.forEach((prod) => {
                const guestProdInfo = {
                  productId: prod.id,
                  price: prod.price,
                  quantity: Number(localStorage.getItem(prodId)),
                };

                this.props.addToCart(userId, guestProdInfo);
              });

              localStorage.removeItem(prodId);
            }
          });
        }
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

    this.props.addToCart(userId, product);
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;

    const cart = this.props.currentOrder || {};
    const cartProducts = cart.products || [];
    const guestCartProducts = cart.guestCart || [];

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
        ) : guestCartProducts.length ? (
          guestCartProducts.map((product) => {
            return <CartProduct product={product} key={product.id} />;
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
  addGuestProduct: (prodId) => dispatch(addGuestProduct(prodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
