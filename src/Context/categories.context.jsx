import React, { Fragment, PureComponent } from "react";
import Header from "../Components/navigation/header.component";
import { CATEGORY } from "../Data/queries";

// TODO 1) Create a Context that gets, saves Category names
// TODO 2) Implement a way to load data instantly when website loads

export const CategoriesContext = React.createContext({
  category: {},
  loading: false,
});

export class CategoriesProvider extends PureComponent {
  state = {
    category: {},
    loading: false,
  };

  // Calling fetchCategory when Web loads

  componentDidMount() {
    this.fetchCategory();
  }

  // Function that use Appolo Server and GraphQl querry to fetch data
  // Setting category to fetched data
  fetchCategory = () => {
    this.setState({ loading: true });
    this.props.client
      .query({ query: CATEGORY })
      .then(({ data }) => {
        this.setState({ category: data.categories[0], loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { category, loading, error } = this.state;
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

    const value = { category };
    return (
      <CategoriesContext.Provider value={value}>
        {this.props.children}
      </CategoriesContext.Provider>
    );
  }
}

export default CategoriesProvider;
