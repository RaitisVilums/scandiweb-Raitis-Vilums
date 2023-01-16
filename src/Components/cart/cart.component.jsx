import "./cart.styles.scss";
import CART from "../../Assets/cart.svg";
import CartDropdown from "./cart-dropdown.component";
import { PureComponent } from "react";
import { CartContext } from "../../Context/cart.context";

export class Cart extends PureComponent {
  static contextType = CartContext;

  // Function that opens the cart
  // also getting props of Currency state, calling func dropDown, to close the
  // currencies dropdown menu if it's open
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
      <div className="cart-wrapper">
        <div className="cart-wrapper-quantity">
          <p>{totalQuantity}</p>
        </div>
        <img src={CART} alt="cart" onClick={this.dropDownHandler} />
        {this.context.isCartOpen ? <CartDropdown /> : ""}
      </div>
    );
  }
}

export default Cart;
