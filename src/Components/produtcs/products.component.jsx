import "./products.styles.scss";
import ProductPrice from "../price/product-total.component";
import { Fragment, PureComponent } from "react";
import { CategoriesContext } from "../../Context/categories.context";
import { withRouter, Link } from "react-router-dom";

class Products extends PureComponent {
  static contextType = CategoriesContext;

  state = {
    categoryName: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.input !== this.props.match.params.input) {
      this.setState({ categoryName: this.props.match.params.input });
    }
  }

  render() {
    const { match } = this.props;
    const categoryName = match.params.input;
    const { category } = this.context;
    const { products } = category;
    // console.log(categoryName);

    let filteredProducts = [];
    if (products && (categoryName === "all" || !categoryName)) {
      filteredProducts = products;
    } else if (products) {
      filteredProducts = products.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    // console.log(filteredProducts);

    return (
      <Fragment>
        <div className="products-heading">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </div>
        <section className="products">
          {filteredProducts.map((product) => {
            const { id, name, prices, gallery, inStock } = product;
            // console.log(inStock);
            return (
              <div className={inStock ? `product` : `out-of-stock`} key={id}>
                <div className="product-image">
                  <img src={gallery[0]} alt={name} />
                </div>
                <div className="product-description">
                  <h2 className="product-name">{name}</h2>
                  <ProductPrice prices={prices} />
                </div>
                <Link to={`/product/${id}`}>
                  <button className="btn-add-to-cart" />
                </Link>
              </div>
            );
          })}
        </section>
      </Fragment>
    );
  }
}

export default withRouter(Products);