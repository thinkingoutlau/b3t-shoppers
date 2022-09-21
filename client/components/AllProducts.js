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
    const products = this.props.allProducts;
    const { filter } = this.state;
    products.filter((product) => {
      console.log(product.type);
      if (filter === "Food") return product.type.includes("fish");
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
              <option value="Food">Food</option>
              <option value="Drinks">Drinks</option>
              <option value="Clothes">Clothes</option>
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
                <p>{product.description}</p>
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
