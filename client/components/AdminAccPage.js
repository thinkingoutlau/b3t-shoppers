import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../store/users";
import { Link } from "react-router-dom";

class AdminAccPage extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
  }
  render() {
    const { users } = this.props;

    return (
      <div>
        <div>
          <h1>{`Welcome to the admin page ${this.props.auth.fullName}!`}</h1>
        </div>
        <div>
          {users.map((user) => {
            return (
              <div className="all_users" key={user.id}>
                <img src={user.imageURL} alt="user profile pic" />
                <h3>{user.fullName}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
});

export default connect(mapState, mapDispatchToProps)(AdminAccPage);
