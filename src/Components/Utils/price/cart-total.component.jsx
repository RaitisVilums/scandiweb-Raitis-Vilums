import { PureComponent } from "react";
import { CurrencyContext } from "../../Context/currency.context";

export class CartTotal extends PureComponent {
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
    const { selectedCurrency } = this.context;
    const { symbol } = selectedCurrency;
    const { totalCost } = this.state;
    return (
      <h2 className="amount">
        {`${symbol}  `}
        {totalCost.toFixed(2)}
      </h2>
    );
  }
}

export default CartTotal;
