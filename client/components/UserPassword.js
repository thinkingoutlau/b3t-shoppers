import React, { Component } from "react";

class UserPassword extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("hello");
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="change_password_form">
          <div>
            <label htmlFor="currentPassword:">
              <strong>
                <small>Current password:</small>
              </strong>
            </label>
            <input name="currentPassword" type="currentPassword" />
          </div>
          <div>
            <label htmlFor="newPassword">
              <strong>
                <small>New password:</small>
              </strong>
            </label>
            <input name="newPassword" type="newPassword" />
          </div>
          <div>
            <label htmlFor="reenterPassword">
              <strong>
                <small>Reenter new password:</small>
              </strong>
            </label>
            <input name="reenterPassword" type="reenterPassword" />
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

export default UserPassword;
