import React, { useEffect, useState } from "react";
import BrandsCard from "../components/BrandsCard";
import DiscoverBrandsNav from "../components/DiscoverBrandsNav";
import Footer1 from "../components/Footer1";
import axios from "axios";
const url = import.meta.env.VITE_BRAND_API_URL;
const BrandsPage = () => {
  const [brandInfo, setBrandInfo] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false);

  const fetchBrandInfo = async () => {
    setIsLoading(!isLoading);
    try {
      const response = await axios.get(`${url}brandinfo`);
      setBrandInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrandInfo();
  }, []);

  if (isLoading) {
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
      <DiscoverBrandsNav />
      {brandInfo.map((info) => {
        return <BrandsCard key={info._id} {...info} />;
      })}
      <Footer1 />
    </>
  );
};

export default BrandsPage;
