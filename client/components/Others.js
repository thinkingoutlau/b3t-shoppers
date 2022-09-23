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
      // if (filter === "Garden") {
      //   return product.type.includes("Garden");
      // }
      if (filter === "Insect") {
        return product.type.includes("Insect");
      }
      if (filter === "Musical Instruments") {
        return product.type.includes("Musical Instruments");
      }
      // if (filter === "Outdoors Decor") {
      //   return product.type.includes("Outdoors Decor");
      // }
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
              {/* <option value="Garden">Garden</option> */}
              <option value="Insect">Insect</option>
              <option value="Musical Instruments">Musical Instruments</option>
              {/* <option value="Outdoors Decor">Outdoors Decor</option> */}
              <option value="Toy">Toy</option>
            </select>
          </p>
        </div>
        <div>
          {products.map((product) => {
            if (
              product.type === "Easter" ||
              product.type === "Game Console" ||
              // product.type === "Garden" ||
              product.type === "Insect" ||
              product.type === "Musical Instruments" ||
              // product.type === "Outdoors Decor" ||
              product.type === "Toy"
            ) {
              return (
                <div className="allOthers" key={product.id}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Others);
