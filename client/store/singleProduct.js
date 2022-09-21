import axios from "axios";

//action types
const GOT_SINGLE_PRODUCT = "GOT_SINGLE_PRODUCT";

//action creators
const _gotSingleProduct = (product) => ({
  type: GOT_SINGLE_PRODUCT,
  product,
});

//thunk creators
export const gotSingleProduct = (id, history) => {
  return async (dispatch) => {
    try {
      console.log("hit this thunk");
      const { data: product } = await axios.get(`/api/product/${id}`);
      dispatch(_gotSingleProduct(product));
    } catch (error) {
      next(err);
    }
  };
};

//reducer
export default function productReducer(state = {}, action) {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
