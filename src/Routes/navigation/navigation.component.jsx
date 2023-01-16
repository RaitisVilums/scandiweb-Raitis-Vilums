import Header from "../../Components/navigation/header.component";
import { Fragment, PureComponent } from "react";

export class Navigation extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
      </Fragment>
    );
  }
}

export default Navigation;
