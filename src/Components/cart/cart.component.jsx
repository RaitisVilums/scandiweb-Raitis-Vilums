import "./cart.styles.scss";
import { PureComponent } from "react";
import { CartContext } from "../../Context/cart.context";

import { CartIcon } from "../../Assets/_index";
import CartDropdown from "./cart-dropdown.component";

export class Cart extends PureComponent {
  static contextType = CartContext;

  dropDownHandler = () => {
    const { dropDown, active } = this.props;
    this.context.setIsCartOpen();
    if (active) dropDown();
  };

  render() {
    const cartItems = Object.values(this.context.cartItems);
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return (
      <>
        <div className="cart-wrapper">
          <div className="cart-wrapper-quantity">
            <p>{totalQuantity}</p>
          </div>
          <CartIcon onClick={this.dropDownHandler} />
          {this.context.isCartOpen && <CartDropdown />}
        </div>
      </>
    );
  }
}

export default Cart;
