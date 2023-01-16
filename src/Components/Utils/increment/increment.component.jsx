import "./increment.styles.scss";

import { PureComponent } from "react";
import { CartContext } from "../../../Context/cart.context";

// Reusable component that calls CartContext functions to increase or decrease the quantity of items in cart
// Used in Checkout and CartDropdown Components
class IncrementQuantity extends PureComponent {
  static contextType = CartContext;
  render() {
    const { incrementQuantity, decrementQuantity } = this.context;
    const { classBTN, classLabel, classDIV, id, quantity } = this.props;
    return (
      <div className={classDIV}>
        <button
          className={`${classBTN} plus`}
          onClick={() => incrementQuantity(id)}
        />
        <label className={classLabel}> {quantity}</label>
        <button
          className={`${classBTN} minus`}
          onClick={() => decrementQuantity(id)}
        />
      </div>
    );
  }
}

export default IncrementQuantity;
