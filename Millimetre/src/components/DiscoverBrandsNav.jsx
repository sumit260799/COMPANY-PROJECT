import React from "react";
import { Link } from "react-router-dom";

const DiscoverBrandsNav = () => {
  const currentPath = window.location.pathname;

  return (
    <nav className="p-4 mt-8 lg:mt-12">
      <div className="flex items-center justify-center">
        <div className="flex flex-row items-center w-auto">
          <div className="text-sm flex items-center flex-grow">
            <Link
              to="/"
              className={`block mt-4 lg:mt-0 text-black focus:underline-none mr-4 ${
                currentPath === "/myshop" ? "bg-black text-white" : ""
              }`}
            >
              My Shop
            </Link>
            <Link
              to="/brands"
              className={`block mt-4 lg:mt-0 text-black focus:underline-none mr-4 ${
                currentPath === "/brands" ? "bg-black p-2 text-white" : ""
              }`}
            >
              Brands
            </Link>
            <Link
              to="/allproducts"
              className={`block mt-4 lg:mt-0 text-black focus:underline-none ${
                currentPath === "/allproducts" ? "bg-black p-2 text-white" : ""
              }`}
            >
              Products
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-2 border-gray-400" />
    </nav>
  );
};

export default DiscoverBrandsNav;
