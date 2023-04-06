import React from "react";
import ReactDOM from "react-dom/client";
import "./index.styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./Context/categories.context";
import CartProvider from "./Context/cart.context";
import CurrencyProvider from "./Context/currency.context";

import ProductsProvider from "./Context/products.context";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CategoriesProvider client={client}>
        <ProductsProvider client={client}>
          <CurrencyProvider client={client}>
            <CartProvider>
              <App />
            </CartProvider>
          </CurrencyProvider>
        </ProductsProvider>
      </CategoriesProvider>
    </BrowserRouter>
  </ApolloProvider>
);

reportWebVitals();
