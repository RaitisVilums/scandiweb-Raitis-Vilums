import "./category-page.styles.scss";
import { NavLink } from "react-router-dom";
import { PureComponent } from "react";
import { CategoriesContext } from "../../Context/categories.context";

class CategoryPage extends PureComponent {
  static contextType = CategoriesContext;

  // creating an empty array
  state = {
    categoryNames: [],
  };

  // saving the state after reload
  componentDidUpdate(prevProps) {
    const { categoryNames } = this.state;
    const { category } = this.context;
    const { products } = category;

    if (prevProps.category !== this.props.category) {
      products.forEach((product) => {
        const { category } = product;
        if (!categoryNames.includes(category)) {
          categoryNames.push(category);
        }
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
          {/* there was no category ALL, so I decided to use category.name for all products */}
          {name && (
            <NavLink key={name} to={`/shop/${name}`}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </NavLink>
          )}
          {/* checking if the products is an array of data
            if it's not an array just return that no products are found
          */}
          {Array.isArray(products) ? (
            products.map((product) => {
              const { category } = product;
              const categoryName = category;

              if (!categoryNames.includes(categoryName)) {
                categoryNames.push(categoryName);
              }
              return null;
            })
          ) : (
            <div>No products found</div>
          )}
          {categoryNames.map((category) => (
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
