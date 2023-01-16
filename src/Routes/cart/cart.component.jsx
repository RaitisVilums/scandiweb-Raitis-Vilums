import Checkout from "../../Components/checkout/checkout.component";
import { Fragment, PureComponent } from "react";

export class CartComponent extends PureComponent {
  render() {
    return (
      <Fragment>
        <Checkout />
      </Fragment>
    );
  }
}

export default CartComponent;
