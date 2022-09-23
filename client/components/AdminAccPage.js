import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserFromServer } from "../store/user";
import { Link } from "react-router-dom";

//what we still want:
//include email
//reset password button
//personal info --> address, payment info //add in edit button
//history

class AdminAccPage extends Component {
  componentDidMount() {
    this.props.getUserFromServer(this.props.auth.username);
  }
  render() {
    return (
      <div>
        <h1>{`Welcome ${this.props.auth.fullName} to the admin page!`}</h1>
        {/* <br></br> */}
        <p>
          <strong>Name:</strong> {this.props.auth.fullName}
        </p>
        <p>
          <strong>Username:</strong> {this.props.auth.username}
        </p>
        <p>
          <strong>Email:</strong> {this.props.auth.email}
        </p>
        <p>
          <strong>Password:</strong> ***********{" "}
          <Link to="/editPassword">Edit Password</Link>
        </p>
        {/* <p>
          <strong>
            <Link to="/orderHistory">Order History</Link>
          </strong>
        </p> */}
        <p>
          <strong>Order History: </strong>
          <Link to="/orderHistory">Show History</Link>
        </p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserFromServer: (username) => dispatch(getUserFromServer(username)),
});

export default connect(mapState, mapDispatchToProps)(AdminAccPage);
