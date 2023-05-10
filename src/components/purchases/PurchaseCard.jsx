import React from "react";
import { formatDateDDMMYYYY } from "../../utils/date";

const PurchaseCard = ({ purchase }) => {
  return (
    <article className="grid grid-cols-2 items-center gap-2 text-sm sm:text-base">
      <section className="flex gap-2 items-center">
        <div className="h-[50px] sm:h-[80px] aspect-square">
          <img
            className="h-full w-full object-contain"
            loading="lazy"
            src={purchase.product.images[2].url}
            alt=""
          />
        </div>
        <h4>{purchase.product.title}</h4>
      </section>
      <section className="grid text-center  gap-3 sm:grid-cols-3">
        <span className="text-gray-400">
          {formatDateDDMMYYYY(purchase.createdAt)}
        </span>
        <div>
          <span className="py-1 border-[1px] px-8 border-gray-400">
            {purchase.quantity}
          </span>
        </div>
        <h4>{(purchase.quantity * purchase.product.price).toFixed(1)}</h4>
      </section>
    </article>
  );
};

export default PurchaseCard;
