import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { axiosEcommerce } from "../utils/configAxios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [currentCategory, setCurrentCategory] = useState(0);
  const [categoryDropdown, setCategoryDropdown] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductName = e.target.productName.value;
    setProductName(newProductName);
  };

  const handleCategoryDropdown = () => {
    setCategoryDropdown(!categoryDropdown);
  };

  const handleClickCategory = (e) => {
    const categoryId = e.target.dataset.category;
    setCurrentCategory(Number(categoryId));
  };

  const productsByName = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(productName.toLowerCase())
    );
  }, [productName, products]);

  useEffect(() => {
    axiosEcommerce
      .get("categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (currentCategory === 0) {
      axiosEcommerce
        .get("products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentCategory]);
  useEffect(() => {
    if (currentCategory) {
      axiosEcommerce
        .get(`products?categoryId=${currentCategory}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentCategory]);

  return (
    <main className="px-2 relative place-content-center grid lg:grid-cols-[auto_1fr]">
      <section className="">
        <button
          className="cursor-pointer  mx-auto sm border-b-[3px] w-full gap-3 items-center mt-5 justify-between ml-4 flex p-2 rounded"
          onClick={handleCategoryDropdown}
        >
          <span className="font-bold text-gray-700 text-[18px]">Category</span>
          {categoryDropdown ? (
            <i className="bx bxs-up-arrow"></i>
          ) : (
            <i className="bx bxs-down-arrow"></i>
          )}
        </button>
        {categoryDropdown && (
          <ul className="bg-white shadow rounded p-2 pt-2">
            <li
              className="cursor-pointer ml-6 text-gray-600 pt-2 mt-2"
              onClick={handleClickCategory}
              data-category={0}
            >
              All
            </li>
            {categories.map((category) => {
              return (
                <li
                  className="cursor-pointer ml-6 text-gray-600 pt-2"
                  onClick={handleClickCategory}
                  data-category={category.id}
                  key={category.id}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <section className="grid grid-cols-1 md:max-w-[650px] md:mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8 py-6 mx-5">
        <form className="md:col-span-2 lg:col-span-3" onSubmit={handleSubmit}>
          <div className=" flex ">
            <input
              id="productName"
              placeholder="What are you looking for?"
              type="text"
              className="border-[1px] px-3 py-2 outline-none w-full"
            />
            <button className="bg-[#f85555] border-[#f85555] border-[1px] px-3 py-2 text-white ">
              <i className="bx bx-search"></i>
            </button>
          </div>
        </form>
        {productsByName.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </main>
  );
};

export default Home;
