import "./product-card.styles.scss";
import ProductPrice from "../Utils/price/product-total.component";

import { PureComponent } from "react";

import { CartContext } from "../../Context/cart.context";
import { ProductContext } from "../../Context/product.context";
import htmlReactParser from "html-react-parser";

import AttributeSet from "../Utils/attributeSet/attribute-set.component";
import ImageGallery from "../Utils/imageGalery/image-gallery.component";

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
  handleChange = (event) => {
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
  };
  handleAddToCart = (addItemToCart, attributes) => {
    const { selectedAttribute } = this.state;
    const { id, name, gallery, brand, prices, inStock } = this.context.product;

    const noAttributes = attributes.length === 0;
    const allAttributesSelected =
      Object.keys(selectedAttribute).length === attributes.length;
    const canAddToCart = (noAttributes || allAttributesSelected) && inStock;

    if (canAddToCart) {
      addItemToCart({
        id,
        name,
        gallery,
        brand,
        prices,
        attributes,
        selectedAttribute,
      });
    }
  };

  componentDidMount() {
    const { fetchProduct } = this.context;
    const productID = this.props.match.params.id;
    fetchProduct(productID);
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
          console.log(attributes);
          return (
            <div className="product-card" key={id}>
              <ImageGallery gallery={gallery} name={name} />
              <div>
                <div className="description">
                  <div className="description-title">
                    <h1 className="brand">{brand}</h1>
                    <h1 className="title">{name}</h1>
                  </div>
                  {attributes.map((attribute) => (
                    <div className="description-checkbox" key={attribute.id}>
                      <div className="margin-btm">
                        <label>{attribute.id}:</label>
                      </div>
                      <div className="input-wrapper">
                        {attribute.items.map((item) => (
                          <AttributeSet
                            key={`${attribute.id}-${item.value}`}
                            attribute={attribute}
                            item={item}
                            selectedAttribute={this.state.selectedAttribute}
                            handleChange={this.handleChange.bind(this)}
                          />
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
                      onClick={() =>
                        this.handleAddToCart(addItemToCart, attributes)
                      }
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
