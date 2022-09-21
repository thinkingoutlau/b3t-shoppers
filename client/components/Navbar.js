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
        <div id="nav_bar">
          {/* The navbar will show these links after you log in */}
          <div>
            <div className="nonprod_button">
              <Link to="/">Home</Link>
            </div>
            <div className="product_buttons">
              <Link to="/products">All</Link>
              <Link to="/food">Food</Link>
              <Link to="/clothes">Clothes</Link>
              <Link to="/furniture">Furniture</Link>
            </div>
          </div>
          <div className="nonprod_button">
            <div className="cart_button">
              <Link to="/cart">
                <img
                  src="/images/Menu_Nook_Shopping_NH_Icon.png"
                  className="cart_img"
                />
              </Link>
            </div>
            <Link to="/myAccount">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div id="nav_bar">
          {/* The navbar will show these links before you log in */}
          <div>
            <div className="nonprod_button">
              <Link to="/">Home</Link>
            </div>
            <div className="product_buttons">
              <Link to="/products">All</Link>
              <Link to="/food">Food</Link>
              <Link to="/clothes">Clothes</Link>
              <Link to="/furniture">Furniture</Link>
            </div>
          </div>
          <div className="nonprod_button">
            <div className="cart_button">
              <Link to="/cart">
                <img
                  src="/images/Menu_Nook_Shopping_NH_Icon.png"
                  className="cart_img"
                />
              </Link>
            </div>
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
