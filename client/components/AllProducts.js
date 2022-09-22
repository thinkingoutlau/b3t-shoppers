import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Products",
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
      if (filter === "All Products") {
        return product;
      }
      if (filter === "Fish") {
        return product.type.includes("fish");
      }
      if (filter === "Sea Creatures") {
        return product.type.includes("sea creatures");
      }
      if (filter === "Bugs") {
        return product.type.includes("bugs");
      }
      if (filter === "Fossils") {
        return product.type.includes("fossils");
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
              <option value="Fish">Fish</option>
              <option value="Sea Creatures">Sea Creatures</option>
              <option value="Bugs">Bugs</option>
              <option value="Fossils">Fossils</option>
            </select>
          </p>
        </div>
        <div>
          {products.map((product) => {
            return (
              <div className="allProducts" key={product.id}>
                <h3>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p>
                  <img src={product.imageURL} alt="product image" />
                </p>
                <p>{product.price}</p>
              </div>
            );
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
