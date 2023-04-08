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

  // Fetch currency data from a GraphQL server and stored currency from local storage when the component mounts
  componentDidMount() {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      this.setState({ selectedCurrency: JSON.parse(storedCurrency) });
    }
    this.fetchCurrency();
  }
  // Fetch the currency data from query Currency
  // save the data to currency state
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

  // Updates the selectedCurrency and saves it to local storage
  currencyChangeHandler = (symbol) => {
    const selectedCurrency = this.state.currency.find(
      (currency) => currency.symbol === symbol
    );
    this.setState({ selectedCurrency });
    localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency));
  };

  render() {
    const { currency, selectedCurrency } = this.state;
    const contextValue = {
      currency,
      currencyChangeHandler: this.currencyChangeHandler,
      selectedCurrency,
    };
    return (
      <CurrencyContext.Provider value={contextValue}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyProvider;
