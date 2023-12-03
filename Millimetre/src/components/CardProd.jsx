import React from "react";
import { BsCurrencyRupee, BsPlus, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCartContext } from "../../mnf_context/cartContext";
function CardProd({
  _id,
  productName,
  productId,
  productDesc,
  productCategory,
  productDiscount,
  productPrice,
  stock,
  companyName,
  productImages,
  useCards,
}) {
  const { handleDeleteProduct } = useCartContext();

  let cardStylingClass = "";

  // Set the card styling class based on the useCards prop value
  if (useCards === "Cards with border") {
    cardStylingClass = " ring-1 ring-slate-800 bg-white";
  } else if (useCards === "Cards with shadow") {
    cardStylingClass = "shadow-1 hover:shadow-3";
  }

  return (
    <section
      className={`relative max-w-xs min-h-[450px]  my-5 bg-white overflow-hidden p-4 transition-1 ${cardStylingClass}`}
    >
      {productCategory && (
        <div className="absolute top-0 right-0 text-[1rem] text-white px-2 mb-5 font-thin bg-yellow-700">
          {productCategory}
        </div>
      )}
      <img
        className="h-48 w-full object-contain mx-auto"
        src={productImages[0]}
        alt="Product"
      />
      <div className="mt-4">
        <p className="text-[1rem] font-semibold capitalize text-slate-700">
          {productName.substr(0, 50)}...
        </p>
        <p className="text-sm font-normal text-gray-500 my-2">
          {productDesc.substr(0, 65)}...
        </p>

        <p className="text-lg flex items-center font-semibold text-yellow-600">
          <BsCurrencyRupee />
          {productPrice}
        </p>
        <p className="text-[0.9rem] py-2 font-bold text-gray-900">
          You will earn {productDiscount} discount per sale
        </p>
      </div>

      <button
        onClick={() => handleDeleteProduct(productId)}
        className="absolute bottom-0 right-0 left-0 p-2 mt-2 w-full text-red-500 bg-gray-100 hover:bg-red-100 border border-gray-300 flex items-center justify-center   transition-colors duration-300"
      >
        <BsTrash className="text-red-500 text-[1rem] mr-1" /> Delete Product
      </button>
    </section>
  );
}

export default CardProd;
