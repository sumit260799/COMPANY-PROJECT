import React, { useEffect } from "react";
import StorefrontHome from "./StorefrontHome";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, setCommonId } from "../features/profileSlice";
import { fetchData } from "../features/dataSlice";
import StoreFrontProductCategory from "./StoreFrontProductCategory";
import StoreFrontFooter from "./StoreFrontFooter";

const StoreFrontProducts = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.profile);
  const productsData = useSelector((state) => state?.data?.productsData);

  // Extract the `secondPart` from the URL pathname
  const pathname = window.location.pathname;
  const parts = pathname.split("/");
  const secondPart = parts[1];

  // Use the `secondPart` to fetch user data
  useEffect(() => {
    if (secondPart) {
      dispatch(fetchUserData(secondPart));
      dispatch(fetchData(secondPart));
      dispatch(setCommonId(secondPart));
    }
  }, [dispatch, secondPart]);

  if (loading) {
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
      <StorefrontHome userData={userData} />
      {productsData && (
        <StoreFrontProductCategory productsData={productsData} />
      )}
      <StoreFrontFooter />
    </>
  );
};

export default StoreFrontProducts;
