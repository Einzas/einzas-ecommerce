import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeIsShowCart } from "../../store/slices/cart.slice";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userInfo);
  const { isShowCart } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const handleClickChangeShowCart = () => {
    if (!token) return navigate("/login");
    dispatch(changeIsShowCart());
  };
  const [productsCount, setProductsCount] = useState(0);

  const { products } = useSelector((store) => store.cart);

  useEffect(() => {
    let count = 0;
    products.forEach((product) => {
      count += product.quantity;
    });
    setProductsCount(count);
  }, [products]);

  return (
    <section className=" sm:px-6 flex  lg:border-[1px] lg:border-gray-300 items-center justify-between text-2xl py-4">
      <Link to={"/"}>
        <h1 className="text-red-500 font-bold mx-5 lg:mx-0 lg:text-3xl  ">
          e-commerce
        </h1>
      </Link>
      <nav className="flex gap-x-[17.5%]  justify-end flex-1 px-6   text-gray-400 sm:mx-10">
        <Link className="" to={"/login"}>
          <i className="bx bx-user "></i>
        </Link>
        <Link className="" to={"/purchases"}>
          <i className="bx bx-box"></i>
        </Link>
        <button className="relative" onClick={handleClickChangeShowCart}>
          <i className={`bx bx-cart  ${isShowCart ? "text-red-500" : ""}`}></i>
          {productsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] rounded-full w-[20px] h-[20px] flex items-center justify-center">
              {productsCount}
            </span>
          )}
        </button>
      </nav>
    </section>
  );
};

export default Header;
