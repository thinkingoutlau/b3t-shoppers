import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProducts, deleteProduct } from "../store/allProducts";
import { addProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

class Food extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Foods",
      currentPage: 1,
      productsPerPage: 9,
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  //only grab the food products
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
  }

  handleCardClick(event) {
    if (event.target.className === "all_products_actions") {
      event.preventDefault();
    }
  }

  handlePrevious = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };
  handleNext = () => {
    const productsLength = this.props.allProducts.length;
    if (productsLength / this.state.productsPerPage > this.state.currentPage) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  render() {
    const { filter } = this.state;
    const { auth } = this.props;
    const isLoggedIn = !!this.props.auth.id;

    const products = this.props.allProducts.filter((product) => {
      if (filter === "All Foods") {
        return product.type.includes("foodFish");
      }
      if (filter === "Fish") {
        return product.type.includes("foodFish");
      }
    });

    return (
      <>
        <div>
          <p>
            <label className="filterByFoods"> Filter By:</label>
            <select
              className="filterByFoods"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Foods">All Foods</option>
              <option value="Fish">Fish</option>
            </select>
          </p>
        </div>
        <button onClick={this.handlePrevious}> &laquo; Previous </button>&nbsp;
        {this.state.currentPage}&nbsp;
        <button onClick={this.handleNext}>Next &raquo;</button>
        <div className="products">
          {products.map((product, index) => {
            if (product.type === "foodFish") {
              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  onClick={this.handleCardClick}
                >
                  <div className="productCard">
                    <h3>{product.name}</h3>
                    <img
                      src={product.imageURL}
                      alt="product image"
                      className="product_image"
                    />
                    <p>${product.price}</p>
                    {auth.isAdmin ? (
                      <button
                        type="button"
                        className="all_products_actions"
                        id={product.id}
                        onClick={() => this.props.deleteProduct(product.id)}
                      >
                        Remove product
                      </button>
                    ) : isLoggedIn ? (
                      <button
                        type="button"
                        className="all_products_actions"
                        onClick={this.handleAddToCart}
                      >
                        Add to cart!
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="all_products_actions"
                        onClick={this.handleGuestAddToCart}
                      >
                        Add to cart!
                      </button>
                    )}
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.allProducts,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(getAllProducts()),
  addToCart: (userId, product) => dispatch(addProduct(userId, product)),
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Food);
