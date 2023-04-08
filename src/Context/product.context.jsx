import React, { PureComponent } from "react";
import { Product } from "../Data/queries";

export const ProductContext = React.createContext({
  product: null,
  isLoading: false,
  fetchProduct: () => {},
});

export class ProductProvider extends PureComponent {
  state = {
    product: null,
    isLoading: false,
  };

  fetchProduct = (productID) => {
    this.setState({ isLoading: true });
    const variables = { id: productID };
    this.props.client
      .query({
        query: Product,
        variables,
      })
      .then(({ data }) => {
        this.setState({ product: data.product, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { product, isLoading } = this.state;

    const contextValue = {
      product,
      isLoading,
      fetchProduct: this.fetchProduct,
    };

    return (
      <ProductContext.Provider value={contextValue}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
