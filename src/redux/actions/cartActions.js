import * as actionTypes from "../constants/cartConstants";

export const addToCart = (payload, id) => async (dispatch, getState) => {
  try {
    const dataToData = payload.filter((v) => v._id === id)[0];

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        id: dataToData._id,
        imageUrl: dataToData.imageUrl,
        name: dataToData.name,
        price: dataToData.price,
      },
    });

    //   set items to cart in local storage
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    // toast error
    console.error("Error");
  }
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

    // reset items to cart in local storage
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.CLEAR_CART,
    payload: [],
  });

  //   set [] to cart in local storage
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
