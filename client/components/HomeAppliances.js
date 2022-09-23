import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class HomeAppliances extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Home Appliances",
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
    const products = this.props.allProducts.filter((product) => {
      if (filter === "All Home Appliances") {
        return product;
      }
      if (filter === "Home Appliances") {
        return product.type.includes("Home Appliances");
      }
      if (filter === "Clocks") {
        return product.type.includes("Clocks");
      }

      if (filter === "Audio") {
        return product.type.includes("Audio");
      }
      if (filter === "TV") {
        return product.type.includes("TV");
      }
      if (filter === "Air Conditioning") {
        return product.type.includes("Air Conditioning");
      }
      if (filter === "Bathroom Things") {
        return product.type.includes("Bathroom Things");
      }
      if (filter === "Bathtub") {
        return product.type.includes("Bathtub");
      }
      if (filter === "Outdoors Decor") {
        return product.type.includes("Outdoors Decor");
      }
      if (filter === "Garden") {
        return product.type.includes("Garden");
      }
    });

    return (
      <>
        <div>
          <p>
            <label className="filterByHomeAppliances"> Filter By:</label>
            <select
              className="filterByHomeAppliances"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Home Appliances">All Home Appliances</option>
              <option value="Air Conditioning">Air Conditioning</option>
              <option value="Audio">Audio</option>
              <option value="Bathroom Things">Bathroom Items</option>
              <option value="Bathtub">Bathtub</option>
              <option value="Clocks">Clocks</option>
              <option value="Garden">Garden</option>
              <option value="Outdoors Decor">Outdoors Decor</option>
              <option value="TV">TV</option>
            </select>
          </p>
        </div>
        <div>
          {products.map((product) => {
            if (
              product.type === "Home Appliances" ||
              product.type === "Clocks" ||
              product.type === "Audio" ||
              product.type === "TV" ||
              product.type === "Air Conditioning" ||
              product.type === "Bathroom Things" ||
              product.type === "Bathtub" ||
              product.type === "Outdoors Decor" ||
              product.type === "Garden"
            ) {
              return (
                <div className="allHomeAppliances" key={product.id}>
                  <h3>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p>
                    <img src={product.imageURL} alt="product image" />
                  </p>
                  <p>{product.price}</p>
                </div>
              );
            }
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ allProducts }) => ({
  allProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(getAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeAppliances);
