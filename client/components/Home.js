import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <div>
      <div>
        <div className="home_page">
          <div className="home_welcome">
            <img src="/images/Gold_Roses_NH_Inv_Icon.png" />
            <h2>Welcome!</h2>
            <img src="/images/Gold_Roses_NH_Inv_Icon.png" />
          </div>
          <h3>Check out furniture for any situation:</h3>
          <div className="home_banners">
            <div className="home_ind_banners indoor">
              <h3>Indoors Style</h3>
              <Link to="/indoors">
                <img src="/images/indoor-style.png" />
              </Link>
            </div>
            <div className="home_ind_banners outdoor">
              <h3>Outdoors Style</h3>
              <Link to="/indoors">
                <img src="/images/outdoor-style.png" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
