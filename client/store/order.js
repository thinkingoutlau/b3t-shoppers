import axios from "axios";

//action types
const ADD_PRODUCT = "ADD_PRODUCT";

//action creators
const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

//thunk creators
export const addProduct = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.post(`/api/order/${id}`, req.body);
      dispatch(_addProduct(product));
    } catch (error) {
      next(err);
    }
  };
};

//reducer
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
