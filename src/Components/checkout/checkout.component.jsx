import { Fragment, PureComponent } from "react";
import "./checkout.styles.scss";
import Button from "../Utils/button/button.component";
import Checkbox from "../Utils/checkbox/checkbox.component";
import ProductPrice from "../Utils/price/product-total.component";
import CheckoutTotal from "../Utils/price/checkout-total.component";
import CheckoutEmpty from "../Utils/placeholders/checkout-empty.component";
import { CartContext } from "../../Context/cart.context";
import ChangeQuantity from "../Utils/quantityChange/quantity.component";
import ProductImageSlider from "../Utils/imageSlider/image-slider.component";

export class Checkout extends PureComponent {
  static contextType = CartContext;
  state = {
    currentIndex: 0,
  };

  render() {
    const cartItems = this.context.cartItems;

    if (cartItems.length === 0) {
      return <CheckoutEmpty />;
    }
    return (
      <section className="checkout">
        <div className="checkout-heading">
          <h1>CART</h1>
        </div>
        <hr />
        {cartItems.map((product) => {
          const {
            id,
            name,
            brand,
            gallery,
            prices,
            quantity,
            attributes,
            selectedAttribute,
          } = product;
          return (
            <Fragment key={id}>
              <div className="checkout-product">
                <div className="checkout-product-description">
                  <h2>
                    <span className="checkout-product-brand">{brand}</span>
                  </h2>
                  <h2 className="checkout-product-name">{name}</h2>
                  <span className="checkout-product-price">
                    <ProductPrice prices={prices} />
                  </span>
                  {attributes.map((attribute) => (
                    <Fragment key={attribute.id}>
                      <label className="attribute-label">{attribute.id}</label>
                      <div className="attribute-input">
                        {attribute.items.map((item) => (
                          <Checkbox
                            key={item.id}
                            className="checkbox"
                            type={attribute.type}
                            name={attribute.id}
                            value={item.value}
                            checked={
                              selectedAttribute[attribute.id] === item.value
                            }
                            disabled
                          />
                        ))}
                      </div>
                    </Fragment>
                  ))}
                </div>
                <ChangeQuantity
                  id={id}
                  selectedAttribute={selectedAttribute}
                  quantity={quantity}
                  classBTN={`change`}
                  classDIV={`checkout-product-increment`}
                  classLabel={`checkout-product-label`}
                />
                <ProductImageSlider id={id} gallery={gallery} name={name} />
              </div>
              <hr />
            </Fragment>
          );
        })}
        <div className="checkout-wrapper">
          <CheckoutTotal cartItems={cartItems} />
          <Button className={`order`}>ORDER</Button>
        </div>
      </section>
    );
  }
}

export default Checkout;
