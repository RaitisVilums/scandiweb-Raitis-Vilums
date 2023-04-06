import { PureComponent } from "react";
import { CurrencyContext } from "../../../Context/currency.context";

export class ProductPrice extends PureComponent {
  static contextType = CurrencyContext;
  render() {
    const { prices, className } = this.props;
    const { selectedCurrency } = this.context;
    const price = prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
    const { amount } = price;

    const { symbol } = selectedCurrency;
    return (
      <p className={className ? className : "product-price"}>
        {symbol} {amount}
      </p>
    );
  }
}

export default ProductPrice;
