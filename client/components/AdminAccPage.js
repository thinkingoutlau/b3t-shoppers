import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../store/users";
import { Link } from "react-router-dom";

class AdminAccPage extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      usersPerPage: 9,
    };
  }
  async componentDidMount() {
    await this.props.getAllUsers();
  }

  handlePrevious = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };
  handleNext = () => {
    const productsLength = this.props.users.length;
    if (productsLength / this.state.usersPerPage > this.state.currentPage) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  handleFlipClick(event) {
    let card = document.getElementById(event.currentTarget.id);
    if (event.target.className !== "delete_user") {
      if (card) {
        if (card.classList.contains("is-flipped")) {
          card.classList.remove("is-flipped");
        } else {
          card.classList.add("is-flipped");
        }
      }
    }
  }

  render() {
    const { users, auth } = this.props;

    return (
      <div>
        <div>
          <h1>{`Welcome to the admin page ${this.props.auth.fullName}!`}</h1>
        </div>
        <div className="all_users">
          {users.map((user, index) =>
            auth.id !== user.id &&
            index >= (this.state.currentPage - 1) * this.state.usersPerPage &&
            index < this.state.currentPage * this.state.usersPerPage ? (
              // do not render own profile into all users

              <div className="flip-card" key={user.id}>
                <div
                  className="flip-card-inner"
                  onClick={this.handleFlipClick}
                  id={user.id}
                >
                  <div className="flip-card-front">
                    <img src={user.imageURL} alt="user profile pic" />
                    <h3>{user.fullName}</h3>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-content">
                      <h4>Username: {user.username}</h4>
                      <h4>Email: {user.email}</h4>
                      <h4>{user.isAdmin ? "Admin user" : "User"}</h4>
                      <button
                        type="button"
                        onClick={() => this.props.deleteUser(user.id)}
                        id={user.id}
                        className={user.isAdmin === true ? "disabled" : ""}
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div className="pagination">
          <button
            onClick={this.handlePrevious}
            className="all_products_actions"
          >
            {" "}
            &laquo; Previous{" "}
          </button>
          &nbsp;
          <strong>{this.state.currentPage}</strong>&nbsp;
          <button onClick={this.handleNext} className="all_products_actions">
            Next &raquo;
          </button>
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
  deleteUser: (id) => dispatch(deleteUser(id)),
});

export default connect(mapState, mapDispatchToProps)(AdminAccPage);
