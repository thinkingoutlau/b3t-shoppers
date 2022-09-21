import axios from "axios";

const initialState = [];
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const _getAllProducts = (allProducts) => ({
  type: GET_ALL_PRODUCTS,
  allProducts,
});

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/allProducts");
      dispatch(_getAllProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;
    default:
      return state;
  }
};
