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

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    this.setState({ isLoading: true });
    this.props.client
      .query({ query: CATEGORIES })
      .then(({ data }) => {
        this.setState({ categories: data.categories, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { categories, isLoading, error } = this.state;
    if (error) {
      return (
        <Fragment>
          <Header />
          <div>{` Error!! ${error.message}`}</div>
        </Fragment>
      );
    }
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
