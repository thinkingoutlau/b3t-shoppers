import React, { Component } from "react";
import { connect } from "react-redux";

class FormError extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>
          You have entered an invalid value into the form. Please try again!
        </h1>
      </div>
    );
  }
}

const mapState = () => {
  return {};
};

const mapDispatchToProps = () => ({});

export default connect(mapState, mapDispatchToProps)(FormError);
