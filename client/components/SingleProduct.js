import React from "react";
import { connect } from "react-redux";
import { gotSingleProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id);
  }

  render() {
    console.log("this.props.product", this.props.product);
    return (
      <div>
        <h1>This item's name is:{this.props.product.name}</h1>
        <img src={this.props.product.imageUrl} alt="product icon"></img>
        <h1>This item's description is:{this.props.product.description}</h1>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
