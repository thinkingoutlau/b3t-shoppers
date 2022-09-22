import React, { Component } from "react";

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      filter: "Date",
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
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Past Year">Past Year</option>
              <option value="Past 2 Years">Past 2 Years</option>
              <option value="Past 3 Years">Past 3 Years</option>
            </select>
          </p>
        </div>
        <div>
          <i>SHOW ALL PRODUCTS USER PURCHASED</i>
        </div>
      </>
    );
  }
}

export default OrderHistory;
