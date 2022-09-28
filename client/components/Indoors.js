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

class Indoors extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Indoor Items",
      currentPage: 1,
      productsPerPage: 9,
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    this.props.filterByMultipleTags(
      "Air Conditioning,Arch,Audio,Bathroom Things,Bathtub,Bed,Chair,Desk,Dresser,Folk Craft Decor,House Door Decor,Sofa,Table,TV"
    );
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
    this.setState({ currentPage: 1 });
    if (event.target.value === "All Indoor Items") {
      this.props.filterByMultipleTags(
        "Air Conditioning,Arch,Audio,Bathroom Things,Bathtub,Bed,Chair,Desk,Dresser,Folk Craft Decor,House Door Decor,Sofa,Table,TV"
      );
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
              <option value="All Indoor Items">All Indoor Items</option>
              <option value="Air Conditioning">Air Conditioning</option>
              <option value="Arch">Arch</option>
              <option value="Audio">Audio</option>
              <option value="Bathroom Things">Bathroom Items</option>
              <option value="Bathtub">Bathtub</option>
              <option value="Bed">Bed</option>
              <option value="Chair">Chair</option>
              <option value="Desk">Desk</option>
              <option value="Dresser">Dresser</option>
              <option value="Folk Craft Decor">Folk Craft Decor</option>
              <option value="House Door Decor">House Door Decor</option>
              <option value="Sofa">Sofa</option>
              <option value="Table">Table</option>
              <option value="TV">TV</option>
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
        <button onClick={this.handlePrevious}> &laquo; Previous </button>&nbsp;
        {this.state.currentPage}&nbsp;
        <button onClick={this.handleNext}>Next &raquo;</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Indoors);
