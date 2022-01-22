import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { Toggler } from "../../redux/actions/toggleActions";
import { DataContext } from "../../screens/HomeScreen";
import { products } from "../../utility/json";
import CustomButton from "../button/customButton";
import classes from "./details.module.css";

const ProductDetails = ({ item }) => {
  //destructured props
  const { name, imageUrl, category, description, _id, featured, dimensions } =
    item;

  const dispatch = useDispatch();

  const { items } = useContext(DataContext);

  /**
   * dispatches a particular product to cart...
   * custom button component is unmounted
   */
  const results = items ? items : products;
  const addToCartHandler = () => {
    dispatch(addToCart(results, _id));
    setTimeout(() => {
      dispatch(Toggler(true));
    }, 500);
  };

  //destructured classes
  const {
    hero_page_container,
    hero__page,
    hero_page_btn,
    hero_page_img,
    hero_page_img_desc,
    hero_page_desc_wrap,
    hero_page_desc,
    featured_text,
    suggestion_container,
    suggestion_imgs_container,
    suggestion_imgs,
    suggestion_details,
  } = classes;

  return (
    <article className={hero_page_container}>
      <section className={hero__page}>
        <header>
          <h2>{name}</h2>
          <div className={hero_page_btn}>
            <CustomButton
              onclick={addToCartHandler}
              label="Add to Cart"
              styleChanger={true}
            />
          </div>
        </header>
        <div className={hero_page_img}>
          {featured && <p className={featured_text}>Featured</p>}
          <img
            title={featured && "Featured"}
            src={imageUrl}
            height="100%"
            width="100%"
            draggable="false"
            alt={name}
          />
          {featured && (
            <span className={hero_page_img_desc}>Photo of the day</span>
          )}
        </div>
      </section>

      <section className={hero_page_desc_wrap}>
        <div className={hero_page_desc}>
          <header>
            <h4>About the {name}</h4>
            <h3>{category}</h3>
          </header>
          <p>{description}</p>
        </div>

        <section className={suggestion_container}>
          <header>
            <h4>People also buy</h4>
          </header>

          <div className={suggestion_imgs_container}>
            {[
              "https://images.pexels.com/photos/9552144/pexels-photo-9552144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              "https://images.pexels.com/photos/1223649/pexels-photo-1223649.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              "https://images.pexels.com/photos/8140373/pexels-photo-8140373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            ].map((item) => (
              <div
                key={item}
                className={suggestion_imgs}
                style={{
                  background: `url(${item})`,
                  backgroundSize: "contain",
                }}
              ></div>
            ))}
          </div>

          <div className={suggestion_details}>
            <header>
              <h4>Details</h4>
            </header>
            {dimensions && (
              <p>
                Size: {dimensions.height} x {dimensions.width} pixel
              </p>
            )}
            <p>Size: 15mb</p>
          </div>
        </section>
      </section>
    </article>
  );
};

export default ProductDetails;
