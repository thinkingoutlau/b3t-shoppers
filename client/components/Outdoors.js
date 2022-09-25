import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class Outdoors extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Outdoor Items",
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
      if (filter === "All Outdoor Items") {
        return product;
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
            <label className="filterByOutdoorItems"> Filter By:</label>
            <select
              className="filterByOutdoorItems"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Outdoor Items">All Outdoor Items</option>
              <option value="Outdoors Decor">Outdoors Decor</option>
              <option value="Garden">Garden</option>
            </select>
          </p>
        </div>
        <div className="products">
          {products.map((product) => {
            if (
              product.type === "Outdoors Decor" ||
              product.type === "Garden"
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

export default connect(mapStateToProps, mapDispatchToProps)(Outdoors);
