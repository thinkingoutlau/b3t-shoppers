import React from "react";
import { connect } from "react-redux";
import { gotSingleProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMout() {
    this.props.gotSingleProduct(this.props.match.params.id);
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div>
        <h1>
          I'm on the single product page displaying {this.props.match.params.id}
        </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotSingleProduct: (id) => dispatch(gotSingleProduct(id)),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
