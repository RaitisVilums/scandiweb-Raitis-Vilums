import React, { PureComponent } from "react";
import { Currency } from "../Data/queries";

export const CurrencyContext = React.createContext({
  currency: {},
  loading: false,
  currencyChangeHandler: () => {},
  selectedCurrency: {},
});

export class CurrencyProvider extends PureComponent {
  state = {
    currency: {},
    loading: false,
    selectedCurrency: { label: "USD", symbol: "$" },
  };

  componentDidMount() {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      this.setState({ selectedCurrency: JSON.parse(storedCurrency) });
    }
    this.fetchCurrency();
  }

  fetchCurrency = () => {
    this.setState({ loading: true });
    this.props.client
      .query({ query: Currency })
      .then(({ data }) => {
        this.setState({ currency: data.currencies, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  currencyChangeHandler = (symbol) => {
    const selectedCurrency = this.state.currency.find(
      (currency) => currency.symbol === symbol
    );
    this.setState({ selectedCurrency });
    localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency));
  };

  render() {
    const { currency, selectedCurrency } = this.state;
    const value = {
      currency,
      currencyChangeHandler: this.currencyChangeHandler,
      selectedCurrency,
    };
    return (
      <CurrencyContext.Provider value={value}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyProvider;
