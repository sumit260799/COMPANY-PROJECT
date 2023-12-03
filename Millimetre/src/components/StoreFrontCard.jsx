import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../features/cartSlice";
import StoreFrontNav from "./StoreFrontNav";
import { BiCart } from "react-icons/bi";
import { singleProduct } from "../features/dataSlice";
const url = import.meta.env.VITE_USERS_URL;
const StoreFrontCard = ({ item }) => {
  const {
    _id,
    commonId,
    productId,
    companyName,
    productName,
    productDesc,
    productDiscount,
    productCategory,
    productImages,
    stock,
    productPrice,
  } = item;
  // const value = useAuthContext();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user?.user);
  const { customerId } = userData || "";

  const fetchWishlistData = async () => {
    const response = await fetch(`${url}wishlist/${customerId}`);
    const data = response.json();
    return data;
  };

  const handleWishlist = async (value) => {
    try {
      await axios.post(`${url}wishlist`, { ...value, customerId });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const queryClient = useQueryClient();

  const wishlistMutation = useMutation((value) => handleWishlist(value), {
    onSuccess: () => {
      queryClient.invalidateQueries("wishlist");
    },
  });
  const { data, status, isFetching } = useQuery("wishlist", fetchWishlistData, {
    initialData: [],
  });

  const isProductInWishlist =
    data && data.some((wishlistItem) => wishlistItem.productId === productId);

  return (
    <>
      <StoreFrontNav />

      <section
        key={_id}
        onClick={() => dispatch(singleProduct(productId))}
        className={`relative  my-5  overflow-hidden transition-1`}
      >
        <div className="relative max-w-[280px]  m-2 overflow-hidden rounded-xl border border-slate-300">
          <button onClick={() => wishlistMutation.mutate(item)}>
            <Checkbox
              sx={{
                position: "absolute",
                top: 2,
                right: 4,
                zIndex: 20,
              }}
              {...label}
              icon={<FavoriteBorder style={{ color: "#dc2626" }} />}
              checkedIcon={<Favorite style={{ color: "#dc2626" }} />}
              // Conditionally render the checked icon based on the check result
              checked={isProductInWishlist}
            />
          </button>
          <div
            className=" mx-3 mt-3 flex h-36 sm:h-44  overflow-hidden rounded-xl"
            href="#"
          >
            <img
              className="absolute top-0 right-0 h-52 hover:scale-105 duration-300 object-fill bg-transparent w-full"
              src={productImages[0]}
              alt="product image"
            />
            <span className="absolute top-0 left-0 m-2 rounded-lg bg-gray-100  px-3 text-center text-sm font-medium text-black">
              {productDiscount}% OFF
            </span>
          </div>
          <div className="mt-4 px-5 pb-5">
            <Link to={`${productCategory}/${productId}`}>
              <h5 className="text-sm lg:text-[1rem] tracking-tight hover:text-gray-500 text-slate-700">
                {productName.substr(0, 50)}...
              </h5>
            </Link>

            <div className="mt-2 mb-3 flex items-center justify-start">
              <p className="">
                <span className="flex justify-start items-center gap-0 text-md sm:text-xl  font-bold text-gray-600">
                  <BiRupee />
                  <span>{productPrice}</span>
                  <span className="text-[0.9rem] ms-1 text-slate-700 line-through">
                    1200
                  </span>
                </span>
              </p>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  5.0
                </span>
              </div>
            </div>
            <div
              onClick={() => dispatch(addToCart(item))}
              className="flex items-center justify-center cursor-pointer gap-2 rounded-lg bg-transparent  py-2 text-center text-sm font-medium text-gray-700 border border-slate-300 hover:scale-105 duration-300 outline-none"
            >
              <BiCart className="text-[1.4rem] font-semibold" />
              <span>Add to cart</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoreFrontCard;
