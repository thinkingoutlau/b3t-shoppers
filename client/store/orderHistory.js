import axios from "axios";

const GET_ORDER_HISTORY = "GET_ORDER_HISTORY";
const TOKEN = "token";

export const _getOrderHistory = (orderHistory) => ({
  type: GET_ORDER_HISTORY,
  orderHistory,
});

export const getOrderHistory = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: order } = await axios.get(`/api/orderHistory/${id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_getOrderHistory(order));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory;
    default:
      return state;
  }
};
