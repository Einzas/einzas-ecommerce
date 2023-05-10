import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import PurchaseCard from "../components/purchases/PurchaseCard";
const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axiosEcommerce
      .get("/purchases", getConfig())
      .then((res) => {
        const orderPurchases = res.data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setPurchases(orderPurchases);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="px-2 max-w-[1000px] mx-auto ">
      <section className="flex gap-2 items-center mx-10">
        <Link to="/">Home</Link>
        <div className="h-[7px] aspect-square bg-red-500 rounded-full"></div>
        <span className="font-bold mx-10">Purchases</span>
      </section>
      <h1 className="text-2xl font-bold my-4 text-gray-700 mx-10">
        My Purchases
      </h1>
      <section className="grid gap-10 py-6  mx-16">
        {purchases.map((purchase) => (
          <PurchaseCard purchase={purchase} key={purchase.id} />
        ))}
      </section>
    </main>
  );
};

export default Purchases;
