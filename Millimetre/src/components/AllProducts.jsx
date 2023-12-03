import { useState, useEffect } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { useCartContext } from "../../mnf_context/cartContext";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useUserContext } from "../../mnf_context/userContext";
import toast, { Toaster } from "react-hot-toast";
const url = import.meta.env.VITE_USER_API_URL;
const AllProducts = ({
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
}) => {
  const { cart, handleDeleteProduct } = useCartContext();

  const { tokenId } = useUserContext();
  const [exists, setExists] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    const checkProductStatus = async () => {
      try {
        const response = await axios.get(`${url}product/${productId}`);
        // If the product exists in the database, set data to true, otherwise set it to false
        setData(response.data.existsInDatabase);
      } catch (error) {
        console.error("Error checking product status:", error);
        // Handle the error as needed
      }
    };
    // checkProductStatus();
  }, [productId]);

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
        exists: true,
      });
      setData(true); // Change data state to true when product is added
      toast.success(response?.data?.message, { duration: 2000 });
    } catch (error) {
      toast.error(error?.response?.data?.message, { duration: 2000 });
    }
  };

  const handleRemoveProduct = () => {
    handleDeleteProduct(productId);
    setData(false); // Change data state to false when product is removed
  };

  return (
    <section className={`relative  my-5  overflow-hidden transition-1`}>
      <div className="relative max-w-[280px]  m-2 overflow-hidden rounded-xl border border-slate-300">
        <div
          className=" mx-3 mt-3 flex h-36 sm:h-44 lg:h-50 overflow-hidden rounded-xl"
          href="#"
        >
          <img
            className="absolute top-0 right-0 h-48 hover:scale-105 duration-300 object-fill bg-transparent w-full"
            src={productImages[0]}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-lg bg-gray-100  px-3 text-center text-sm font-medium text-black">
            {productDiscount}% OFF
          </span>
        </div>
        <div className="mt-4 px-5 pb-5">
          <Link to={`${productId}`}>
            <h5 className="text-sm lg:text-lg tracking-tight hover:text-gray-500 text-slate-700">
              {productName.substr(0, 50)}...
            </h5>
          </Link>

          <div className="mt-2 mb-5 flex items-center justify-between">
            <p className="">
              <span className="flex justify-start items-center gap-2 text-md sm:text-xl  font-bold text-slate-600">
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
            onClick={() => addProductToBackend()}
            className="flex items-center justify-center cursor-pointer gap-2 rounded-lg bg-transparent  py-2 text-center text-sm font-medium text-gray-700 border border-slate-300 hover:scale-105 duration-300 outline-none"
          >
            <BiCart className="text-[1.4rem] font-semibold" />
            <span>Add to cart</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
