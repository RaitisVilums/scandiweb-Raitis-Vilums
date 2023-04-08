import { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import { CartContext } from "../../../Context/cart.context";

class EmptyCart extends PureComponent {
  static contextType = CartContext;

  closeCartHandler = () => {
    // console.log(`it works`);
    const { setIsCartOpen } = this.context;
    setIsCartOpen(false);
  };
  render() {
    return (
      <Fragment>
        <div className="dropdown">
          <div className="dropdown-heading">
            <h1>My Bag, No Items </h1>
          </div>
          <div className="dropdown-total">
            <h2>Total</h2>
            <h2 className="amount">0</h2>
          </div>
          <div className="dropdown-btns">
            <Link to={"/cart"}>
              <Button onClick={this.closeCartHandler}>View Bag</Button>
            </Link>
            <Link to={"/cart"}>
              <Button className="check" onClick={this.closeCartHandler}>
                Check Out
              </Button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EmptyCart;
