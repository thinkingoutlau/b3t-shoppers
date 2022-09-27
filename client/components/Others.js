import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProducts, deleteProduct } from "../store/allProducts";
import { addProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

class Others extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Others",
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
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

  render() {
    const { filter } = this.state;
    const { auth } = this.props;
    const isLoggedIn = !!this.props.auth.id;

    const products = this.props.allProducts.filter((product) => {
      if (filter === "All Others") {
        return product;
      }
      if (filter === "Easter") {
        return product.type.includes("Easter");
      }
      if (filter === "Game Console") {
        return product.type.includes("Game Console");
      }
      if (filter === "Insect") {
        return product.type.includes("Insect");
      }
      if (filter === "Seasonal Decor") {
        return product.type.includes("Seasonal Decor" || "Seasonal decor");
      }
      if (filter === "Toy") {
        return product.type.includes("Toy");
      }
    });

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
              <option value="All Others">All Others</option>
              <option value="Easter">Easter</option>
              <option value="Game Console">Game Console</option>
              <option value="Insect">Insect</option>
              <option value="Seasonal Decor">Seasonal Decor</option>
              <option value="Toy">Toy</option>
            </select>
          </p>
          <Link to="/newProductForm">
            <button type="button" className="all_products_actions">
              Add New Product
            </button>
          </Link>
        </div>
        <div className="products">
          {products.map((product) => {
            if (
              product.type === "Easter" ||
              product.type === "Game Console" ||
              product.type === "Insect" ||
              product.type === "Seasonal Decor" ||
              product.type === "Toy"
            ) {
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
  order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(getAllProducts()),
  addToCart: (userId, product) => dispatch(addProduct(userId, product)),
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Others);
