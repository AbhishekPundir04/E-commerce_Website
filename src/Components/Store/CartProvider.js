import { useState, useEffect } from "react";
import CartContext from "./cart-context";

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      const storedItems = JSON.parse(localStorage.getItem("cartItems"));
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://crudcrud.com/api/7fd9d59b2f844b4fa43bac9a6780e8e1/Cart");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCartHandler = (item) => {
    const existingItem = items.find((cartItem) => cartItem.title === item.title);
    if (existingItem) {
      alert("Item already exists");
    } else {
      setItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeItemHandler = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const emptyCartHandler = () => {
    setItems([]);
  };

  const initializeCartHandler = (items) => {
    setItems(items);
  };

  const mapIDHandler = (id) => {
    items.id = id;
  };

  const cartContext = {
    items: items,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemHandler,
    emptyCart: emptyCartHandler,
    initilizeCart: initializeCartHandler,
    mapID: mapIDHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
