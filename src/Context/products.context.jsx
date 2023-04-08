import React, { PureComponent } from "react";
import { CategoryProducts } from "../Data/queries";

export const ProductsContext = React.createContext({
  products: {},
  isLoading: false,
});

export class ProductsProvider extends PureComponent {
  state = {
    productsByCategory: {},
    isLoading: false,
  };

  // Fetches category products using category name
  // stores it into a state
  fetchProducts = (categoryName) => {
    this.setState({ isLoading: true });
    const variables = { input: { title: categoryName } };
    this.props.client
      .query({
        query: CategoryProducts,
        variables,
      })
      .then(({ data }) => {
        this.setState({ productsByCategory: data.category, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
    console.log(this.state.productsByCategory);
  };
  render() {
    const { productsByCategory, isLoading } = this.state;

    const contextValue = {
      productsByCategory,
      isLoading,
      fetchProducts: this.fetchProducts,
    };

    return (
      <ProductsContext.Provider value={contextValue}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}

export default ProductsProvider;
