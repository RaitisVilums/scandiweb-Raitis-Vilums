import "./header.styles.scss";
import NavBar from "./navbar.component";
import Cart from "../cart/cart.component";
import { PureComponent } from "react";
import Currency from "./currency.component";

export class Header extends PureComponent {
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
    const { dropDownHandler, state } = this;
    return (
      <header className="header-wrapper">
        <NavBar />
        <div className="header-logo" />
        <div className="header-dropdown">
          <Currency dropDown={dropDownHandler} active={state.active} />
          <Cart dropDown={dropDownHandler} active={state.active} />
        </div>
      </header>
    );
  }
}

export default Header;
