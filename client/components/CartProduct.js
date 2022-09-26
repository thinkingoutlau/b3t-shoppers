import React from "react";
import { connect } from "react-redux";

import {
  deleteProduct,
  updateProduct,
  _deleteGuestProduct,
} from "../store/orders";

class CartProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleGuestUpdate = this.handleGuestUpdate.bind(this);
  }

  async componentDidMount() {
    const isLoggedIn = !!this.props.auth.id;

    if (isLoggedIn) {
      this.setState({
        quantity: this.props.product.order_products.quantity,
      });
    } else {
      this.setState({
        quantity: localStorage.getItem(this.props.product.id),
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUpdate(productId, quantity) {
    const userId = this.props.auth.id;
    const product = {
      productId: productId,
      quantity: quantity,
    };

    this.props.updateCart(userId, product);
  }

  handleGuestUpdate(productId, quantity) {
    localStorage.setItem(productId, quantity);
  }

  handleDelete(productId) {
    const userId = this.props.auth.id;

    this.props.deleteProduct(userId, productId);
  }

  handleGuestDelete(productId) {
    localStorage.removeItem(productId);

    this.props.deleteGuestProduct(productId);
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;

    const product = this.props.product;

    return (
      <div>
        {isLoggedIn ? (
          <div>
            <img src={product.imageURL} />
            {product.name} ${product.order_products.price}
            <input
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={() => this.handleUpdate(product.id, this.state.quantity)}
            >
              save
            </button>
            <button type="button" onClick={() => this.handleDelete(product.id)}>
              delete
            </button>
          </div>
        ) : (
          <div>
            <img src={product.imageURL} />
            {product.name} ${product.price}
            <input
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={() =>
                this.handleGuestUpdate(product.id, this.state.quantity)
              }
            >
              save
            </button>
            <button
              type="button"
              onClick={() => this.handleGuestDelete(product.id)}
            >
              delete
            </button>
          </div>
        )}
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
