import React from "react";
import { BsCurrencyRupee, BsPlus, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCartContext } from "../../mnf_context/cartContext";
import { useUserContext } from "../../mnf_context/userContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const url = import.meta.env.VITE_USER_API_URL;

function CardWithoutDelete({
  companyName,
  brandName,
  brandDesc,
  productId,
  productName,
  productPrice,
  productDesc,
  productDiscount,
  productCategory,
  stock,
  productImages,
  createdAt,
  useCards,
}) {
  let cardStylingClass = "";
  const { tokenId } = useUserContext();

  const addProductToBackend = async () => {
    try {
      const response = await axios.post(`${url}products`, {
        commonId: tokenId,
        productId,
        companyName,
        brandName,
        brandDesc,
        productName,
        productPrice,
        productDesc,
        productDiscount,
        productCategory,
        stock,
        productImages,
        createdAt,
      });
      toast.success(response?.data?.message, { duration: 2000 });
    } catch (error) {
      console.error("Error adding product to backend:", error);
      // toast.error(error, { duration: 1000 });
    }
  };
  // Set the card styling class based on the useCards prop value
  if (useCards === "Cards with border") {
    cardStylingClass = " ring-1 ring-slate-800 bg-white";
  } else if (useCards === "Cards with shadow") {
    cardStylingClass = "shadow-1 hover:shadow-3";
  }

  return (
    <section
      className={`relative max-w-xs max-h-[550px] my-5 bg-white overflow-hidden p-4 transition-1 ${cardStylingClass}`}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "40px",
          },
        }}
      />
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
          {productDesc.substr(0, 70)}...
        </p>

        <p className="text-lg flex items-center font-semibold text-yellow-600">
          <BsCurrencyRupee />
          {productPrice}
        </p>
        <p className="text-[0.9rem] text-gray-600">
          You will earn {productDiscount} % discount per sale
        </p>
      </div>
      <button
        onClick={addProductToBackend}
        className="mt-4 w-full text-[#22d3ee] bg-gray-100 hover:bg-gray-200 border border-gray-300 flex items-center justify-center py-1 rounded-lg  transition-colors duration-300"
      >
        <BsPlus className="text-[#22d3ee] text-[1.8rem] mr-1" /> Add Product
      </button>
    </section>
  );
}

export default CardWithoutDelete;
