import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  componentDidMount() {}

  render() {
    return <div>Hello from Cart</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    gotSingleProduct: (id) => dispatch(gotSingleProduct(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
