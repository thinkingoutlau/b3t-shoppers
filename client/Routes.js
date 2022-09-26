import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthFormLogin";
import { Signup } from "./components/AuthFormSignUp";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import { me } from "./store";
import UserAccPage from "./components/UserAccPage";
import OrderHistory from "./components/OrderHistory";
import UserPassword from "./components/UserPassword";
import AdminAccPage from "./components/AdminAccPage";
import Food from "./components/Food";
import Others from "./components/Others";
import Outdoors from "./components/Outdoors";
import Indoors from "./components/Indoors";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products" component={AllProducts} />
            <Route path="/cart" component={Cart} />
            <Route path="/editPassword" component={UserPassword} />
            <Route path="/orderHistory/:id" component={OrderHistory} />
            <Route path="/outdoors" component={Outdoors} />
            <Route path="/food" component={Food} />
            <Route path="/indoors" component={Indoors} />
            <Route path="/others" component={Others} />
            {this.props.auth.isAdmin ? (
              <Route path="/myAdminAccount" component={AdminAccPage} />
            ) : (
              <Route path="/myAccount" component={UserAccPage} />
            )}
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products" component={AllProducts} />
            <Route path="/outdoors" component={Outdoors} />
            <Route path="/food" component={Food} />
            <Route path="/indoors" component={Indoors} />
            <Route path="/others" component={Others} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
