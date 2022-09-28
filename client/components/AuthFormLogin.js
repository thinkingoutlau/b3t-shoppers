import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthFormLogin = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="auth_form">
        <div>
          <label htmlFor="username" className="auth-input-labels">
            <strong>
              <small>Username</small>
            </strong>
          </label>
          <input name="username" type="text" className="auth-inputs" />
        </div>
        <div>
          <label htmlFor="password" className="auth-input-labels">
            <strong>
              <small>Password</small>
            </strong>
          </label>
          <input name="password" type="password" className="auth-inputs" />
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
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
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
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthFormLogin);
