import { Fragment, PureComponent } from "react";
import "./checkout.styles.scss";
import Button from "../Utils/button/button.component";
import Checkbox from "../Utils/checkbox/checkbox.component";
import ProductPrice from "../Utils/price/product-total.component";
import CheckoutTotal from "../Utils/price/checkout-total.component";
import CheckoutEmpty from "../Utils/placeholders/checkout-empty.component";
import { CartContext } from "../../Context/cart.context";
import IncrementQuantity from "../Utils/increment/increment.component";

export class Checkout extends PureComponent {
  static contextType = CartContext;
  state = {
    currentIndex: 0,
  };

  handleIncrement = (id, increment, gallery) => {
    // TODO Figure out the logic
    const cartItems = this.context.cartItems;
    let cartItemId = cartItems.map((product) => product.id);
    let filteredId = cartItemId.filter((itemId) => itemId === id);

    if (filteredId.length > 0) {
      this.setState((prevState) => {
        let newIndex = prevState.currentIndex + increment;
        if (newIndex < 0) {
          newIndex = 0;
        } else if (newIndex >= gallery.length) {
          newIndex = gallery.length - 1;
        }
        return { currentIndex: newIndex };
      });
    }
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
          // console.log(`selected attribute - ${product} `);
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
                <IncrementQuantity
                  id={id}
                  quantity={quantity}
                  classBTN={`change`}
                  classDIV={`checkout-product-increment`}
                  classLabel={`checkout-product-label`}
                />
                <div className="checkout-product-image">
                  <img src={gallery[this.state.currentIndex]} alt={name} />
                  <div>
                    <button
                      className="btn-next left"
                      onClick={() => this.handleIncrement(id, 1, gallery)}
                    ></button>
                    <button
                      className="btn-next right"
                      onClick={() => this.handleIncrement(id, -1, gallery)}
                    ></button>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          );
        })}
        <div className="checkout-wrapper">
          <CheckoutTotal cartItems={cartItems} />
          <Button className={` order`}>ORDER</Button>
        </div>
      </section>
    );
  }
}

export default Checkout;
