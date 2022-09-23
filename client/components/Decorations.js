import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class Decorations extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Decorations",
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
      if (filter === "All Decorations") {
        return product;
      }
      if (filter === "Arch") {
        return product.type.includes("Arch");
      }
      if (filter === "Folk Craft Decor") {
        return product.type.includes("Folk Craft Decor");
      }
      if (filter === "House Door Decor") {
        return product.type.includes("House Door Decor");
      }
      if (filter === "Decor") {
        return product.type.includes("Decor");
      }
      if (filter === "Seasonal Decor") {
        return product.type.includes("Seasonal Decor");
      }
    });

    return (
      <>
        <div>
          <p>
            <label className="filterByDecorations"> Filter By:</label>
            <select
              className="filterByDecorations"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Decorations">All Decorations</option>
              <option value="Arch">Arch</option>
              <option value="Folk Craft Decor">Folk Craft Decor</option>
              <option value="House Door Decor">House Door Decor</option>
              <option value="Decor">Decor</option>
              <option value="Seasonal Decor">Seasonal Decor</option>
            </select>
          </p>
        </div>
        <div>
          {products.map((product) => {
            if (
              product.type === "Arch" ||
              product.type === "Folk Craft Decor" ||
              product.type === "House Door Decor" ||
              product.type === "Decor" ||
              product.type === "Seasonal Decor"
            ) {
              return (
                <div className="allDecorations" key={product.id}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Decorations);
