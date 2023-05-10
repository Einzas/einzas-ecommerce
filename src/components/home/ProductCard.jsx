import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProductCart } from "../../store/slices/cart.slice";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userInfo);
  const navigate = useNavigate();
  const handleClickAddProduct = (e) => {
    e.preventDefault();
    if (!token) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must login to add product to cart!",
      }).then(() => {
        navigate("/login");
      });
    }
    dispatch(addProductCart({ productId: product.id, quantity: 1 }));
  };
  return (
    <Link
      to={`/products/${product.id}`}
      className="border-[1px] rounded-md border-gray-300"
    >
      <div className="p-4 borderb-[1px] relative border-gray-300 h-[200px] overflow-hidden group ">
        <img
          className="h-full w-full object-contain group-hover:opacity-0 transition-opacity duration-500"
          src={product.images[0].url}
          alt=""
        />

        <img
          className="h-full w-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity  duration-500  "
          src={product.images[1].url}
          alt=""
        />
      </div>
      <section className="p-4 relative">
        <h4 className="text-gray-400 font-bold text-xl">{product.brand}</h4>
        <h3 className="font-bold sm:text-sm ml-2">{product.title}</h3>
        <h4 className="text-gray-400 font-bold mt-4 text-xl">Price</h4>
        <span className="font-bold sm:text-sm ml-2">${product.price}</span>
        <button
          onClick={handleClickAddProduct}
          className="absolute bottom-4 bg-red-500 p-2 rounded-full w-[45px] hover:bg-red-600 transition-colors  aspect-square text-white text-xl  right-4"
        >
          <i className="bx bx-cart-alt"></i>
        </button>
      </section>
    </Link>
  );
};

export default ProductCard;
