import "./header.styles.scss";
import NavBar from "./navbar.component";
import Cart from "../cart/cart.component";
import { PureComponent } from "react";
import Currency from "./currency.component";
import { Logo } from "../../Assets/_index";
import { CartContext } from "../../Context/cart.context";

export class Header extends PureComponent {
  static contextType = CartContext;
  constructor() {
    super();
    this.state = {
      active: false,
    };
    this.dropDownHandler = this.dropDownHandler.bind(this);
  }
  dropDownHandler() {
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  render() {
    const { isCartOpen, setIsCartOpen } = this.context;
    const { dropDownHandler, state } = this;
    return (
      <>
        {isCartOpen && (
          <div className="backdrop" onClick={() => setIsCartOpen()} />
        )}
        <header className="header">
          <NavBar />
          <Logo className="header-logo" />
          <div className="header-dropdown">
            <Currency dropDown={dropDownHandler} active={state.active} />
            <Cart dropDown={dropDownHandler} active={state.active} />
          </div>
        </header>
      </>
    );
  }
}

export default Header;
