import "./cart-dropdown.styles.scss";
import Button from "../Utils/button/button.component";
import Checkbox from "../checkbox/checkbox.component";
import ProductPrice from "../price/product-total.component";
import CartTotal from "../price/cart-total.component";
import EmptyCart from "../Utils/placeholders/cart-empty.component";
import IncrementQuantity from "../Utils/increment/increment.component";
import { CartContext } from "../../Context/cart.context";
import { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";

export class CartDropdown extends PureComponent {
  static contextType = CartContext;
  // function that closes the cart
  closeCartHandler = () => {
    // console.log(`it works`);
    const { setIsCartOpen } = this.context;
    setIsCartOpen(false);
  };
  render() {
    const cartItems = Object.values(this.context.cartItems);
    // Renders an empty cart, if there are no items
    if (cartItems.length === 0) return <EmptyCart />;

    return (
      <Fragment>
        {/* backdrop has a onClick that closes the Cart */}
        <div className="backdrop" onClick={this.closeCartHandler} />
        <div className="dropdown">
          <div className="dropdown-heading">
            <h1>My Bag, </h1>
            <p>
              <span>{cartItems.length}</span>
              {` item${cartItems.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <div className="product-wrapper">
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
              // console.log(selectedAttribute);
              return (
                <div key={id} className="dropdown-product">
                  <div className="dropdown-product-description">
                    <h2>
                      <span className="dropdown-product-brand">{brand}</span>
                    </h2>
                    <h2 className="dropdown-product-name"> {name} </h2>
                    <span className="dropdown-product-price">
                      <ProductPrice prices={prices} />
                    </span>

                    {attributes.map((attribute) => (
                      <Fragment>
                        <p className="checkbox-label">{attribute.id}:</p>
                        <div className="justawrapper">
                          {attribute.items.map((item) => {
                            // console.log(selectedAttribute[attribute.id]);
                            console.log(attribute.type);
                            return (
                              <Checkbox
                                key={item.id}
                                classNameColor="color-checkbox"
                                className="checkbox-change"
                                type={attribute.type}
                                name={attribute.id}
                                value={item.value}
                                checked={
                                  selectedAttribute[attribute.id] === item.value
                                }
                                disabled
                              />
                            );
                          })}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div className="dropdown-product-increment">
                    <IncrementQuantity
                      id={id}
                      quantity={quantity}
                      classBTN={`btn-increment`}
                      classDIV={`dropdown-product-increment`}
                    />
                  </div>
                  <div className="dropdown-product-image">
                    <img src={gallery[0]} alt={id} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="dropdown-total">
            <h2>Total</h2>
            <CartTotal cartItems={cartItems} />
          </div>
          <div className="dropdown-btns">
            <Link to={`/cart`}>
              <Button onClick={this.closeCartHandler}>View Bag</Button>
            </Link>
            <Link to={`/cart`}>
              <Button onClick={this.closeCartHandler} className="check">
                Check Out
              </Button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CartDropdown;
