import { axiosEcommerce, getConfig } from "../../utils/configAxios";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  isShowCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeIsShowCart(state) {
      state.isShowCart = !state.isShowCart;
    },
    setProducts(state, action) {
      const newProducts = action.payload;
      state.products = newProducts;
    },
  },
});

export const { changeIsShowCart, setProducts } = cartSlice.actions;

export const getCartProducts = () => (dispatch) => {
  axiosEcommerce
    .get("cart", getConfig())
    .then((res) => {
      dispatch(setProducts(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addProductCart = (data) => (dispatch) => {
  axiosEcommerce
    .post("cart", data, getConfig())
    .then((res) => {
      dispatch(getCartProducts());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProductCart = (id) => (dispatch) => {
  axiosEcommerce
    .delete(`cart/${id}`, getConfig())
    .then((res) => {
      dispatch(getCartProducts());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const purchaseCart = () => (dispatch) => {
  axiosEcommerce
    .post("purchases", {}, getConfig())
    .then((res) => {
      dispatch(getCartProducts());
      dispatch(changeIsShowCart());
    })
    .catch((err) => {
      console.log(err);
    });
};

export default cartSlice.reducer;
