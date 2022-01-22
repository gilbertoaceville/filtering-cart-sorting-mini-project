import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItemFromCart } from "../../redux/actions/cartActions";
import CustomButton from "../button/customButton";
import classes from "./cart.module.css";
import CartItem from "./cartItem";

// CART COMPONENT
const Cart = () => {
  // action dispatcher
  const dispatch = useDispatch();

  //cartItems in global state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /**
   *
   * @param {*} id refers to unique id for a particular item
   * dispatch action to remove product from cart using id
   */
  const removeFromCartHandler = (id) => dispatch(removeItemFromCart(id));

  /**
   * @function clears all items from cart
   * dispatches action
   */
  const clearAllFromCart = () => {
    localStorage.removeItem("cart");
    if (cartItems.length > 0) return dispatch(clearCart());
    return;
  };

  // destructured classes
  const { container } = classes;

  return (
    <aside className={container}>
      {cartItems.length === 0 ? (
        <summary>No items available</summary>
      ) : (
        <>
          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                removeCartItem={removeFromCartHandler}
              />
            );
          })}

          <CustomButton
            onclick={clearAllFromCart}
            styleChanger={false}
            label="Clear"
          />
        </>
      )}
    </aside>
  );
};

export default Cart;
