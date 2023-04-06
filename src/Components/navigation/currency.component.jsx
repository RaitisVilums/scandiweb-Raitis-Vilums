import "./currency.styles.scss";

import { PureComponent } from "react";
import { CurrencyContext } from "../../Context/currency.context";
import { DropdownIcon } from "../../Assets/_index";

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
      <div className="currency" onClick={dropDown}>
        <span className="currency-span">
          {symbol}
          <DropdownIcon className={`currency-icon ${active && "rotate"}`} />
        </span>
        {active && (
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
        )}
      </div>
    );
  }
}

export default Currency;
