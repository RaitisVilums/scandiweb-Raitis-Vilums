import "./products.styles.scss";
import React, { PureComponent } from "react";
import { withRouter, Link } from "react-router-dom";
import { CartContext } from "../../Context/cart.context";
import { ProductsContext } from "../../Context/products.context";

import ProductPrice from "../Utils/price/product-total.component";
import CategoryPage from "../category-page/category-page.component";

class Products extends PureComponent {
  static contextType = ProductsContext;

  componentDidMount() {
    const { fetchProducts } = this.context;
    const { match } = this.props;
    const category = match.params.category;
    fetchProducts(category);
  }
  componentDidUpdate(prevProps) {
    const { fetchProducts } = this.context;
    const { category } = this.props.match.params;
    if (category !== prevProps.match.params.category) {
      fetchProducts(category);
    }
  }

  render() {
    const { isLoading, productsByCategory } = this.context;

    if (isLoading || !productsByCategory.products) {
      return (
        <>
          <CategoryPage />
          <div>Loading...</div>
        </>
      );
    }

    const { products } = productsByCategory;
    // console.log(products);
    return (
      <>
        <CategoryPage />
        <CartContext.Consumer>
          {({ addItemWithDefaultAttributes }) => (
            <section className="products">
              {products.map((product) => {
                const { id, gallery, name, prices, inStock, attributes } =
                  product;
                {
                  /* console.log(attributes); */
                }
                return (
                  <div
                    className={inStock ? `product` : `product out-of-stock`}
                    key={id}
                  >
                    <div className="product-image">
                      <Link className="product-link" to={`/product/${id}`} />
                      <img src={gallery[0]} alt={name} />
                    </div>
                    <div className="product-description">
                      <Link to={`/product/${id}`}>
                        <h2 className="product-name">{name}</h2>
                      </Link>
                      <ProductPrice prices={prices} />
                    </div>

                    <button
                      className="btn-add-to-cart"
                      onClick={() => addItemWithDefaultAttributes(product)}
                      disabled={!inStock}
                    />
                  </div>
                );
              })}
            </section>
          )}
        </CartContext.Consumer>
      </>
    );
  }
}

export default withRouter(Products);
