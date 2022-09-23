import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../store/users";
import { Link } from "react-router-dom";

class AdminAccPage extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
  }
  render() {
    const { users, auth } = this.props;

    var cards = document.querySelectorAll(".card");

    [...cards].forEach((card) => {
      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
      });
    });

    return (
      <div>
        <div>
          <h1>{`Welcome to the admin page ${this.props.auth.fullName}!`}</h1>
        </div>
        <div>
          {users.map((user) => {
            if (auth.id !== user.id) {
              // do not render own profile into all users
              return (
                // <div className="flip-card" key={user.id}>
                //   <div className="flip-card-inner">
                //     <div className="flip-card-front">
                //       <div className="all_users">
                //         <img src={user.imageURL} alt="user profile pic" />
                //         <h3>{user.fullName}</h3>
                //       </div>
                //     </div>
                //     <div className="flip-card-back">
                //       <h4>{user.username}</h4>
                //       <h4>{user.email}</h4>
                //       <h4>{user.isAdmin ? "Admin user" : "User"}</h4>
                //     </div>
                //   </div>
                // </div>
                <div className="scene scene--card" key={user.id}>
                  <div className="card">
                    <div className="card__face card__face--front">
                      <img src={user.imageURL} alt="user profile pic" />
                      <h3>{user.fullName}</h3>
                    </div>
                    <div className="card__face card__face--back">
                      <h4>{user.username}</h4>
                      <h4>{user.email}</h4>
                      <h4>{user.isAdmin ? "Admin user" : "User"}</h4>
                    </div>
                  </div>
                </div>
              );
            }
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
