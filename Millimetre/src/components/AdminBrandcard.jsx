import React from "react";
import { Link } from "react-router-dom";
const imgUrl = import.meta.env.VITE_IMAGE_API_URL;

function AdminBrandsCard({ commonId, brandName, brandDesc, city, brandImage }) {
  return (
    <Link to={`/adminpannel/brandpage/${commonId}`}>
      <div className="flex items-center w-[92%] lg:w-[80%]  min-h-[250px] mx-auto flex-col md:flex-row my-8 md:my-16  bg-slate-100 hover:scale-105 duration-500 rounded-lg shadow-md overflow-hidden">
        <div className="w-full md:w-1/3">
          <img
            className="md:w-[200px] md:h-[200px] p-2  w-[150px] h-[150px]"
            src={`${imgUrl}${brandImage}`}
            alt="Brand Logo"
          />
        </div>
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            {brandName}
          </h2>
          <p className="text-gray-600 mb-4">{brandDesc}</p>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gray-200 text-gray-600">{city}</div>
            <div className="p-2 bg-gray-200 text-gray-600">
              0/253 products added
            </div>
            <div className="p-2 bg-gray-200 text-gray-600">
              0/253 products added
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AdminBrandsCard;
