import React, { Fragment, PureComponent } from "react";
import { CurrencyContext } from "../../../Context/currency.context";

class CheckoutTotal extends PureComponent {
  static contextType = CurrencyContext;

  state = {
    totalCost: 0,
    tax: 0,
  };

  componentDidMount() {
    this.calculateTotal();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { cartItems } = this.props;
    const { selectedCurrency } = this.context;

    if (
      cartItems !== prevProps.cartItems ||
      selectedCurrency !== prevState.selectedCurrency
    ) {
      this.calculateTotal();
    }
  }
  calculateTotal() {
    const { cartItems } = this.props;
    const { selectedCurrency } = this.context;

    const total = cartItems.reduce((total, item) => {
      const price = item.prices.find(
        (price) => price.currency.symbol === selectedCurrency.symbol
      );
      //   console.log(price.amount, price.currency.symbol);
      if (price) {
        return total + price.amount * item.quantity;
      } else {
        console.log(`No price found for symbol ${selectedCurrency.symbol}`);
        return total;
      }
    }, 0);
    console.log(total);
    const tax = total * 0.21;
    const totalCost = tax + total;
    this.setState({
      tax: tax,
      totalCost: totalCost,
    });
  }
  render() {
    const { cartItems } = this.props;
    const { selectedCurrency } = this.context;
    const { symbol } = selectedCurrency;
    const { totalCost, tax } = this.state;

    const quantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return (
      <Fragment>
        <h1>
          Tax 21%:
          <span>
            {`${symbol}  `}
            {tax.toFixed(2)}
          </span>
        </h1>
        <h1>
          Quantity: <span>{quantity}</span>
        </h1>
        <h1>
          Total:
          <span>
            {`${symbol}  `}
            {totalCost.toFixed(2)}
          </span>
        </h1>
      </Fragment>
    );
  }
}

export default CheckoutTotal;
