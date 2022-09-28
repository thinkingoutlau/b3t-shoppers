import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllProducts,
  deleteProduct,
  filterByTag,
  filterByMultipleTags,
} from "../store/allProducts";
import { addProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

class Outdoors extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Outdoor Items",
      currentPage: 1,
      productsPerPage: 9,
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    this.props.filterByMultipleTags(["Outdoors Decor,Garden"]);
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
    this.setState({ currentPage: 1 });
    if (event.target.value === "All Outdoor Items") {
      return this.props.filterByTag("Garden");
    } else {
      this.props.filterByTag(event.target.value);
    }
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

    return (
      <>
        <div className="all-products-functions">
          <p>
            <label className="filter-products-label"> Filter By:</label>
            <select
              className="filter-products"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Outdoor Items">All Outdoor Items</option>
              <option value="Outdoors Decor">Outdoors Decor</option>
              <option value="Garden">Garden</option>
            </select>
          </p>
          {auth.isAdmin ? (
            <Link to="/newProductForm">
              <button type="button" className="all_products_actions">
                Add New Product
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="products">
          {this.props.allProducts.map((product, index) =>
            index >=
              (this.state.currentPage - 1) * this.state.productsPerPage &&
            index < this.state.currentPage * this.state.productsPerPage ? (
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
            ) : (
              ""
            )
          )}
        </div>
        <div className="pagination">
          <button
            onClick={this.handlePrevious}
            className="all_products_actions"
          >
            {" "}
            &laquo; Previous{" "}
          </button>
          &nbsp;
          <strong>{this.state.currentPage}</strong>&nbsp;
          <button onClick={this.handleNext} className="all_products_actions">
            Next &raquo;
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.allProducts,
  auth: state.auth,
  order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(getAllProducts()),
  addToCart: (userId, product) => dispatch(addProduct(userId, product)),
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
  filterByTag: (tagname) => dispatch(filterByTag(tagname)),
  filterByMultipleTags: (tags) => dispatch(filterByMultipleTags(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Outdoors);
