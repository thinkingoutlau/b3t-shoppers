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
    const { filter } = this.state;
    const productsPurchasedByUser = this.props.orderHistory.products;
    const dateOfPurchase = this.props.orderHistory.createdAt;

    const currentDate = new Date();
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
    const orderHistoryDate = dateFormat(dateOfPurchase, "MM-dd-yyyy");
    const todaysDate = dateFormat(currentDate, "MM-dd-yyyy");
    const monthOfPurchase = orderHistoryDate.slice(1, 2);
    const monthOfTodaysDate = todaysDate.slice(1, 2);
    const yearOfPurchase = orderHistoryDate.slice(6, 10);
    const yearOfTodaysDate = todaysDate.slice(6, 10);

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
          {filter === "last 30 days" &&
          monthOfTodaysDate - 1 <= monthOfPurchase &&
          monthOfPurchase <= monthOfTodaysDate &&
          yearOfPurchase === yearOfTodaysDate ? (
            <div>
              {productsPurchasedByUser?.map((product) => {
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
                      <strong>Quantity purchased: </strong>{" "}
                      {product.order_products.quantity}
                    </p>
                    <p>
                      <img src={product.imageURL} alt="rpoduct image" />
                    </p>
                  </div>
                );
              })}
            </div>
          ) : filter === "last 3 months" &&
            monthOfTodaysDate - 3 <= monthOfPurchase &&
            monthOfPurchase <= monthOfTodaysDate &&
            yearOfPurchase === yearOfTodaysDate ? (
            <div>
              {productsPurchasedByUser?.map((product) => {
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
          ) : filter === "past year" &&
            yearOfTodaysDate - 1 <= yearOfPurchase &&
            yearOfPurchase <= yearOfTodaysDate ? (
            <div>
              {productsPurchasedByUser?.map((product) => {
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
          ) : filter === "past 2 years" &&
            yearOfTodaysDate - 2 <= yearOfPurchase &&
            yearOfPurchase <= yearOfTodaysDate ? (
            <div>
              {productsPurchasedByUser?.map((product) => {
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
          ) : filter === "past 3 years" &&
            yearOfTodaysDate - 3 <= yearOfPurchase &&
            yearOfPurchase <= yearOfTodaysDate ? (
            <div>
              {productsPurchasedByUser?.map((product) => {
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
          ) : (
            <i>{`No order placed in the ${this.state.filter}`}</i>
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
