import React, { Fragment, PureComponent } from "react";
import Header from "../Components/navigation/header.component";
import { CATEGORIES } from "../Data/queries";

export const CategoriesContext = React.createContext({
  categories: [],
  isLoading: false,
});

export class CategoriesProvider extends PureComponent {
  state = {
    categories: [],
    isLoading: false,
  };

  // When component mounts (loads ) fetch the categories
  componentDidMount() {
    this.fetchCategories();
  }
  // Fetching the data from quert CATEGORIES
  // Setting the categories to fetched data
  fetchCategories = () => {
    this.setState({ isLoading: true });
    this.props.client
      .query({ query: CATEGORIES })
      .then(({ data }) => {
        this.setState({ categories: data.categories, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false, error });
      });
  };

  render() {
    const { categories, isLoading, error } = this.state;
    // If there is an error, render an error message
    if (error) {
      return (
        <Fragment>
          <Header />
          <div>{` Error!! ${error.message}`}</div>
        </Fragment>
      );
    }
    // If data is still loading, render a loading message
    if (isLoading) {
      return (
        <Fragment>
          <Header />
          <div>Loading</div>
        </Fragment>
      );
    }
    const contextValue = { categories };
    return (
      <CategoriesContext.Provider value={contextValue}>
        {this.props.children}
      </CategoriesContext.Provider>
    );
  }
}

export default CategoriesProvider;
