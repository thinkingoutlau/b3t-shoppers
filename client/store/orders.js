import axios from "axios";

//action types
const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";
const ADD_PRODUCT = "ADD_PRODUCT";

//action creators
const _getCurrentOrder = (order) => ({
  type: GET_CURRENT_ORDER,
  order,
});

const _addProduct = (products) => ({
  type: ADD_PRODUCT,
  products,
});

//thunk creators
export const getCurrentOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/currentOrder/${id}`);
      dispatch(_getCurrentOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/currentOrder/${userId}`, product);
      console.log(data);
      dispatch(_addProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order;
    case ADD_PRODUCT:
      console.log(state);
      console.log(action.products);
      return { ...state, products: action.products };
    default:
      return state;
  }
};
