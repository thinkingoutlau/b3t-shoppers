import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class Indoors extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Indoor Items",
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { filter } = this.state;
    const { auth } = this.props;

    const products = this.props.allProducts.filter((product) => {
      if (filter === "All Indoor Items") {
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
      if (filter === "Clocks") {
        return product.type.includes("Clocks");
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
      if (filter === "Folk Craft Decor") {
        return product.type.includes("Folk Craft Decor");
      }
      if (filter === "Home Appliances") {
        return product.type.includes("Home Appliances");
      }
      if (filter === "House Door Decor") {
        return product.type.includes("House Door Decor");
      }
      if (filter === "Sofa") {
        return product.type.includes("Sofa");
      }
      if (filter === "Table") {
        return product.type.includes("Table");
      }
      if (filter === "TV") {
        return product.type.includes("TV");
      }
    });

    return (
      <>
        <div>
          <p>
            <label className="filterByIndoorItems"> Filter By:</label>
            <select
              className="filterByIndoorItems"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Indoor Items">All Home Appliances</option>
              <option value="Air Conditioning">Air Conditioning</option>
              <option value="Arch">Arch</option>
              <option value="Audio">Audio</option>
              <option value="Bathroom Things">Bathroom Items</option>
              <option value="Bathtub">Bathtub</option>
              <option value="Bed">Bed</option>
              <option value="Chair">Chair</option>
              <option value="Clocks">Clocks</option>
              <option value="Decor">Decor</option>
              <option value="Desk">Desk</option>
              <option value="Dresser">Dresser</option>
              <option value="Folk Craft Decor">Folk Craft Decor</option>
              <option value="House Door Decor">House Door Decor</option>
              <option value="Sofa">Sofa</option>
              <option value="Table">Table</option>
              <option value="TV">TV</option>
            </select>
          </p>
        </div>
        <div className="products">
          {products.map((product) => {
            if (
              product.type === "Home Appliances" ||
              product.type === "Air Conditioning" ||
              product.type === "Arch" ||
              product.type === "Audio" ||
              product.type === "Bathroom Things" ||
              product.type === "Bathtub" ||
              product.type === "Bed" ||
              product.type === "Clocks" ||
              product.type === "Chair" ||
              product.type === "Decor" ||
              product.type === "Desk" ||
              product.type === "Dresser" ||
              product.type === "Folk Craft Decor" ||
              product.type === "House Door Decor" ||
              product.type === "Sofa" ||
              product.type === "Table" ||
              product.type === "TV"
            ) {
              return (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <div className="productCard">
                    <h3>{product.name}</h3>
                    <img
                      src={product.imageURL}
                      alt="product image"
                      className="product_image"
                    />
                    <p>${product.price}</p>
                    {auth.isAdmin ? (
                      <button type="button" className="all_products_actions">
                        Remove product
                      </button>
                    ) : (
                      <button type="button" className="all_products_actions">
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Indoors);
