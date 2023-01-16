import { PureComponent } from "react";
import Button from "../button/button.component";

export class CheckoutEmpty extends PureComponent {
  render() {
    return (
      <section className="checkout">
        <div className="checkout-heading">
          <h1>Cart</h1>
        </div>
        <hr />
        <div className="checkout-wrapper">
          <h1>
            Tax 21%: <span>0</span>
          </h1>
          <h1>
            Quantity: <span>0</span>
          </h1>
          <h1>
            Total: <span>0</span>
          </h1>
          <Button className={` order`}>ORDER</Button>
        </div>
      </section>
    );
  }
}

export default CheckoutEmpty;
