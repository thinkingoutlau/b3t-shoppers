import axios from "axios";

//action types
const ADD_PRODUCT = "ADD_PRODUCT";

//action creators
const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});
