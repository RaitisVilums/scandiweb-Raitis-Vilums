import ProductCard from "../../Components/product-card/product-card.component";
import { Fragment, PureComponent } from "react";

export class ShopItem extends PureComponent {
  render() {
    return (
      <Fragment>
        <ProductCard />
      </Fragment>
    );
  }
}

export default ShopItem;
