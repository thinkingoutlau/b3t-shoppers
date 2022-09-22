import React from "react";
import { connect } from "react-redux";
import { getUserFromServer } from "../store/user";

class Cart extends React.Component {
  componentDidMount() {
    this.props.getUserFromServer(this.props.username);
  }

  render() {
    return (
      <div>
        <h2>PLACEHOLDER CART STUFF</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
