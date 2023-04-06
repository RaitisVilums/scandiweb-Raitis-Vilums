import "./product-card.styles.scss";
import ProductPrice from "../Utils/price/product-total.component";
import { Product } from "../../Data/queries";
import { Fragment, PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { CartContext } from "../../Context/cart.context";
import htmlReactParser from "html-react-parser";

export class ProductCard extends PureComponent {
  static contextType = CartContext;
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

  // checking if the product id changes,reseting the attributes
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.productid !== this.props.match.params.productid
    ) {
      this.resetSelectedAttribute(this.props.match.params.productid);
    }
  }

  render() {
    const { match } = this.props;
    const productID = match.params.productid;
    const { addItemToCart } = this.context;

    return (
      // using Query to fetch data from Apollo server and GraphQl
      // using match.params to get chosen products ID
      <Query query={Product} variables={{ id: productID }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..";
          if (error) return `Error! ${error.message}`;
          const { product } = data;
          // console.log(product);
          // destructuring the data object
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
      </Query>
    );
  }
}

export default ProductCard;
