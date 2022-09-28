import axios from "axios";

//action types
const GOT_SINGLE_PRODUCT = "GOT_SINGLE_PRODUCT";
const UPDATE_INVENTORY = "UPDATE_INVENTORY";

//action creators
const _gotSingleProduct = (product) => ({
  type: GOT_SINGLE_PRODUCT,
  product,
});

const _updateInventory = (product) => ({
  type: UPDATE_INVENTORY,
  product,
});

//thunk creators
export const gotSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(_gotSingleProduct(product));
    } catch (error) {
      next(err);
    }
  };
};

export const updateInventory = (id, quantity) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.put(
        `/api/products/inventory/${id}`,
        quantity
      );
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
    case UPDATE_INVENTORY:
      return action.product;
    default:
      return state;
  }
}
