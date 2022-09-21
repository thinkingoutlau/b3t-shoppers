import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <div id="featured">
        <img src="/images/Gold_Roses_NH_Inv_Icon.png" />
        <h2>featured items:</h2>
        <img src="/images/Gold_Roses_NH_Inv_Icon.png" />
      </div>
      <div class="banner">
        <div className="banner_slide"></div>
        <div className="banner_slide"></div>
        <div className="banner_slide"></div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
