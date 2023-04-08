import "./category-page.styles.scss";
import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { CategoriesContext } from "../../Context/categories.context";

class CategoryPage extends PureComponent {
  static contextType = CategoriesContext;
  state = {
    categories: [],
  };

  componentDidMount() {
    const { categories } = this.context;
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;

    return (
      <main className="main">
        <div className="main-heading">
          {categories.map((category) => (
            <Link key={category.name} to={`/shop/${category.name}`}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </Link>
          ))}
        </div>
      </main>
    );
  }
}

export default CategoryPage;
