import "./App.styles.scss";
import Home from "./Routes/home/home.component";
import Shop from "./Routes/shop/shop.component";
import ShopItem from "./Routes/products/products.component";
import CartComponent from "./Routes/cart/cart.component";
import { Fragment, PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Routes/navigation/navigation.component";

export class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path={`/`} component={Home} />
          <Route path={`/shop/:category`} component={Shop} />
        </Switch>
      </Fragment>
    );
  }
}
export default App;
