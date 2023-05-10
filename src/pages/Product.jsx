import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosEcommerce } from "../utils/configAxios";
import ProductDetail from "../components/product/ProductDetail";

const Product = () => {
  const { id } = useParams();

  return (
    <main className="px-2">
      <ProductDetail productId={id} />
    </main>
  );
};

export default Product;
