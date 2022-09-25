import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

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

  render() {
    const { filter } = this.state;
    const { auth } = this.props;

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
        <div>
          <p>
            <label className="filterByOthers"> Filter By:</label>
            <select
              className="filterByOthers"
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

export default connect(mapStateToProps, mapDispatchToProps)(Others);
