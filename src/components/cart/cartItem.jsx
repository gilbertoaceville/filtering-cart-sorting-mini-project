import React from "react";
import classes from "./cart.module.css";

const CartItem = ({ item, removeCartItem }) => {
  // destructured props
  const { name, price, imageUrl, id } = item;
  
  // destructured classes
  const {
    cart__items,
    cart_items_left_layout,
    cart_items_right_layout,
    cart__price,
    cart_items_wrap
  } = classes;
  return (
    <div className={cart_items_wrap}>
      <i onClick={()=>removeCartItem(id)} className="fa fa-times"></i>
      <div className={cart__items}>
        <div className={cart_items_left_layout}>
          <header>
            <h4>{name}</h4>
          </header>
          <p className={cart__price}>${price}</p>
        </div>
        <div className={cart_items_right_layout}>
          <img
            src={imageUrl}
            alt="Dog_picture"
            draggable={false}
            loading="lazy"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
