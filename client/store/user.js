import axios from "axios";

const initialState = {};
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const TOKEN = "token";

export const _getUser = (user) => ({
  type: GET_USER,
  user,
});

export const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const getUserFromServer = (username) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.get(`/api/users/${username}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_getUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.put(
          `/api/users/${user.username}`,
          user,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(_updateUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};
