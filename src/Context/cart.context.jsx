import { createContext, PureComponent } from "react";

// TODO 1) Create a Context that adds items to Cart
// TODO 2) Check if the Item is available for the cart ( if it has attributes or no)

// Function that checks if CartItem id === to item that is being added to cart
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if Item exists, increse the item quantity
  // else add the new item to cart
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  // returning cartItems array with newely added values and the old values
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

  // Function that opens and closes the cart
  setIsCartOpen = () => {
    this.setState((prevState) => ({
      isCartOpen: !prevState.isCartOpen,
    }));
  };

  // Function that adds item to cart
  addItemToCart = (productToAdd) => {
    // console.log(productToAdd);
    this.setState((state) => ({
      cartItems: addCartItem(state.cartItems, productToAdd),
    }));
    // console.log(`it works`);
  };

  // increses the quantity of item in cart
  incrementQuantity = (productId) => {
    this.setState((state) => {
      // selecting produtID and checking if it's === to cart item.id
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === productId) {
          // incresing the quantity of item in cart
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      // returning updated cartItems array
      return {
        cartItems: updatedCartItems,
      };
    });
  };

  // Function that decreases item quantity in cart
  // also deletes the item from cart if itš quantity goes below 1
  decrementQuantity = (productId) => {
    this.setState((state) => {
      const updatedCartItems = state.cartItems
        .map((item) => {
          if (item.id === productId) {
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

  // Saving the Cart state into local sotrage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    }
  }
  // When web reloads setting the Cart state from local storage
  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.setState({ cartItems: cartItems });
    console.log(cartItems);
  }

  render() {
    const value = {
      isCartOpen: this.state.isCartOpen,
      setIsCartOpen: this.setIsCartOpen,
      addItemToCart: this.addItemToCart,
      cartItems: this.state.cartItems,
      incrementQuantity: this.incrementQuantity,
      decrementQuantity: this.decrementQuantity,
    };
    return (
      <CartContext.Provider value={value}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
