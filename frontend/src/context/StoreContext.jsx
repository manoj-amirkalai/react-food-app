import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { food_list as food_list_default } from "../assets/assets";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const url = "https://manoj-food-app-backend.onrender.com";

  // const url = "http://localhost:5000";

  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState();

 const addToCart = async (itemId) => {
  setCartItems((prev = {}) => {
    if (!prev[itemId]) {
      return { ...prev, [itemId]: 1 };
    }
    return { ...prev, [itemId]: prev[itemId] + 1 };
  });

  if (token) {
    await axios.post(
      url + "/api/cart/add",
      { itemId },
      { headers: { token } }
    );
  }
};

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
    toast.info("item removed");
  };
const getTotalCartAmount = () => {
  let totalAmount = 0;

  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = food_list.find(
        (product) => String(product._id) === String(item)
      );

      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }

  return totalAmount;
};
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list([...food_list_default,...response.data.data]);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    setToken,
    token,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
