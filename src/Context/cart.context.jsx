import { createContext, PureComponent } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productToAdd.id &&
      JSON.stringify(cartItem.selectedAttribute) ===
        JSON.stringify(productToAdd.selectedAttribute)
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id &&
      JSON.stringify(cartItem.selectedAttribute) ===
        JSON.stringify(productToAdd.selectedAttribute)
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  return [
    ...cartItems,
    {
      id: productToAdd.id,
      name: productToAdd.name,
      gallery: productToAdd.gallery,
      brand: productToAdd.brand,
      prices: productToAdd.prices,
      attributes: productToAdd.attributes,
      selectedAttribute: productToAdd.selectedAttribute,
      quantity: 1,
    },
  ];
};

const getDefaultAttributes = (attributes) => {
  const selectedAttribute = {};
  attributes.forEach((attribute) => {
    selectedAttribute[attribute.name] = attribute.items[0].value;
  });
  return selectedAttribute;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
});

export class CartProvider extends PureComponent {
  state = {
    isCartOpen: false,
    cartItems: [],
  };

  setIsCartOpen = () => {
    this.setState((prevState) => ({
      isCartOpen: !prevState.isCartOpen,
    }));
  };

  addItemToCart = (productToAdd) => {
    this.setState((state) => ({
      cartItems: addCartItem(state.cartItems, productToAdd),
    }));
  };

  addItemWithDefaultAttributes = (productToAdd) => {
    const defaultSelectedAttribute = getDefaultAttributes(
      productToAdd.attributes
    );
    this.setState((state) => ({
      cartItems: addCartItem(state.cartItems, {
        ...productToAdd,
        selectedAttribute: defaultSelectedAttribute,
      }),
    }));
  };

  incrementQuantity = (productId, selectedAttribute) => {
    this.setState((state) => {
      const updatedCartItems = state.cartItems.map((item) => {
        if (
          item.id === productId &&
          JSON.stringify(item.selectedAttribute) ===
            JSON.stringify(selectedAttribute)
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return {
        cartItems: updatedCartItems,
      };
    });
  };

  decrementQuantity = (productId, selectedAttribute) => {
    this.setState((state) => {
      const updatedCartItems = state.cartItems
        .map((item) => {
          if (
            item.id === productId &&
            JSON.stringify(item.selectedAttribute) ===
              JSON.stringify(selectedAttribute)
          ) {
            return { ...item, quantity: Math.max(item.quantity - 1, 0) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return {
        cartItems: updatedCartItems,
      };
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    }
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.setState({ cartItems: cartItems });
  }

  render() {
    const contextValue = {
      isCartOpen: this.state.isCartOpen,
      setIsCartOpen: this.setIsCartOpen,
      addItemToCart: this.addItemToCart,
      cartItems: this.state.cartItems,
      addItemWithDefaultAttributes: this.addItemWithDefaultAttributes,
      incrementQuantity: this.incrementQuantity,
      decrementQuantity: this.decrementQuantity,
    };
    return (
      <CartContext.Provider value={contextValue}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
