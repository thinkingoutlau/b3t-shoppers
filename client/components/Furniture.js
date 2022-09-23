import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class Furniture extends Component {
  constructor() {
    super();
    this.state = {
      filter: "All Furniture",
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
      if (filter === "All Furniture") {
        return product;
      }
      if (filter === "Bed") {
        return product.type.includes("Bed");
      }
      if (filter === "Chair") {
        return product.type.includes("Chair");
      }
      if (filter === "Desk") {
        return product.type.includes("Desk");
      }
      if (filter === "Dresser") {
        return product.type.includes("Dresser");
      }
      if (filter === "Lamps") {
        return product.type.includes("Lamps");
      }
      if (filter === "Sofa") {
        return product.type.includes("Sofa");
      }
      if (filter === "Table") {
        return product.type.includes("Table");
      }
    });
    // console.log(products);

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
              <option value="All Furniture">All Furniture</option>
              <option value="Bed">Bed</option>
              <option value="Chair">Chair</option>
              <option value="Desk">Desk</option>
              <option value="Dresser">Dresser</option>
              <option value="Lamps">Lamps</option>
              <option value="Sofa">Sofa</option>
              <option value="Table">Table</option>
            </select>
          </p>
        </div>
        <div>
          {products.map((product) => {
            if (
              product.type === "Bed" ||
              product.type === "Chair" ||
              product.type === "Desk" ||
              product.type === "Dresser" ||
              product.type === "Sofa" ||
              product.type === "Table" ||
              product.type === "Lamps"
            ) {
              return (
                <div className="allFurniture" key={product.id}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Furniture);
