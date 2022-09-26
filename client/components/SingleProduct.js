import React from "react";
import { connect } from "react-redux";

import { gotSingleProduct } from "../store/singleProduct";
import { deleteProduct, editProduct } from "../store/allProducts";
import { addProduct, _addGuestProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleGuestAddToCart = this.handleGuestAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleAddToCart() {
    const userId = this.props.auth.id;
    const product = {
      productId: this.props.product.id,
      price: this.props.product.price,
      quantity: this.state.quantity,
    };

    this.props.addToCart(userId, product);
  }

  handleGuestAddToCart() {
    let guestProducts = localStorage.setItem(
      this.props.product.id,
      JSON.stringify({
        name: this.props.product.name,
        image: this.props.product.imageURL,
        price: this.props.product.price,
        quantity: this.state.quantity,
      })
    );

    this.props.addGuestProduct(guestProducts);
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;
    const { auth } = this.props;

    return (
      <div className="single_product">
        <div className="single_product_img">
          <img src={this.props.product.imageURL} alt="product icon" />
        </div>
        <div className="single_product_info">
          <h1>{this.props.product.name}</h1>
          <h3>Current price: ${this.props.product.price}</h3>
          <p>{this.props.product.description}</p>
        </div>
        {auth.isAdmin ? (
          <div className="single_product_actions">
            <p>Inventory: {this.props.product.inventory}</p>
            <button
              type="button"
              className="single_product_action_buttons"
              id={this.props.product.id}
              onClick={() => this.props.deleteProduct(this.props.product.id)}
            >
              Remove product
            </button>
            <button type="button" className="single_product_action_buttons">
              Edit product
            </button>
          </div>
        ) : isLoggedIn ? (
          <div className="single_product_actions">
            <div>Quantity:</div>
            <input
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            ></input>
            <button
              type="button"
              className="single_product_action_buttons"
              onClick={this.handleAddToCart}
            >
              Add to cart!
            </button>
            <button type="button" className="single_product_action_buttons">
              Add to wish list!
            </button>
          </div>
        ) : (
          <div className="single_product_actions">
            <div>Quantity</div>
            <input
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            ></input>
            <button
              type="button"
              className="single_product_action_buttons"
              onClick={this.handleGuestAddToCart}
            >
              Add to cart!
            </button>
            <button type="button" className="single_product_action_buttons">
              Add to wish list!
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    auth: state.auth,
    order: state.order,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    gotSingleProduct: (id) => dispatch(gotSingleProduct(id, history)),
    addToCart: (userId, product) => dispatch(addProduct(userId, product)),
    getUserFromServer: (username) => dispatch(getUserFromServer(username)),
    addGuestProduct: (products) => dispatch(_addGuestProduct(products)),
    deleteProduct: (id) => dispatch(deleteProduct(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
