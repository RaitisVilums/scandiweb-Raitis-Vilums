import React, { Fragment, PureComponent } from "react";
import Header from "../Components/navigation/header.component";
import { CATEGORIES } from "../Data/queries";

export const CategoriesContext = React.createContext({
  categories: [],
  loading: false,
});

export class CategoriesProvider extends PureComponent {
  state = {
    categories: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    this.setState({ loading: true });
    this.props.client
      .query({ query: CATEGORIES })
      .then(({ data }) => {
        this.setState({ categories: data.categories, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { categories, loading, error } = this.state;
    if (error) {
      return (
        <Fragment>
          <Header />
          <div>{` Error!! ${error.message}`}</div>
        </Fragment>
      );
    }
    if (loading) {
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
