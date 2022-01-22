import loadable from "@loadable/component";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "../../hooks/useToggle";
import { Toggler } from "../../redux/actions/toggleActions";
import {
  cart__badge, header,
  navbar, navbar__links, navbar__logo
} from "./navigation.module.css";

//lazy loaded Cart Component
const Cart = loadable(() => import("../cart"));

const NavBar = () => {
  // getCartItems
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const toggler = useSelector((state) => state.toggle);
  const { toggle } = toggler;

  //toggle cart box
  const [handleToggle, setHandleToggle] = useToggle(false);

  const dispatch = useDispatch();
  const removeCartBox = () => {
    setHandleToggle();
    dispatch(Toggler(false));
  };

  //destructured classes
  // const { header, navbar, navbar__logo, navbar__links, cart__badge } = classes;

  return (
    <header className={header}>
      <nav className={navbar}>
        <div className={navbar__logo}>
          <h2>Oasis_</h2>
        </div>

        <ul id="CART" className={navbar__links}>
          <li onClick={removeCartBox}>
            <i className="fa fa-shopping-cart"></i>
            <span className={cart__badge}>{cartItems.length}</span>
          </li>
        </ul>
      </nav>

      {(handleToggle || toggle) && <Cart fallback={<div>Loading...</div>} />}
    </header>
  );
};

export default NavBar;
