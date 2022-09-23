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
    console.log("show all products", this.props.allProducts);
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
        <div>
          {products.map((product) => {
            if (product.type === "foodFish") {
              return (
                <div className="allFoods" key={product.id}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Food);
