import axios from "axios";

//action types
const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";
const ADD_PRODUCT = "ADD_PRODUCT";
const ADD_GUEST_PRODUCT = "ADD_GUEST_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

//action creators
const _getCurrentOrder = (order) => ({
  type: GET_CURRENT_ORDER,
  order,
});

const _addProduct = (products) => ({
  type: ADD_PRODUCT,
  products,
});

export const _addGuestProduct = (products) => ({
  type: ADD_GUEST_PRODUCT,
  products,
});

const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
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
      console.log("input", product);
      const { data } = await axios.post(`/api/currentOrder/${userId}`, product);
      console.log("output", data);
      dispatch(_addProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/currentOrder/${userId}`, product);
      dispatch(_updateProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/currentOrder/${userId}`, {
        data: { productId: productId },
      });
      dispatch(_deleteProduct(data));
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
      return { ...state, products: action.products };
    case ADD_GUEST_PRODUCT:
      return [action.products];
    case UPDATE_PRODUCT:
      return { ...state, products: action.product };
    case DELETE_PRODUCT:
      const cartProducts = state.products.filter(
        (prod) => prod.id !== action.product.productId
      );
      return { ...state, products: cartProducts };
    default:
      return state;
  }
};
