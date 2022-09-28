import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserFromServer } from "../store/user";
import { Link } from "react-router-dom";

class UserAccPage extends Component {
  componentDidMount() {
    this.props.getUserFromServer(this.props.auth.username);
  }
  render() {
    return (
      <div className="account">
        <div className="account-text">
          <h1>{`Welcome ${this.props.auth.fullName}!`}</h1>
          <div className="account-info">
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
          </div>
        </div>
        <div className="account-image">
          <img
            src={this.props.auth.imageURL}
            alt="profile-pic"
            className="account-image-components"
          />
          <Link
            to={`/orderHistory/${this.props.auth.id}`}
            className="account-image-components"
          >
            <button type="button" className="order-history">
              Order History
            </button>
          </Link>
        </div>
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

export default connect(mapState, mapDispatchToProps)(UserAccPage);
