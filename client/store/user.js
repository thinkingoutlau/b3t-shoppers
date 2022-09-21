import axios from "axios";

const initialState = {};
const GET_USER = "GET_USER";

export const _getUser = (user) => ({
  type: GET_USER,
  user,
});

export const getUserFromServer = (username) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(`/api/users/${username}`);
      dispatch(_getUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};
