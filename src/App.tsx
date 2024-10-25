import { lazy, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Items = lazy(() => import("./components/Items/Items"));
const Cart = lazy(() => import("./components/Cart/Cart"));
interface Food {
  name: string;
  price: number;
  text: string;
  images: string;
  type: string;
}
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}
export default function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [userType, setUserType] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const BASE_URL = "http://localhost:3000/foods";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleClick = (value: string) => {
    if (value === "all") setUserType("");
    else setUserType(value);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<Navbar handleClick={handleClick} foods={foods}></Navbar>}
        >
          <Route
            index
            element={
              <Items
                foods={foods}
                userType={userType}
                setCart={setCart}
              ></Items>
            }
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart}></Cart>}
          ></Route>
        </Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
