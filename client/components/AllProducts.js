import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProducts, deleteProduct } from "../store/allProducts";
import { addProduct } from "../store/orders";
import { getUserFromServer } from "../store/user";

class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Products",
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
  }

  handleAddToCart() {
    const userId = this.props.auth.id;
    const product = {
      productId: this.props.product.id,
      price: this.props.product.price,
      quantity: "1",
    };

    this.props.addToCart(userId, product);
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
      if (filter === "All Products") {
        return product;
      }
      if (filter === "Air Conditioning") {
        return product.type.includes("Air Conditioning");
      }
      if (filter === "Arch") {
        return product.type.includes("Arch");
      }
      if (filter === "Audio") {
        return product.type.includes("Audio");
      }
      if (filter === "Bathroom Things") {
        return product.type.includes("Bathroom Things");
      }
      if (filter === "Bathtub") {
        return product.type.includes("Bathtub");
      }
      if (filter === "Bed") {
        return product.type.includes("Bed");
      }
      if (filter === "Chair") {
        return product.type.includes("Chair");
      }
      if (filter === "Decor") {
        return product.type.includes("Decor");
      }
      if (filter === "Desk") {
        return product.type.includes("Desk");
      }
      if (filter === "Dresser") {
        return product.type.includes("Dresser");
      }
      if (filter === "Easter") {
        return product.type.includes("Easter");
      }
      if (filter === "Fish") {
        return product.type.includes("foodFish");
      }
      if (filter === "Folk Craft Decor") {
        return product.type.includes("Folk Craft Decor");
      }
      if (filter === "Fossils") {
        return product.type.includes("fossils");
      }
      if (filter === "Garden") {
        return product.type.includes("Garden");
      }
      if (filter === "Home Appliances") {
        return product.type.includes("Home Appliances");
      }
      if (filter === "House Door Decor") {
        return product.type.includes("House Door Decor");
      }
      if (filter === "Insect") {
        return product.type.includes("Insect");
      }
      if (filter === "Outdoors Decor") {
        return product.type.includes("Outdoors Decor");
      }
      if (filter === "Sofa") {
        return product.type.includes("Sofa");
      }
      if (filter === "Table") {
        return product.type.includes("Table");
      }
      if (filter === "Toy") {
        return product.type.includes("Toy");
      }
      if (filter === "Seasonal Decor") {
        return product.type.includes("Seasonal Decor");
      }
    });

    return (
      <>
        <div>
          <p>
            <label className="filterByProducts"> Filter By:</label>
            <select
              className="filterByProducts"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Products">All Products</option>
              <option value="Air Conditioning">Air Conditioning</option>
              <option value="Arch">Arch</option>
              <option value="Audio">Audio</option>
              <option value="Bathroom Things">Bathroom Things</option>
              <option value="Bathtub">Bathtub</option>
              <option value="Bed">Bed</option>
              <option value="Chair">Chair</option>
              <option value="Decor">Decor</option>
              <option value="Desk">Desk</option>
              <option value="Dresser">Dresser</option>
              <option value="Easter">Easter</option>
              <option value="Fish">Fish</option>
              <option value="Folk Craft Decor">Folk Craft Decor</option>
              <option value="Fossils">Fossils</option>
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
        </div>
        <div className="products">
          {products.map((product) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
