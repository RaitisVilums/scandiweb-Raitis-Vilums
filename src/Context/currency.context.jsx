import React, { PureComponent } from "react";
import { Currency } from "../Data/queries";

// TODO 1) Create a Context that fetches currency label and symbol
// TODO 2) Implement a way for the user to change the currency on the website
// TODO 3) Implement a way to persist the selected currency
// TODO 4) Implement a way to save selected currency on reload

export const CurrencyContext = React.createContext({
  currency: {},
  loading: false,
  currencyChangeHandler: () => {},
  selectedCurrency: {},
});

export class CurrencyProvider extends PureComponent {
  // selectedCurrency by default is USD / $
  state = {
    currency: {},
    loading: false,
    selectedCurrency: { label: "USD", symbol: "$" },
  };

  // When the website loads call the fetchCurrency function
  componentDidMount() {
    this.fetchCurrency();
  }

  // Fetching data from Appolo server using GraphQL query
  // Getting Data and setting the currency to data.currencies
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

  // Handler that changes the currency on whole website
  currencyChangeHandler = (symbol) => {
    // console.log(`start`, symbol);
    const selectedCurrency = this.state.currency.find(
      (currency) => currency.symbol === symbol
    );
    this.setState({ selectedCurrency });
    // console.log(`finish`, selectedCurrency);
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
