import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import ProductCard from "../home/ProductCard";
const SimilarProducts = ({ categoryId, productId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    if (categoryId) {
      axiosEcommerce(`products?categoryId=${categoryId}`)
        .then((response) => {
          setSimilarProducts(
            response.data.filter((product) => product.id !== productId)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryId, productId]);

  return (
    <section className="px-2 pb-4">
      <h2 className="text-red-500 font-bold text-lg mb-6">
        Discover similar items
      </h2>
      <section className="grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-6 gap-16 py-4">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default SimilarProducts;
