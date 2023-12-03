import React from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { singleProduct } from "../features/dataSlice";
import { addToCart } from "../features/cartSlice";
import StoreFrontNav from "./StoreFrontNav";
import { BsCurrencyRupee } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

const StoreFrontWishlist = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user?.user);
  const { customerId } = userData || "";
  const url = import.meta.env.VITE_USERS_URL;
  const fetchData = async () => {
    const response = await fetch(`${url}wishlist/${customerId}`);
    const data = await response.json();
    return data;
  };
  const { data, status, isFetching } = useQuery("wishlist", fetchData);

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading<span className="dot">.</span>
        </div>
      </div>
    );
  }

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${url}wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }
      const updatedData = await fetchData();
      queryClient.setQueryData("wishlist", updatedData);
    } catch (error) {
      console.error("Error removing product from wishlist:", error.message);
    }
  };

  // ... (rest of the code)

  return (
    <>
      <StoreFrontNav />
      <section className="w-[90%] sm:w-[70%] mx-auto my-28">
        <h1 className=" capitalize flex justify-start items-center text-2xl lg:text-4xl font-medium text-gray-600 ">
          Wishlist
          <span className="text-green-500  text-2xl lg:text-3xl">
            ({data.length})
          </span>
        </h1>
        <main className=" grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          {data.map((item) => {
            const {
              _id,
              commonId,
              productId,
              companyName,
              productName,
              productDesc,
              productDiscount,
              productImages,
              stock,
              productPrice,
              productCategory,
            } = item;
            return (
              <section
                key={_id}
                onClick={() => dispatch(singleProduct(productId))}
                className={`relative  my-5  overflow-hidden transition-1`}
              >
                <div className="relative max-w-[300px]  m-2 overflow-hidden rounded-xl border border-slate-300">
                  <button
                    onClick={() => handleDelete(productId)}
                    className="z-20 absolute top-1 right-2 "
                  >
                    <AiFillDelete className="text-red-600 text-2xl" />
                  </button>
                  <div
                    className=" mx-3 mt-3 flex h-36 sm:h-44 lg:h-50 overflow-hidden rounded-xl"
                    href="#"
                  >
                    <img
                      className="absolute top-0 right-0 h-48 hover:scale-105 duration-300 object-cover bg-transparent w-full"
                      src={productImages[0]}
                      alt="product image"
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-lg bg-gray-100  px-3 text-center text-sm font-medium text-black">
                      {productDiscount}% OFF
                    </span>
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <Link to={`${productCategory}/${productId}`}>
                      <h5 className="text-sm lg:text-lg tracking-tight hover:text-gray-500 text-slate-700">
                        {productName.substr(0, 50)}...
                      </h5>
                    </Link>

                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p className="">
                        <span className="flex justify-start items-center gap-2 text-md sm:text-xl lg:text-2xl font-bold text-slate-600">
                          <BsCurrencyRupee />
                          <span>{productPrice}</span>
                          <span className="text-sm text-slate-800 line-through">
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
            );
          })}
        </main>
      </section>
    </>
  );
};

export default StoreFrontWishlist;
