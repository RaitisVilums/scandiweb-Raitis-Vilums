import "./navbar.styles.scss";
import { PureComponent } from "react";
import { Link } from "react-router-dom";

export class NavBar extends PureComponent {
  render() {
    return (
      <nav className="nav-bar">
        <Link to={`/`} className="nav-bar-item">
          women
        </Link>

        <Link to={`/`} className="nav-bar-item">
          men
        </Link>
        <Link to={`/`} className="nav-bar-item">
          kids
        </Link>
      </nav>
    );
  }
}

export default NavBar;
