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
  console.log("hit this thunk");
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      console.log("product in thunk", product);
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
      console.log("product in reducer", action.product);
      return action.product;
    default:
      return state;
  }
}
