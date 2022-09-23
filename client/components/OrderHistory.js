import React, { Component } from "react";

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      filter: "last 30 days",
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { filter } = this.state;
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
          {filter ? (
            `No order placed in the ${this.state.filter}`
          ) : (
            <i>SHOW ALL PRODUCTS USER PURCHASED</i>
          )}
        </div>
      </>
    );
  }
}

export default OrderHistory;
