import React, { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { Toggler } from "../../redux/actions/toggleActions";
import { DataContext } from "../../screens/HomeScreen";
import { dragItemTop } from "../../utility/functions";
import { products } from "../../utility/json";
import CustomButton from "../button/customButton";
import classes from "./product.module.css";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const { items } = useContext(DataContext);

  // destructured props
  const { bestseller, imageUrl, category, name, price, _id } = item;
  const targetRef = useRef(null);
  // const isVisible = useElementOnScreen(
  //   {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.3,
  //   },
  //   targetRef
  // );

  /**
   * dispatches a particular product to cart...
   * custom button component is unmounted
   */
  const results = items ? items : products;
  const addToCartHandler = () => {
    dispatch(Toggler(true));
    dispatch(addToCart(results, _id));
    dragItemTop("a", "#CART");
  };

  // destructured classes
  const { product_container, product_img_container, product_details } = classes;

  return (
    <figure className={product_container}>
      <div className={product_img_container}>
        {bestseller && <span>Best Seller</span>}
        <img
          src={imageUrl}
          ref={targetRef}
          alt="product"
          height="100%"
          width="100%"
          loading="lazy"
        />
        <CustomButton
          onclick={addToCartHandler}
          label="Add to cart"
          styleChanger={true}
        />
      </div>

      <div className={product_details}>
        <header>
          <h5>{category}</h5>
          <h3>{name}</h3>
        </header>
        <p>${price}</p>
      </div>
    </figure>
  );
};

export default Product;
