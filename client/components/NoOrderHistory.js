import React, { Component } from "react";
import { connect } from "react-redux";

class NoOrderHistory extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>No order history!</h1>
      </div>
    );
  }
}

const mapState = () => {
  return {};
};

const mapDispatchToProps = () => ({});

export default connect(mapState, mapDispatchToProps)(NoOrderHistory);
