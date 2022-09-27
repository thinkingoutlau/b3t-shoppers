import React from "react";
import { connect } from "react-redux";

class CartCheckout extends React.Component {
  render() {
    return <div>Hello from Checkout</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    order: state.currentOrder,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateCart: (id, product) => dispatch(updateProduct(id, product)),
  deleteProduct: (id, productId) => dispatch(deleteProduct(id, productId)),
  deleteGuestProduct: (id) => dispatch(_deleteGuestProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartCheckout);
