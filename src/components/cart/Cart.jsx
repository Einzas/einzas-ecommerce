import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShowCart,
  getCartProducts,
  purchaseCart,
} from "../../store/slices/cart.slice";
import CartProduct from "./CartProduct";
import Swal from "sweetalert2";

const Cart = () => {
  const { isShowCart, products } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();

  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );

  const handleClickCheckout = () => {
    dispatch(purchaseCart());
    Swal.fire({
      icon: "success",
      title: "Purchase completed",
      text: "Your purchase has been completed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClickChangeShowCart = () => {
    dispatch(changeIsShowCart());
  };

  useEffect(() => {
    if (isShowCart) {
      dispatch(getCartProducts());
    }
  }, [isShowCart]);

  return (
    <section
      className={`fixed top-0 sm:top-[60px] h-screen  sm:min-h-[calc(100vh_-_60px)] w-[300px] shadow-xl bg-white ${
        isShowCart && token ? "right-0" : "-right-full"
      } duration-200 p-3 grid grid-rows-[auto_1fr_auto]`}
    >
      <h2 className="text-lg font-bold">Shopping Cart</h2>
      <i
        onClick={handleClickChangeShowCart}
        className="bx bx-x absolute top-2 right-3 text-2xl hover:text-red-500 cursor-pointer"
      ></i>

      <section className="overflow-y-auto grid gap-10 py-4 content-start">
        {products.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
      </section>

      <section className="grid grid-cols-2 py-16 birder-t-[1px] border-gray-400">
        <span>Total</span>
        <h4>${totalPrice}</h4>
        <button
          onClick={handleClickCheckout}
          className="w-full col-span-2 bg-red-500 py-2 text-white hover:bg-red-600  transition-colors rounded-sm mt-6"
        >
          Checkout
        </button>
      </section>
    </section>
  );
};

export default Cart;
