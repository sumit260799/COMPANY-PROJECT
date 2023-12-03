import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Success = () => {
  const { commonId } = useSelector((state) => state.profile);

  return (
    <div className="bg-green-500 min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl text-green-600 font-bold mb-2">Success</h1>
        <p className="text-gray-700 text-lg">Your payment was successful!</p>
        <Link to={`/${commonId}/categories`}>
          <button className="bg-green-500 rounded-md p-2 text-white mt-3">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
