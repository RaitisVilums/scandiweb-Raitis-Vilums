import "./product-card.styles.scss";
import ProductPrice from "../Utils/price/product-total.component";

import { Fragment, PureComponent } from "react";

import { CartContext } from "../../Context/cart.context";
import { ProductContext } from "../../Context/product.context";
import htmlReactParser from "html-react-parser";

import { withRouter } from "react-router-dom";

export class ProductCard extends PureComponent {
  static contextType = ProductContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedAttribute: {},
    };
  }

  // handling the selected attributes
  handleChange(event) {
    const { name, value, checked } = event.target;
    let selectedAttribute = { ...this.state.selectedAttribute };
    if (checked) {
      selectedAttribute[name] = value;
    } else {
      delete selectedAttribute[name];
    }
    this.setState({
      selectedAttribute,
    });
    // console.log(selectedAttribute);
  }

  // reseting selected attributes
  resetSelectedAttribute = (productID) => {
    if (productID !== this.state.currentProductID) {
      this.setState({
        selectedAttribute: {},
        currentProductID: productID,
      });
    }
  };

  componentDidMount() {
    const { fetchProduct } = this.context;
    const productID = this.props.match.params.id;
    fetchProduct(productID);
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchProduct } = this.context;
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const productID = this.props.match.params.id;
      fetchProduct(productID);
    }
  }

  render() {
    const { product, isLoading } = this.context;

    return (
      <CartContext.Consumer>
        {({ addItemToCart }) => {
          if (isLoading) return "Loading...";
          if (!product) return "Error! No product data.";
          const { id, name, gallery, description, brand, prices, attributes } =
            product;
          return (
            <div className="product-card" key={id}>
              <div className="product-card-images">
                <div className="flex">
                  {gallery.length > 1 && (
                    <div className="flex-container">
                      {gallery.slice(1).map((image, index) => (
                        <img
                          className="small"
                          src={image}
                          alt={name}
                          key={`image-${index}`}
                        />
                      ))}
                    </div>
                  )}
                  {gallery.length > 0 && (
                    <img className="big" src={gallery[0]} alt={name} />
                  )}
                </div>
              </div>
              <div>
                <div className="description">
                  <div className="description-title">
                    <h1 className="brand">{brand}</h1>
                    <h1 className="title">{name}</h1>
                  </div>
                  {attributes.map((attribute) => (
                    <div className="description-checkbox" key={attribute.id}>
                      <div className="margin-btm">
                        <label>{attribute.id}</label>
                      </div>
                      <div className="input-wrapper">
                        {attribute.items.map((item) => (
                          <Fragment>
                            {attribute.type === "text" && (
                              <div
                                className="input-attribute"
                                style={{
                                  backgroundColor:
                                    this.state.selectedAttribute[
                                      attribute.id
                                    ] === item.value
                                      ? "black"
                                      : "inherit",
                                }}
                              >
                                <p
                                  style={{
                                    color:
                                      this.state.selectedAttribute[
                                        attribute.id
                                      ] === item.value
                                        ? "white"
                                        : "inherit",
                                    zIndex:
                                      this.state.selectedAttribute[
                                        attribute.id
                                      ] === item.value
                                        ? "1"
                                        : "-1",
                                  }}
                                >
                                  {item.value}
                                </p>
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  name={attribute.id}
                                  value={item.value}
                                  checked={
                                    this.state.selectedAttribute[
                                      attribute.id
                                    ] === item.value
                                  }
                                  onChange={this.handleChange.bind(this)}
                                />
                              </div>
                            )}
                            {attribute.type === "swatch" && (
                              <div
                                className="input-color"
                                style={{
                                  border:
                                    this.state.selectedAttribute[
                                      attribute.id
                                    ] === item.value
                                      ? "1px solid green"
                                      : "none",
                                }}
                              >
                                <div style={{ backgroundColor: item.value }} />
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  name={attribute.id}
                                  value={item.value}
                                  checked={
                                    this.state.selectedAttribute[
                                      attribute.id
                                    ] === item.value
                                  }
                                  onChange={this.handleChange.bind(this)}
                                />
                              </div>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="description-price">
                    <ProductPrice prices={prices} />
                  </div>
                  <div className="description-btn">
                    <button
                      className={`btn-add`}
                      // checking if product has attributes or not
                      onClick={() => {
                        if (
                          attributes.length === 0 ||
                          Object.keys(this.state.selectedAttribute).length ===
                            attributes.length
                        ) {
                          addItemToCart({
                            id,
                            name,
                            gallery,
                            brand,
                            prices,
                            attributes,
                            selectedAttribute: this.state.selectedAttribute,
                          });
                        }
                      }}
                    >
                      add to cart
                    </button>
                  </div>
                  <div className="description-para">
                    {htmlReactParser(description)}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default withRouter(ProductCard);
