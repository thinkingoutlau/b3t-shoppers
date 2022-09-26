import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePassword } from "../store/auth";

//new password must === reenter password
//if user enters same password,send a request to server with data like this:
// {current: newPassword
//  new: newPassword }
class UserPassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: "",
      newPassword: "",
      reenterPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      currentPassword: "",
      newPassword: "",
      reenterPassword: "",
    });
    this.props.updatePassword(
      this.props.username,
      this.state.currentPassword,
      this.state.newPassword
    );
  }
  render() {
    const { currentPassword, newPassword, reenterPassword } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="change_password_form">
          <div>
            <label htmlFor="currentPassword:">
              <strong>
                <small>Current password:</small>
              </strong>
            </label>
            <input
              name="currentPassword"
              value={currentPassword}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="newPassword">
              <strong>
                <small>New password:</small>
              </strong>
            </label>
            <input
              name="newPassword"
              value={newPassword}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="reenterPassword">
              <strong>
                <small>Reenter new password:</small>
              </strong>
            </label>
            <input
              name="reenterPassword"
              value={reenterPassword}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit" className="change_password_button">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
    username: state.auth.username,
    password: state.auth.password,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(null, username, null, password, formName));
    },
    updatePassword: (username, currentPassword, newPassword) =>
      dispatch(updatePassword(username, currentPassword, newPassword)),
  };
};

export default connect(mapLogin, mapDispatch)(UserPassword);
