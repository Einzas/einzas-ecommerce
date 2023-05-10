import React from "react";
import { useDispatch } from "react-redux";
import { deleteProductCart } from "../../store/slices/cart.slice";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    dispatch(deleteProductCart(product.id));
  };
  return (
    <article>
      <section className="grid grid-cols-[auto_1fr_auto] gap-1">
        <div className="h-[90px] aspect-square row-span-2 p-2">
          <img
            className="h-full w-full object-contain"
            src={product.product.images[2].url}
            alt={product.name}
          />
        </div>
        <h4>{product.product.title}</h4>
        <i
          onClick={() => handleClickDelete(product.id)}
          className="bx bxs-trash text-red-500 cursor-pointer"
        ></i>
        <div className="flex items-center">
          <button className="border-[1px] p-2 px-2 hover:bg-red-500 hover:text-white">
            -
          </button>
          <span className="border-[1px] p-2 px-4 border-x-0">
            {product.quantity}
          </span>
          <button className="border-[1px] p-2 px-2 hover:bg-red-500 hover:text-white">
            +
          </button>
        </div>
      </section>
      <h4 className="mt-2 text-end">
        Total:{" "}
        <span className="font-bold">
          {(product.quantity * product.product.price).toFixed(1)}
        </span>{" "}
      </h4>
    </article>
  );
};

export default CartProduct;
