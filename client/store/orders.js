import axios from "axios";

//action types
const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";
const ADD_PRODUCT = "ADD_PRODUCT";
const ADD_GUEST_PRODUCT = "ADD_GUEST_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const DELETE_GUEST_PRODUCT = "DELETE_GUEST_PRODUCT";
const RELOAD_GUEST_PRODUCT = "RELOAD_GUEST_PRODUCT";
const LOG_OUT = "LOG_OUT";

//action creators
const _getCurrentOrder = (order) => ({
  type: GET_CURRENT_ORDER,
  order,
});

const _addProduct = (products) => ({
  type: ADD_PRODUCT,
  products,
});

const _addGuestProduct = (product) => ({
  type: ADD_GUEST_PRODUCT,
  product,
});

const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

export const _deleteGuestProduct = (productId) => ({
  type: DELETE_GUEST_PRODUCT,
  productId,
});

const _reloadGuestProduct = (product) => ({
  type: RELOAD_GUEST_PRODUCT,
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
      const { data } = await axios.post(`/api/currentOrder/${userId}`, product);
      dispatch(_addProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addGuestProduct = (prodId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${prodId}`);
      dispatch(_addGuestProduct([data]));
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

export const reloadGuestProduct = (prodId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${prodId}`);
      dispatch(_reloadGuestProduct([data]));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = () => {
  return {
    products: [],
    guestCart: [],
  };
};

//reducer
export default (state = initialState(), action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      const { order } = action;
      return {
        ...state,
        products: order,
      };
    case ADD_PRODUCT:
      return { ...state, products: action.products };
    case ADD_GUEST_PRODUCT:
      return { ...state, guestCart: [...state.guestCart, ...action.product] };
    case UPDATE_PRODUCT:
      return { ...state, products: action.product };
    case DELETE_PRODUCT:
      const cartProducts = state.products.filter(
        (prod) => prod.id !== action.product.productId
      );
      return { ...state, products: cartProducts };
    case DELETE_GUEST_PRODUCT:
      const guestCartProducts = state.guestCart.filter(
        (prod) => prod.id !== action.productId
      );
      return { ...state, guestCart: guestCartProducts };
    case RELOAD_GUEST_PRODUCT:
      return { ...state, guestCart: [...state.guestCart] };
    case LOG_OUT:
      return initialState();
    default:
      return state;
  }
};
