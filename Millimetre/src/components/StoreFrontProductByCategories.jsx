import React, { useEffect } from "react";
import StoreFrontNav from "./StoreFrontNav";
import { useSelector, useDispatch } from "react-redux";
import { BsCurrencyRupee, BsTrash } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

import { Link } from "react-router-dom";
import { singleProduct } from "../features/dataSlice";
import { addToCart } from "../features/cartSlice";
import { fetchData } from "../features/dataSlice";
import StoreFrontCard from "./StoreFrontCard";
const StoreFrontProductByCategories = () => {
  const dispatch = useDispatch();
  const { filterData } = useSelector((state) => {
    return state.data;
  });

  const commonId = useSelector((state) => state.profile?.commonId);

  useEffect(() => {
    dispatch(fetchData(commonId));
  }, [commonId]);

  return (
    <>
      <StoreFrontNav />
      <main className="w-[90%] sm:w-[70%] mx-auto my-28">
        <h1 className="mb-4 capitalize flex justify-start items-center text-2xl lg:text-4xl font-medium text-gray-600 ">
          {filterData[0]?.productCategory}
          <span className="text-green-500  text-2xl lg:text-3xl">
            ({filterData.length})
          </span>
        </h1>

        <div className=" grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between items-center">
          {filterData.map((item) => {
            return <StoreFrontCard key={item._id} item={item} />;
          })}
        </div>
      </main>
    </>
  );
};

export default StoreFrontProductByCategories;
