import { useMemo, useState } from "react";
import "./cart.css";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart = ({ cart, setCart }: CartProps) => {
  const itemTotalPrices = useMemo(
    () => cart.map((item) => item.price * item.quantity),
    [cart]
  );

  const totalPrice = useMemo(
    () => itemTotalPrices.reduce((acc, price) => acc + price, 0),
    [itemTotalPrices]
  );

  const handleQuantityChange = (increment: boolean, index: number) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const newQuantity = increment
        ? updatedCart[index].quantity + 1
        : Math.max(0, updatedCart[index].quantity - 1);
      updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
      return updatedCart;
    });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Cart Items</h2>
      <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <tr className="cart-item" key={index}>
                <td className="item-name">{item.name}</td>
                <td className="item-price">${item.price}</td>
                <td className="item-quantity">
                  <button onClick={() => handleQuantityChange(false, index)}>
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(true, index)}>
                    +
                  </button>
                </td>
                <td className="item-total-price">${itemTotalPrices[index]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="empty-cart-message">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="sub-total">
        <strong>Total Price of Food: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Cart;
