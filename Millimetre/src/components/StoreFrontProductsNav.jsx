import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const StoreFrontProductsNav = () => {
  const { id } = useParams();

  return (
    <nav className="font-medium  text-slate-500 border-b-2 border-gray-300 w-[90%] md:max-w-[80vw] mt-5 mx-auto p-4">
      <ul className="flex justify-center items-center space-x-6">
        <li>
          <Link to={`/${id}/categories`} className="hover:text-gray-900">
            categories
          </Link>
        </li>
        <li>
          <Link to={`/${id}/collections`} className="hover:text-gray-900">
            collections
          </Link>
        </li>
        <li>
          <Link to={`/${id}/products`} className="hover:text-gray-900">
            products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default StoreFrontProductsNav;
