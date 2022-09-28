import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllProducts,
  deleteProduct,
  filterByTag,
} from "../store/allProducts";
import { addProduct, addGuestProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

// change page back to 1 when filtering
class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Products",
      currentPage: 1,
      productsPerPage: 9,
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
    this.setState({ currentPage: 1 });
    if (event.target.value === "All Products") {
      return this.props.getAllProducts();
    } else {
      this.props.filterByTag(event.target.value);
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

  handleCardClick(event) {
    if (event.target.className === "all_products_actions") {
      event.preventDefault();
    }
  }

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
              onChange={(event) => this.handleFilter(event)}
            >
              <option value="All Products">All Products</option>
              <option value="Air Conditioning">Air Conditioning</option>
              <option value="Arch">Arch</option>
              <option value="Audio">Audio</option>
              <option value="Bathroom Things">Bathroom Things</option>
              <option value="Bathtub">Bathtub</option>
              <option value="Bed">Bed</option>
              <option value="Chair">Chair</option>
              <option value="Desk">Desk</option>
              <option value="Dresser">Dresser</option>
              <option value="Easter">Easter</option>
              <option value="Fish">Fish</option>
              <option value="Folk Craft Decor">Folk Craft Decor</option>
              <option value="fossils">Fossils</option>
              <option value="Garden">Garden</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="House Door Decor">House Door Decor</option>
              <option value="Insect">Insect</option>
              <option value="Outdoors Decor">Outdoor Decor</option>
              <option value="Seasonal Decor">Seasonal Decor</option>
              <option value="Sofa">Sofa</option>
              <option value="Table">Table</option>
              <option value="Toy">Toy</option>
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
        <div>
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
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
  filterByTag: (tagname) => dispatch(filterByTag(tagname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
