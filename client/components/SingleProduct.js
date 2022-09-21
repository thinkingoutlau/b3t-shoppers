import React from "react";
import { connect } from "react-redux";
import { gotSingleProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id);
  }

  render() {
    console.log(this.props.product);
    return (
      <div className="single_product">
        <div className="single_product_img">
          <img src={this.props.product.imageURL} alt="product icon" />
        </div>
        <div className="single_product_info">
          <h1>{this.props.product.name}</h1>
          <h2>Current price: {this.props.product.price}</h2>
          <h3>{this.props.product.description}</h3>
        </div>
        <div className="single_product_actions">
          <button type="button" className="single_product_action_buttons">
            Add to cart!
          </button>
          <button type="button" className="single_product_action_buttons">
            Add to wish list!
          </button>
        </div>
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
