import React from "react";
import { connect } from "react-redux";

import { getOrder } from "../store/order";

class Cart extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id) {
      this.props.getCart(this.props.auth.id);
    }
  }

  render() {
    let cart = {
      products: [],
    };

    this.props.order.forEach((obj) => {
      if (obj.status === "unfulfilled") {
        cart = obj;
        return cart;
      }
    });

    return (
      <div>
        {cart.products.map((product) => {
          return (
            <div key={product.id}>
              {product.name} ${product.price}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    order: state.order,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCart: (id) => dispatch(getOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
