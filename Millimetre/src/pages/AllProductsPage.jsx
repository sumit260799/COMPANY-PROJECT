import React, { useState } from "react";
import AllProducts from "../components/AllProducts";
import DiscoverBrandsNav from "../components/DiscoverBrandsNav";
import LoadSkeleton from "../components/Skeleton";
import { BsFilterSquare } from "react-icons/bs";
import { uniqueValuesCategory } from "../utils/uniqueValues";
import { uniqueValuesCompany } from "../utils/uniqueValues";
import { useProductsContext } from "../../mnf_context/productsContext";

const AllProductsPage = () => {
  const {
    isLoading,
    isError,
    allProducts,
    mainProducts,
    updateSort,
    updateFilter,
    sort,
    filters: { text, productCategory, companyName },
  } = useProductsContext();

  const categories = uniqueValuesCategory(mainProducts, "productCategory");
  const companies = uniqueValuesCompany(mainProducts, "companyName");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (isError) {
    return (
      <div className="text-[2rem] flex justify-center items-center h-screen capitalize font-semibold text-red-600">
        Products not found, some errors occurred...
      </div>
    );
  }

  return (
    <>
      <DiscoverBrandsNav />
      <section className="w-[95%] md:w-[80%] mx-auto mt-12">
        <div className="flex justify-between items-center my-5">
          <div className="text-2xl text-zinc-600 font-medium tracking-widest mb-6">
            All Products
            <p className="text-[1rem] text-green-600">
              {allProducts.length} products found.
            </p>
          </div>
          <button
            onClick={toggleFilter}
            className="px-4 flex bg-white shadow-3 focus:shadow-3 items-center gap-x-2 py-2 border rounded-lg focus:outline-none  mb-4"
          >
            <BsFilterSquare /> Filters
          </button>
        </div>
        {isFilterOpen && (
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <input
              type="text"
              name="text"
              value={text}
              onChange={updateFilter}
              placeholder="Search products..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 md:mb-0"
            />
            {/* productCategory */}
            <select
              name="productCategory"
              value={productCategory}
              id=""
              onChange={updateFilter}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 md:mb-0"
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category} className="py-1">
                    {category}
                  </option>
                );
              })}
            </select>
            {/* companyName */}
            <select
              name="companyName"
              value={companyName}
              id=""
              onChange={updateFilter}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 md:mb-0"
            >
              {companies.map((company, index) => {
                return (
                  <option key={index} value={company} className="py-1">
                    {company}
                  </option>
                );
              })}
            </select>
            {/* productsSort */}
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={sort}
              name="sort"
              onChange={updateSort}
            >
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="name(a-z)">Name (a-z)</option>
              <option value="name(z-a)">Name (z-a)</option>
            </select>
          </div>
        )}
        <div className="grid w-full justify-between items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
          {isLoading ? (
            <>
              <LoadSkeleton />
              <LoadSkeleton />
              <LoadSkeleton />
              <LoadSkeleton />
            </>
          ) : (
            allProducts.map((item) => <AllProducts key={item._id} {...item} />)
          )}
        </div>
      </section>
    </>
  );
};

export default AllProductsPage;
