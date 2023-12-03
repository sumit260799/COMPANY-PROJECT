import React, { useState, useEffect } from "react";
import { useCartContext } from "../../mnf_context/cartContext";
import { Link } from "react-router-dom";
import StoreFrontImageList from "./StoreFrontImageList";

export default function StoreFrontTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { cart, fetchProducts } = useCartContext();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section>
      <div className="flex justify-center items-center space-x-4 py-4">
        <button
          onClick={() => handleChange(0)}
          className={`${
            value === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          } px-4 py-2 rounded-lg transition-all duration-300`}
        >
          Collections
        </button>
        <button
          onClick={() => handleChange(1)}
          className={`${
            value === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          } px-4 py-2 rounded-lg transition-all duration-300`}
        >
          Spotlight
        </button>
        <button
          onClick={() => handleChange(2)}
          className={`${
            value === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          } px-4 py-2 rounded-lg transition-all duration-300`}
        >
          Pebbles
        </button>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <Link to="/storefrontallproduct">
                <StoreFrontImageList />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
