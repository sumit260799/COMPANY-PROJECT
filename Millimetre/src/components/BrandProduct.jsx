import React from "react";
import { Link } from "react-router-dom";

function BrandProduct() {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-2xl text-slate-600 md:text-5xl font-extrabold mb-6">
          Welcome to Millimetre
        </h1>
        <p className="text-lg md:text-xl mb-8 text-green-600">
          sell your stylish products with us.
        </p>
        <Link to="/addproduct">
          <button className="bg-green-500 hover:bg-green-900 text-white font-semibold py-3 px-6 rounded-full text-lg">
            Sell Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BrandProduct;
