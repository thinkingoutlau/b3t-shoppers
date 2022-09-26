import React from "react";
import { connect } from "react-redux";

import { gotSingleProduct } from "../store/singleProduct";
import { deleteProduct } from "../store/allProducts";
import { addProduct, addGuestProduct } from "../store/orders";
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
    if (!this.props.order.products.includes(this.props.product.id)) {
      const userId = this.props.auth.id;
      const product = {
        productId: this.props.product.id,
        price: this.props.product.price,
        quantity: this.state.quantity,
      };

      this.props.addToCart(userId, product);
    }
  }

  handleGuestAddToCart() {
    if (
      !Object.keys(localStorage).includes(JSON.stringify(this.props.product.id))
    ) {
      localStorage.setItem(this.props.product.id, this.state.quantity);

      this.props.addGuestProduct(this.props.product.id);
    }
  }

  render() {
    const isLoggedIn = !!this.props.auth.id;
    const { auth } = this.props;

    console.log(this.props.product.inventory);

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
            <div>Inventory</div>
            <input
              name="inventory"
              onChange={this.handleChange}
              value={this.state.quantity}
            ></input>
            <button
              type="button"
              className="single_product_action_buttons"
              id={this.props.product.id}
              onClick={() => this.props.deleteProduct(this.props.product.id)}
            >
              Remove product
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
