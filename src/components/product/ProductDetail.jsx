import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import SimilarProducts from "./SimilarProducts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductCart } from "../../store/slices/cart.slice";
import Swal from "sweetalert2";

const ProductDetail = ({ productId }) => {
  const [productData, setProductData] = useState();
  const [imageToShow, setImageToShow] = useState(0);
  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.userInfo);
  const navigate = useNavigate();
  const handleClickPlus = () => {
    setCounter(counter + 1);
  };
  const handleClickMinus = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handleClickAddToCart = () => {
    if (!token) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",

        text: "You must login to add product to cart!",
      }).then(() => {
        navigate("/login");
      });
    }

    dispatch(addProductCart({ productId: productData.id, quantity: counter }));
  };

  const nextImage = () => {
    if (imageToShow < 2) {
      setImageToShow(imageToShow + 1);
    } else {
      setImageToShow(0);
    }
  };

  const prevImage = () => {
    if (imageToShow > 0) {
      setImageToShow(imageToShow - 1);
    } else {
      setImageToShow(productData.images.length - 1);
    }
  };

  useEffect(() => {
    axiosEcommerce(`products/${productId}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  const stylePositionImages = {
    0: "-ml-[0%]",
    1: "-ml-[100%]",
    2: "-ml-[200%]",
  };

  return (
    <>
      <section className="flex gap-2 items-center mx-3">
        <Link to="/">Home</Link>
        <div className="h-[7px] aspect-square bg-red-500 rounded-full"></div>
        <span className="font-bold">{productData?.title}</span>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 mt-20 sm:mt-0 sm:items-center max-w-[1000px] mx-auto">
        <section className="overflow-hidden relative">
          <section
            className={`flex w-[300%] ${stylePositionImages[imageToShow]} duration-200 `}
          >
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-[full] object-contain"
                src={productData?.images[0].url}
                alt=""
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[1].url}
                alt=""
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[2].url}
                alt=""
              />
            </div>
          </section>
          <i
            onClick={nextImage}
            className="bx bxs-right-arrow absolute top-1/2 -translate-y-1/2 text-red-600 hover:text-red-400 right-2 cursor-pointer "
          ></i>
          <i
            onClick={prevImage}
            className="bx bxs-left-arrow absolute top-1/2 -translate-y-1/2 text-red-600 hover:text-red-400 left-2 cursor-pointer "
          ></i>
        </section>

        <section className=" mx-2">
          <h4 className="text-gray-400 font-fold mt-6">{productData?.brand}</h4>
          <h3 className="font-bold text-2xl text-gray-700 ml-2">
            {productData?.title}
          </h3>

          <section className="grid grid-cols-2  mt-6">
            <article>
              <h4 className="text-gray-400 font-bold">Price</h4>
              <span className="font-bold text-lg ml-2 text-gray-700">
                $ {productData?.price}
              </span>
            </article>
            <article>
              <h4 className="text-gray-400 font-bold">Quantity</h4>
              <div className="flex items-center">
                <button
                  onClick={handleClickMinus}
                  className="border-[1px] p-2 px-4 hover:bg-red-500 hover:text-white"
                >
                  -
                </button>
                <span className="border-[1px] p-2 px-4 border-x-0">
                  {counter}
                </span>
                <button
                  onClick={handleClickPlus}
                  className="border-[1px] p-2 px-4 hover:bg-red-500 hover:text-white"
                >
                  +
                </button>
              </div>
            </article>
          </section>

          <button
            onClick={handleClickAddToCart}
            className="w-full bg-red-500 py-2 text-white hover:bg-red-600 transition-colors rounded-sm mt-6 "
          >
            Add to cart <i className="bx bx-cart"></i>{" "}
          </button>
          <p className="lg:text-sm text-base my-6 text-gray-700">
            {productData?.description}
          </p>
        </section>
      </section>

      <SimilarProducts
        productId={productData?.id}
        categoryId={productData?.categoryId}
      />
    </>
  );
};

export default ProductDetail;
