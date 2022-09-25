import axios from "axios";

const initialState = [];
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";

export const _getAllProducts = (allProducts) => ({
  type: GET_ALL_PRODUCTS,
  allProducts,
});

export const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(_getAllProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.delete(`/api/products/${id}`);
      dispatch(_deleteProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
};
