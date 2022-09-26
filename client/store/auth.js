import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

const UPDATE_PASSWORD = "UPDATE_PASSWORD";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const _updatePassword = (password) => ({
  type: UPDATE_PASSWORD,
  password,
});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (fullName, username, email, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        fullName,
        username,
        email,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push("/");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

// get new token when updating password which will set to local storage
export const updatePassword = (username, password, newPassword) => {
  return async (dispatch) => {
    try {
      const { data: updatedToken } = await axios.put(`/auth/editPassword`, {
        username,
        password,
        newPassword,
      });
      window.localStorage.setItem(TOKEN, updatedToken);
      dispatch(me());
      // dispatch(updatePassword(true))
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_PASSWORD:
      return action.password;
    default:
      return state;
  }
}
