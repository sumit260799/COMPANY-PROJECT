import React, { useEffect, useState } from "react";
import { BsEye, BsPencilSquare, BsSortUp, BsArrowDown } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineFileAdd } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import CardProd from "./CardProd";
import { useCartContext } from "../../mnf_context/cartContext";
import { useUserContext } from "../../mnf_context/userContext";
import { useProductsContext } from "../../mnf_context/productsContext";
import { Link } from "react-router-dom";
import { uniqueValuesCategory } from "../utils/uniqueValues";
import { uniqueValuesCompany } from "../utils/uniqueValues";
import { useQueries } from "react-query";

function MyShop() {
  const { loading, tokenId, userData, fetchUserData } = useUserContext();
  const {
    isLoading,
    cart,
    sortCart,
    fetchProducts,
    updateFilter,
    updateSort,
    sort,
    resetFilter,
    filters: { text, productCategory, companyName },
  } = useCartContext();

  const queries = useQueries([
    { queryKey: "fetchUserData", queryFn: fetchUserData },
    { queryKey: "fetchProducts", queryFn: fetchProducts },
  ]);

  // Extracting data, status, and isFetching for each query
  // const userDataQuery = queries[0];
  // const productsQuery = queries[1];

  // // Accessing data, status, and isFetching for each query
  // const userData = userDataQuery.data;
  // const userStatus = userDataQuery.status;
  // const userIsFetching = userDataQuery.isFetching;

  // const productsData = productsQuery.data;
  // const productsStatus = productsQuery.status;
  // const productsIsFetching = productsQuery.isFetching;

  // useEffect(() => {
  //   fetchProducts();
  // }, [tokenId]);

  const categories = uniqueValuesCategory(sortCart, "productCategory");
  const companies = uniqueValuesCompany(sortCart, "companyName");

  const {
    storeBackgroundColor,
    useCards,
    buttonColor,
    buttonShape,
    profilePicture,
    logo,
    shopTitle,
    shopDescription,
    heroImage,
  } = userData;

  // const heroUrl = `${imgUrl}${heroImage}`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading.<span className="dot">.</span>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading.<span className="dot">.</span>
        </div>
      </div>
    );
  }

  return (
    <section
      style={{ backgroundColor: storeBackgroundColor, minHeight: "100vh" }}
    >
      <div className="relative">
        {shopTitle && (
          <h5 className="hidden md:block text-slate-100 bg-gray-500 bottom-6 px-4 font-sans left-2 rounded-xl my-2 absolute text-[1.4rem] ">
            {shopTitle?.substr(0, 30)}...
          </h5>
        )}
        {shopDescription && (
          <p className=" hidden md:block text-[1rem] bottom-1 left-2 px-4 mt-16 absolute rounded-xl font-sans text-slate-100 bg-gray-500 ">
            {shopDescription?.substr(0, 130)}...
          </p>
        )}

        <img
          src={heroImage}
          alt="Background"
          className="h-[22rem] overflow-hidden w-full object-cover "
        />
        <div className="space-y-2 absolute top-[50%] left-[50%]">
          <button
            key="one"
            aria-label="View"
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              window.open(`/${tokenId}/categories`, "_blank");
            }}
          >
            <BsEye />
          </button>
          <Link to="/design">
            <button
              key="two"
              aria-label="Edit"
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <BsPencilSquare />
            </button>
          </Link>
        </div>
      </div>

      <div className="w-[90%] my-5 mx-auto">
        <div className="flex flex-wrap gap-x-5 mt-0 justify-start  items-center">
          <Link to="/allproducts" className="flex items-center gap-2">
            <button
              style={{ backgroundColor: buttonColor }}
              className={`px-4 flex ${
                buttonShape === "smooth"
                  ? "rounded-md"
                  : buttonShape === "smoothest"
                  ? "rounded-2xl"
                  : buttonShape === "pointy"
                  ? "rounded-none"
                  : ""
              } shadow-xl hover:shadow-none items-center gap-x-2 py-2 border-none  outline-none mb-3 text-slate-100 font-sans font-semibold`}
            >
              <AiOutlineFileAdd className="text-[1.2rem]" />
              Add Products
            </button>
          </Link>
          {cart.length > 0 && (
            <Link to="/collections">
              <button
                style={{ backgroundColor: buttonColor }}
                className={`px-4 flex ${
                  buttonShape === "smooth"
                    ? "rounded-md"
                    : buttonShape === "smoothest"
                    ? "rounded-2xl"
                    : buttonShape === "pointy"
                    ? "rounded-none"
                    : ""
                } shadow-xl hover:shadow-none  items-center gap-x-2 py-2 border-none outline-none mb-3 text-slate-100 font-sans font-semibold`}
              >
                <AiOutlineShoppingCart className="text-[1.2rem]" />
                Create Collections
              </button>
            </Link>
          )}

          {cart.length > 0 && (
            <button
              style={{ backgroundColor: buttonColor }}
              onClick={toggleFilter}
              className={`px-4 flex ${
                buttonShape === "smooth"
                  ? "rounded-md"
                  : buttonShape === "smoothest"
                  ? "rounded-2xl"
                  : buttonShape === "pointy"
                  ? "rounded-none"
                  : ""
              } shadow-xl hover:shadow-none items-center gap-x-2 py-2 border-none  outline-none mb-3 text-slate-100 font-sans font-semibold`}
            >
              <BsSortUp className="mr-2" />
              Filter
            </button>
          )}
        </div>
        {isFilterOpen && (
          <div className="flex flex-wrap gap-x-5 justify-start items-center mt-[1rem]">
            <input
              type="text"
              name="text"
              value={text}
              onChange={updateFilter}
              placeholder="Search products..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 md:mb-0"
            />
            {/* productCategory */}
            <select
              name="productCategory"
              value={productCategory}
              id=""
              onChange={updateFilter}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 md:mb-0"
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category} className="py-1">
                    {category}
                  </option>
                );
              })}
            </select>
            {/* companyName */}
            <select
              name="companyName"
              value={companyName}
              id=""
              onChange={updateFilter}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 md:mb-0"
            >
              {companies.map((company, index) => {
                return (
                  <option key={index} value={company} className="py-1">
                    {company}
                  </option>
                );
              })}
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={sort}
              name="sort"
              onChange={updateSort}
            >
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="name(a-z)">Name (A-Z)</option>
              <option value="name(z-a)">Name (Z-A)</option>
            </select>
            <button
              onClick={resetFilter}
              className="flex justify-center items-center bg-white p-2 rounded-md text-[1rem] bg-blue text-gray-700"
            >
              reset <GrPowerReset className="ml-1" />
            </button>
          </div>
        )}

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cart?.map((item) => (
              <CardProd key={item._id} useCards={useCards} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyShop;
