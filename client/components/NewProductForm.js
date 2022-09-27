import React from "react";
import { connect } from "react-redux";
import { newProduct } from "../store/allProducts";

class NewProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      description: "",
      inventory: "",
      imageURL: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.newProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { name, price, description, inventory, imageURL } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form
          id="product-form"
          className="product_form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="product-input-labels">
            Name:
          </label>
          <input
            className="product-inputs"
            onChange={handleChange}
            value={name}
            name="name"
          ></input>
          <label htmlFor="imageURL" className="product-input-labels">
            Image URL:
          </label>
          <input
            className="product-inputs"
            onChange={handleChange}
            value={imageURL}
            name="imageURL"
          ></input>
          <label htmlFor="current-price" className="product-input-labels">
            Current Price:
          </label>
          <input
            className="product-inputs"
            onChange={handleChange}
            value={price}
            name="price"
          ></input>
          <label htmlFor="description" className="product-input-labels">
            Description:
          </label>
          <textarea
            className="product-inputs"
            onChange={handleChange}
            value={description}
            name="description"
          ></textarea>
          <label htmlFor="inventory" className="product-input-labels">
            Inventory:
          </label>
          <input
            className="product-inputs"
            onChange={handleChange}
            value={inventory}
            name="inventory"
          ></input>
          <button type="submit" className="submit-product-form">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    newProduct: (product) => dispatch(newProduct(product, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm);
