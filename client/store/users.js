import axios from "axios";

const initialState = [];
const GET_ALL_USERS = "GET_ALL_USERS";
const DELETE_USER = "DELETE_USER";

export const _getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

export const _deleteUser = (user) => ({
  type: DELETE_USER,
  user,
});

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users");
      dispatch(_getAllUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.delete(`/api/users/${id}`);
      if (user.isAdmin === false) {
        dispatch(_deleteUser(user));
      } else {
        console.log("cannot delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};
