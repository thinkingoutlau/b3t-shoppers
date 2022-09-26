import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

class Product extends Component {
  constructor() {
    super();
  }

  render() {
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
  }
}
