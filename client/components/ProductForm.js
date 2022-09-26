import React from "react";
import { connect } from "react-redux";

class ProductForm extends React.Component {
  constructor() {
    super();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <form id="product-form" className="product_form">
          <label htmlFor="name">Name:</label>
          <input></input>
          <label htmlFor="current-price">Current Price:</label>
          <input></input>
          <label htmlFor="description">Description:</label>
          <textarea></textarea>
          <label htmlFor="inventory">Inventory:</label>
          <input></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
