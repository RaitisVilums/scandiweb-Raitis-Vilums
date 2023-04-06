import { Fragment, PureComponent } from "react";
import CategoryPage from "../../Components/category-page/category-page.component";

export class Home extends PureComponent {
  render() {
    return (
      <Fragment>
        <CategoryPage />
      </Fragment>
    );
  }
}

export default Home;
