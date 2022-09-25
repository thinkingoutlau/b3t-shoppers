import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class Food extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Foods",
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
      if (filter === "All Foods") {
        return product.type.includes("foodFish");
      }
      if (filter === "Fish") {
        return product.type.includes("foodFish");
      }
    });

    return (
      <>
        <div>
          <p>
            <label className="filterByFoods"> Filter By:</label>
            <select
              className="filterByFoods"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="All Foods">All Foods</option>
              <option value="Fish">Fish</option>
            </select>
          </p>
        </div>
        <div className="products">
          {products.map((product) => {
            if (product.type === "foodFish") {
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

export default connect(mapStateToProps, mapDispatchToProps)(Food);
