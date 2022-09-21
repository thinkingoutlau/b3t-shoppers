import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div id="store_name">
      <img src="/images/logo.png" />
      <h1>Nook's Cranny</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div className="home_button">
            <Link to="/">Home</Link>
          </div>
          <Link to="/products">All</Link>
          <Link to="/food">Food</Link>
          <Link to="/clothes">Clothes</Link>
          <Link to="/furniture">Furniture</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div id="nav_bar">
          {/* The navbar will show these links before you log in */}
          <div>
            <div className="home_button">
              <Link to="/">Home</Link>
            </div>
            <Link to="/products">All</Link>
            <Link to="/food">Food</Link>
            <Link to="/clothes">Clothes</Link>
            <Link to="/furniture">Furniture</Link>
          </div>
          <div className="login_button">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
