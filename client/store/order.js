import axios from "axios";

//action types
const ADD_PRODUCT = "ADD_PRODUCT";

//action creators
const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

//thunk creators
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
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
};
