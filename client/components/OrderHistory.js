import React, { Component } from "react";
import { getOrderHistory } from "../store/orderHistory";
import { connect } from "react-redux";

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      filter: "last 30 days",
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.getOrderHistory(this.props.match.params.id);
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const productsPurchasedByUser = this.props.orderHistory.products;
    console.log(productsPurchasedByUser);
    const { filter } = this.state;
    const orderHistory = this.props.orderHistory;
    const currentDate = new Date();
    // console.log("orderHistory date before format", orderHistory.createdAt);
    // console.log("currentDate before format", currentDate);
    function dateFormat(inputDate, format) {
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      format = format.replace("MM", month.toString().padStart(2, "0"));
      if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
      } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
      }
      format = format.replace("dd", day.toString().padStart(2, "0"));
      return format;
    }

    // console.log(
    //   "Converted date: " + dateFormat(orderHistory.createdAt, "MM-dd-yyyy"),
    //   "Converted date: " + dateFormat(currentDate, "MM-dd-yyyy")
    // );
    const orderHistoryDate = dateFormat(orderHistory.createdAt, "MM-dd-yyyy");
    const todaysDate = dateFormat(currentDate, "MM-dd-yyyy");

    return (
      <>
        <div>
          <strong>Your Order History:</strong>
        </div>
        <div>
          <p>
            <label className="filterByDate"> Filter By:</label>
            <select
              className="filterByDate"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            >
              <option value="last 30 days">last 30 days</option>
              <option value="last 3 months">last 3 months</option>
              <option value="past year">past year</option>
              <option value="past 2 years">past 2 years</option>
              <option value="past 3 years">past 3 years</option>
            </select>
          </p>
        </div>
        <div>
          {todaysDate !== orderHistoryDate ? (
            <i>`No order placed in the ${this.state.filter}`</i>
          ) : (
            <div>
              {productsPurchasedByUser.map((product) => {
                return (
                  <div className="productsFromOrderHistory" key={product.id}>
                    <h2>
                      <p>
                        <strong>{product.name}</strong>
                      </p>
                    </h2>
                    <p>
                      <strong>Order placed:</strong> {orderHistoryDate}
                    </p>
                    <p>
                      <strong>Quantity purchased:</strong>{" "}
                      {product.order_products.quantity}
                    </p>
                    <p>
                      <img src={product.imageURL} alt="rpoduct image" />
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ orderHistory }) => ({
  orderHistory,
});

const mapDispatchToProps = (dispatch) => ({
  getOrderHistory: (id) => dispatch(getOrderHistory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
