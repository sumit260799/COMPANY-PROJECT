import React, { useEffect, useState } from "react";
import StoreFrontNav from "./StoreFrontNav";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../features/dataSlice";

import StoreFrontCard from "./StoreFrontCard";
const StoreFrontProductByProducts = () => {
  const dispatch = useDispatch();
  const commonId = useSelector((state) => state.profile.commonId);

  useEffect(() => {
    dispatch(fetchData(commonId));
  }, [commonId]);

  const { loading, searchData } = useSelector((state) => state.data);

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
    <>
      <StoreFrontNav />
      <section className="w-[90%] sm:w-[70%] mx-auto my-28">
        <h1 className=" capitalize flex justify-start items-center text-2xl lg:text-4xl font-medium text-gray-600 ">
          Total Products
          <span className="text-green-500  text-2xl lg:text-3xl">
            ({searchData.length})
          </span>
        </h1>
        <main className=" grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          {searchData.map((item) => {
            return <StoreFrontCard key={item._id} item={item} />;
          })}
        </main>
      </section>
    </>
  );
};

export default StoreFrontProductByProducts;
