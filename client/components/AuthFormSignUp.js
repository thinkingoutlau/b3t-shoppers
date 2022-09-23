import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthFormSignUp = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="auth_form">
        <div>
          <label htmlFor="fullname">
            <strong>
              <small>Full Name</small>
            </strong>
          </label>
          <input
            name="fullname"
            type="text"
            placeholder="First and Last Name"
          />
        </div>
        <div>
          <label htmlFor="username">
            <strong>
              <small>Username</small>
            </strong>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <strong>
              <small>Email</small>
            </strong>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <strong>
              <small>Password</small>
            </strong>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit" className="auth_button">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const fullName = evt.target.fullname.value;
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(fullName, username, email, password, formName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(AuthFormSignUp);