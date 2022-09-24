import React from "react";
import { connect } from "react-redux";

import { getCurrentOrder } from "../store/orders";

class Cart extends React.Component {
  componentDidUpdate(prevProps) {
    if (!!this.props.auth.id) {
      if (this.props.auth.id !== prevProps.auth.id) {
        this.props.getCart(this.props.auth.id);
      }
    }
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;

    let cart = this.props.currentOrder || {};
    const guestCart = localStorage;
    let products = Object.keys(guestCart);

    console.log(products);

    return (
      <div>
        {isLoggedIn ? (
          cart.products ? (
            cart.products.map((product) => {
              return (
                <div key={product.id}>
                  {product.name} ${product.price}
                </div>
              );
            })
          ) : (
            <p> Nothing in your cart!</p>
          )
        ) : (
          products.map((product) => {
            return (
              <div key={product}>
                <img src={JSON.parse(localStorage.getItem(product)).image} />
                <p>{JSON.parse(localStorage.getItem(product)).name}</p>
                <p>${JSON.parse(localStorage.getItem(product)).price}</p>
                <p>{JSON.parse(localStorage.getItem(product)).quantity}</p>
              </div>
            );
          })
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
