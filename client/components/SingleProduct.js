import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { gotSingleProduct } from "../store/singleProduct";
import { deleteProduct, editProduct } from "../store/allProducts";
import { addProduct, addGuestProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

class SingleProduct extends React.Component {
  constructor() {
    super();

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleGuestAddToCart = this.handleGuestAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id);
  }

  handleAddToCart() {
    const productsIds = this.props.order.products.map((prod) => prod.id);

    if (!productsIds.includes(this.props.product.id)) {
      const userId = this.props.auth.id;
      const product = {
        productId: this.props.product.id,
        price: this.props.product.price,
        quantity: 1,
      };

      this.props.addToCart(userId, product);

      document.getElementById("hidden_added_cart").id = "shown_added_cart";
      setTimeout(() => {
        document.getElementById("shown_added_cart").id = "hidden_added_cart";
      }, 3000);
    } else {
      if (!document.getElementById("shown_added_cart")) {
        document.getElementById("hidden_dupe_error").id = "shown_dupe_error";
        setTimeout(() => {
          document.getElementById("shown_dupe_error").id = "hidden_dupe_error";
        }, 3000);
      }
    }
  }

  handleGuestAddToCart() {
    const localStorageKeys = Object.keys(localStorage);

    if (!localStorageKeys.includes(JSON.stringify(this.props.product.id))) {
      localStorage.setItem(this.props.product.id, 1);

      this.props.addGuestProduct(this.props.product.id);

      document.getElementById("hidden_added_cart").id = "shown_added_cart";
      setTimeout(() => {
        document.getElementById("shown_added_cart").id = "hidden_added_cart";
      }, 3000);
    } else {
      if (!document.getElementById("shown_added_cart")) {
        document.getElementById("hidden_dupe_error").id = "shown_dupe_error";
        setTimeout(() => {
          document.getElementById("shown_dupe_error").id = "hidden_dupe_error";
        }, 3000);
      }
    }
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
            <Link to={`/productForm/${this.props.product.id}`}>
              <button type="button" className="single_product_action_buttons">
                Edit product
              </button>
            </Link>
          </div>
        ) : isLoggedIn ? (
          <div className="single_product_actions">
            <button
              type="button"
              className="single_product_action_buttons"
              onClick={this.handleAddToCart}
            >
              Add to cart!
            </button>
            <div className="cart_alerts">
              <p id="hidden_added_cart">Added!</p>
              <p id="hidden_dupe_error">Item already in cart</p>
            </div>
            <div className="wl_alerts">
              <p id="hidden_added_wl">Added!</p>
            </div>
            <button type="button" className="single_product_action_buttons">
              Add to wish list!
            </button>
          </div>
        ) : (
          <div className="single_product_actions">
            <button
              type="button"
              className="single_product_action_buttons"
              onClick={this.handleGuestAddToCart}
            >
              Add to cart!
            </button>
            <div className="cart_alerts">
              <p id="hidden_added_cart">Added!</p>
              <p id="hidden_dupe_error">Item already in cart</p>
            </div>
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
    order: state.currentOrder,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    gotSingleProduct: (id) => dispatch(gotSingleProduct(id, history)),
    addToCart: (userId, product) => dispatch(addProduct(userId, product)),
    getUserFromServer: (username) => dispatch(getUserFromServer(username)),
    addGuestProduct: (prodId) => dispatch(addGuestProduct(prodId)),
    deleteProduct: (id) => dispatch(deleteProduct(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
