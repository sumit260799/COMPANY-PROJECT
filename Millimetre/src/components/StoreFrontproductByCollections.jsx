import React, { useEffect } from "react";
import StoreFrontNav from "./StoreFrontNav";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
const Url = import.meta.env.VITE_USERS_URL;
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCommonId } from "../features/profileSlice";
import { GiCrossMark } from "react-icons/gi";
const StoreFrontproductByCollections = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const parts = pathname.split("/");
  const secondPart = parts[1];

  useEffect(() => {
    if (secondPart) {
      dispatch(setCommonId(secondPart));
    }
  }, [dispatch, secondPart]);

  const fetchData = async () => {
    const response = await fetch(
      `${Url}collections/${secondPart && secondPart}`
    );
    const data = response.json();
    return data;
  };
  const { data, status, isFetching } = useQuery("collections", fetchData);
  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading<span className="dot">.</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <StoreFrontNav />
      <section className="container mx-auto mt-20 w-full  sm:w-[80%]">
        <div className=" bg-gray-50 rounded-lg  p-6 min-h-[250px] ">
          <div className="container mx-auto">
            <div className="flex justify-between">
              <h1 className="mb-4 capitalize flex justify-start items-center text-2xl lg:text-4xl font-medium text-gray-600 ">
                My Collections
                <span className="text-green-500  text-2xl lg:text-3xl">
                  ({data.length})
                </span>
              </h1>
              <div className="flex  gap-2"></div>
            </div>
            {data.length > 0 ? (
              <div className=" flex justify-start items-center w-full flex-wrap gap-6 my-5">
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="relative w-[160px] shadow-xl  rounded-t-md    "
                  >
                    <img
                      className="h-36 w-full rounded-t-md  object-cover mb-2 "
                      src={item.collectionImage}
                      alt=""
                    />
                    <div className="text-gray-800 flex flex-col justify-center w-full ">
                      <h2 className="text-md font-medium  px-2 mb-1 text-center capitalize">
                        {item.collectionName}
                      </h2>
                      {/* Add more details or description here if needed */}
                      <button className="bg-gray-700 text-white py-2 px-2 text-sm rounded-b-md duration-300">
                        View Collection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-[2rem] w-full">
                <p className="text-sm sm:text-lg text-center">
                  No Collections Added
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default StoreFrontproductByCollections;
