import React from "react";
import { connect } from "react-redux";
import { gotSingleProduct } from "../store/singleProduct";
import { editProduct } from "../store/allProducts";

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      description: "",
      inventory: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id);
    this.setState(this.props.product);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || "",
        price: this.props.product.price || "",
        description: this.props.product.description || "",
        inventory: this.props.product.inventory || "",
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { name, price, description, inventory } = this.state;
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
          ></input>
          <label htmlFor="current-price" className="product-input-labels">
            Current Price:
          </label>
          <input
            className="product-inputs"
            onChange={handleChange}
            value={price}
          ></input>
          <label htmlFor="description" className="product-input-labels">
            Description:
          </label>
          <textarea
            className="product-inputs"
            onChange={handleChange}
            value={description}
          ></textarea>
          <label htmlFor="inventory" className="product-input-labels">
            Inventory:
          </label>
          <input
            className="product-inputs"
            onChange={handleChange}
            value={inventory}
          ></input>
          <button type="submit" className="submit-product-form">
            Save changes
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    gotSingleProduct: (id) => dispatch(gotSingleProduct(id)),
    editProduct: (product) => dispatch(editProduct(product, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
