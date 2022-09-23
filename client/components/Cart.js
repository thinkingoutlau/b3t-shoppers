import React from "react";
import { connect } from "react-redux";

import { getCurrentOrder } from "../store/orders";

class Cart extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id) {
      this.props.getCart(this.props.auth.id);
    }
  }

  render() {
    let cart = this.props.currentOrder || {};

    return (
      <div>
        {cart.products ? (
          cart.products.map((product) => {
            return (
              <div key={product.id}>
                {product.name} ${product.price}
              </div>
            );
          })
        ) : (
          <p> Nothing in your cart!</p>
        )}
        {}
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
