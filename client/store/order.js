import axios from "axios";

//action types
const GET_ORDER = "GET_ORDER";
const ADD_PRODUCT = "ADD_PRODUCT";

//action creators
const _getOrder = (order) => ({
  type: GET_ORDER,
  order,
});

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

//thunk creators
export const getOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch(_getOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/orders/${userId}`, product);
      dispatch(_addProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
};
