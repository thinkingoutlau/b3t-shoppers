import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserFromServer } from "../store/user";

//what we still want:
//include email
//reset password button
//personal info --> address, payment info
//history

class UserAccPage extends Component {
  componentDidMount() {
    this.props.getUserFromServer(this.props.username);
  }
  render() {
    return (
      <div>
        <h1>{`Welcome ${this.props.username}!`}</h1>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
});

export default connect(mapState, mapDispatchToProps)(UserAccPage);
