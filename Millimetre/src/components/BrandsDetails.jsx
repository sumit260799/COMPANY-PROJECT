import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import CardProd from "./CardProd";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardWithoutDelete from "./CardWithoutDelete";
const url = import.meta.env.VITE_BRAND_API_URL;

function BrandsDetails() {
  const { id } = useParams();
  const [brandProd, setBrandProd] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // console.log("brandprod", brandProd);
  const fetchData = async () => {
    setIsLoading(!isLoading);

    try {
      const response = await axios.get(`${url}brandproducts/${id}`);
      setBrandProd(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const firstProduct = brandProd[0];
  const { brandName, city, brandDesc, companyName } = firstProduct?.brand || {};

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
    <section className="container mx-auto sm:w-[80%]  my-16 px-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-semibold text-slate-600 tracking-[0.16rem]  mb-2">
            {brandName}
          </h1>
          <h2 className="text-lg text-gray-600">{city}</h2>
          <h4 className="text-gray-500 my-2">Company: {companyName}</h4>
          <p className="text-gray-800 font-medium tracking-[0.1rem] text-justify leading-relaxed">
            {brandDesc}
          </p>
        </div>
        <div className="md:w-1/2 mt-5">
          <div className="border border-gray-300 p-3 rounded-md">
            <p className="text-xs text-gray-600">0/253 products added</p>
          </div>
        </div>
        <FilterButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4 mt-10">
        {brandProd.map((product) => (
          <CardWithoutDelete
            key={product._id}
            companyName={companyName}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}

export default BrandsDetails;
