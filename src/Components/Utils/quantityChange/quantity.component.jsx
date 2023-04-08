import { PureComponent } from "react";
import { CartContext } from "../../../Context/cart.context";

import { PlusIcon, MinusIcon } from "../../../Assets/_index";

export class ChangeQuantity extends PureComponent {
  static contextType = CartContext;
  render() {
    const { incrementQuantity, decrementQuantity } = this.context;
    const { classBTN, classLabel, classDIV, id, quantity, selectedAttribute } =
      this.props;
    return (
      <div className={classDIV}>
        <PlusIcon
          className={`${classBTN}`}
          onClick={() => incrementQuantity(id, selectedAttribute)}
          type="button"
        />
        <label className={classLabel}> {quantity}</label>
        <MinusIcon
          className={`${classBTN}`}
          onClick={() => decrementQuantity(id, selectedAttribute)}
          type="button"
        />
      </div>
    );
  }
}

export default ChangeQuantity;
