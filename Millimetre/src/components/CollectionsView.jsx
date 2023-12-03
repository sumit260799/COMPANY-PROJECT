import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsBoxFill, BsPlusLg } from "react-icons/bs";
import { useQuery } from "react-query";

// import { useQuery } from "react-query";
import axios from "axios";
const baseUrl = import.meta.env.VITE_USERS_URL;

const CollectionsView = () => {
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(["collection", id], fetchData, {
    enabled: !!id,
  });

  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}collection/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch collection data");
    }
  }
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
    <section className="bg-gray-100 py-16">
      <div className="max-w-[95vw] lg:max-w-[70vw] xl:max-w-[65vw]: mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">View Collection</h1>

        {/* Collection Name Form */}
        <form
          //   onSubmit={handleSubmit}
          className=" border border-gray-400 p-4 rounded-lg "
        >
          <div className="mb-4">
            <label
              htmlFor="collectionName"
              className="block text-gray-600 text-md font-medium mb-2"
            >
              Collection Name
            </label>
            <input
              type="text"
              id="collectionName"
              name="collectionName"
              placeholder="Enter collection name"
              value={data?.collectionName}
              className="w-full py-2 px-3 border border-gray-300 rounded outline-none "
              //   onChange={handleInputChange}
            />
          </div>

          {/* Collection Image Upload Section */}
          <div className="mb-4">
            <label
              htmlFor="collectionImage"
              className="block text-gray-600 text-md font-medium mb-2"
            >
              Collection Image
            </label>
            <input
              type="file"
              id="collectionImage"
              name="collectionImage"
              accept="image/*"
              //   onChange={handleFileChange}
              className="w-full py-2 px-3 border border-gray-300 rounded outline-none "
            />
          </div>

          {/* Image Preview Section */}
          {/* {collectionData.collectionImage && ( */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Image Preview
            </label>
            <img
              src={data?.collectionImage}
              alt="Image Preview"
              className="max-w-full max-h-[100px] h-auto rounded border border-gray-300"
            />
          </div>
          {/* )} */}

          {/* Add Product Section */}
          <div className="mb-4">
            <h2 className="text-md sm:text-xl font-bold mb-2">Add Product</h2>
            <section className=" p-2 border border-gray-500 ">
              <div className="flex justify-between items-start">
                {" "}
                <p className="text-[1.4rem] font-sans ">Products</p>{" "}
                <button
                  //   onClick={() => setToggle(!toggle)}
                  type="button"
                  className=" flex justify-center items-center gap-1 text-gray-700 py-1 sm:py-2 px-1 sm:px-3  border border-gray-500"
                >
                  <BsPlusLg /> Add Product
                </button>
              </div>

              <div className="mt-12">
                <div className="flex justify-center items-center font-bold border-b border-gray-500">
                  <div className="w-1/12 p-2">Select</div>
                  <div className="w-1/12 p-2">Id</div>
                  <div className="w-2/12 p-2">Image</div>
                  <div className="w-3/12 p-2">Title</div>
                  <div className="w-1/12 p-2">Price</div>
                  <div className="w-1/12 p-2">Category</div>
                  <div className="w-2/12 p-2">Company</div>
                  <div className="w-1/12 p-2">Discount</div>
                  <div className="w-1/12 p-2">Stocks</div>
                </div>
                {data &&
                  data?.items?.map((item, index) => {
                    return (
                      <div
                        className="flex justify-center items-center border-b border-gray-300"
                        key={index}
                      >
                        <div className="w-1/12 p-2">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            // onChange={() => handleCheckboxChange(index)}
                          />
                        </div>
                        <div className="w-1/12 p-2">{index + 1}</div>
                        <div className="w-2/12 p-0">
                          <img
                            className="h-20 w-24 border border-slate-200 p-2"
                            src={item.productImages[0]}
                            alt=""
                          />
                        </div>
                        <div className=" w-3/12 p-2">
                          {item.productName.substr(0, 42)}...
                        </div>
                        <div className="w-1/12 p-2">{item.productPrice}</div>
                        <div className="w-1/12 p-2">{item.productCategory}</div>
                        <div className="w-2/12 p-2">{item.companyName}</div>
                        <div className="w-1/12 p-1">{item.productDiscount}</div>
                        <div className="w-1/12 p-2">{item.stock}</div>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Save Collection
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CollectionsView;
