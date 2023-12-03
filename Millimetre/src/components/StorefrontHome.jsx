import React from "react";
import StoreFrontBody from "./StoreFrontBody";
import StoreFrontAllProduct from "./StoreFrontProductCategory";
import StoreFrontNav from "./StoreFrontNav";
import StoreFrontProductsNav from "./StoreFrontProductsNav";

const StorefrontHome = ({ userData }) => {
  return (
    <>
      <StoreFrontNav />
      <StoreFrontBody userData={userData} />
      <StoreFrontProductsNav userData={userData} />
    </>
  );
};

export default StorefrontHome;
