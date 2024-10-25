import { useSearchParams } from "react-router-dom";
import "./items.css";
import { useState } from "react";

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
interface ItemsProps {
  userType: string;
  foods: Food[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Items = ({ userType, foods, setCart }: ItemsProps) => {
  const [searchParam] = useSearchParams();
  const filtertype = searchParam.get("filter");
  const search = searchParam.get("search");

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const filteredFoods = foods.filter((food) => {
    if (filtertype && food.type !== filtertype) {
      return false;
    }

    if (
      search &&
      !food.name.toLowerCase().includes(search.toLowerCase()) &&
      !food.text.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
  const handleQuantityChange = (foodName: string, increment: boolean) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [foodName]: Math.max(
        0,
        (prevQuantities[foodName] || 0) + (increment ? 1 : -1)
      ),
    }));
  };
  const handleAddToCart = (food: Food) => {
    const quantity = quantities[food.name] || 0;
    if (quantity === 0) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.name === food.name
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { name: food.name, price: food.price, quantity }];
      }
    });

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [food.name]: 0,
    }));
  };

  return (
    <div className="item-container">
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food, i) => (
          <div className="details" key={i}>
            <div className="img-container">
              {food.images ? (
                <img
                  src={`http://localhost:5173/src${food.images}`}
                  alt={food.images}
                  style={{ width: "200px", height: "auto" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="text">
              <h3>{food.name}</h3>
              <p>Price: ${food.price}</p>
              <p>{food.text}</p>

              <div className="item-num">
                <button onClick={() => handleQuantityChange(food.name, false)}>
                  -
                </button>
                <p>{quantities[food.name] || 0}</p>
                <button onClick={() => handleQuantityChange(food.name, true)}>
                  +
                </button>
                <div className="cart-btn">
                  <button onClick={() => handleAddToCart(food)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>Item not found</p>
      )}
    </div>
  );
};

export default Items;
