import "./currency.styles.scss";

import { PureComponent } from "react";
import { CurrencyContext } from "../../Context/currency.context";

export class Currency extends PureComponent {
  static contextType = CurrencyContext;

  clickHandler(symbol, dropDown) {
    const { currencyChangeHandler } = this.context;
    currencyChangeHandler(symbol);
    dropDown();
  }
  render() {
    const { currency, selectedCurrency } = this.context;
    const { symbol } = selectedCurrency;
    const { dropDown, active } = this.props;

    return (
      <div className="currency">
        <span className="currency-span">{symbol}</span>
        <div
          className={`currency-dropdown ${active ? "rotate" : ""}`}
          onClick={dropDown}
        ></div>
        {active ? (
          <div className="currencies">
            {currency.map((currencies) => {
              return (
                <span
                  onClick={() => this.clickHandler(currencies.symbol, dropDown)}
                  key={currencies.symbol}
                  className="currencies-choice"
                >
                  {currencies.symbol} {currencies.label}
                </span>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Currency;
