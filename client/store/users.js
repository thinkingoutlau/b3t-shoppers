import axios from "axios";

const initialState = [];
const GET_ALL_USERS = "GET_ALL_USERS";

export const _getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
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

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};
