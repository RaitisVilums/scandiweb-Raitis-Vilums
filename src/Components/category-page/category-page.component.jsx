import "./category-page.styles.scss";
import { NavLink } from "react-router-dom";
import { PureComponent } from "react";
import { CategoriesContext } from "../../Context/categories.context";

class CategoryPage extends PureComponent {
  static contextType = CategoriesContext;

  state = {
    categoryNames: new Set(),
  };

  componentDidUpdate(prevProps) {
    const { categoryNames } = this.state;
    const { category } = this.context;
    const { products } = category;

    if (prevProps.category !== this.props.category) {
      products.forEach((product) => {
        const { category } = product;
        categoryNames.add(category);
      });
    }
  }

  render() {
    const { categoryNames } = this.state;
    const { category } = this.context;
    const { name, products } = category;

    return (
      <main className="main-wrapper">
        <div key={name} className="heading-wrapper">
          {name ? (
            <NavLink key={name} replace={true} to={`/shop/${name}`}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </NavLink>
          ) : null}
          {Array.isArray(products) ? (
            products.map((product) => {
              const { category } = product;
              const categoryName = category;

              if (!categoryNames.has(categoryName)) {
                categoryNames.add(categoryName);
              }
              return null;
            })
          ) : (
            <div>No products found</div>
          )}
          {Array.from(categoryNames).map((category) => (
            <NavLink key={category} to={`/shop/${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          ))}
        </div>
      </main>
    );
  }
}

export default CategoryPage;
