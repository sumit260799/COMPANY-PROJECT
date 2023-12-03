import React, { useState } from "react";
import { AiOutlineHeart, AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import StoreFrontNav from "./StoreFrontNav";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
function StoreFrontProductDetails() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.data?.singleProduct);

  return (
    <>
      <StoreFrontNav />
      {product.map((item) => {
        const {
          _id,
          brandName,
          brandDesc,
          commonId,
          companyName,
          productCategory,
          productDesc,
          productDiscount,
          productId,
          productImages,
          productName,
          productPrice,
          stock,
        } = item;
        const [main, setMain] = useState(productImages[0]);

        return (
          <section
            key={_id}
            className="w-[90%] sm:w-[75%] my-20 sm:my-24 mx-auto"
          >
            <div className="container mx-auto mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article>
                  <div>
                    <img
                      src={main}
                      alt=""
                      className="w-full  h-[40vh] lg:h-[65vh]  rounded-lg"
                    />
                  </div>
                  <div className="gallery flex justify-start items-center flex-wrap gap-2 lg:gap-4 my-3 ">
                    {productImages.length > 1 &&
                      productImages.map((image, index) => {
                        return (
                          <img
                            src={image}
                            alt=""
                            key={index}
                            className={`w-14 h-14 lg:w-20 lg:h-20 bg-white rounded-md shadow-md cursor-pointer ${
                              image.url === main.url ? "active" : null
                            }`}
                            onClick={() => setMain(productImages[index])}
                          />
                        );
                      })}
                  </div>
                </article>
                <div>
                  <h1 className="text-lg lg:text-2xl font-semibold mb-2">
                    {" "}
                    {productName.length < 80 ? (
                      <p>{productName}</p>
                    ) : (
                      <p>{productName.substr(0, 80)}...</p>
                    )}
                  </h1>
                  <div className="text-sm lg:text-md mb-4 text-gray-600">
                    {productDesc.length < 100 ? (
                      <p>{productDesc}</p>
                    ) : (
                      <p>{productDesc.substr(0, 100)}...</p>
                    )}
                  </div>
                  <div className="my-2 lg:my-4">
                    <div className="flex items-center space-x-1 lg:space-x-4">
                      <div className="flex flex-col ">
                        <p className="text-md lg:text-lg font-semibold text-gray-600">
                          Price
                        </p>
                        <p className="text-lg lg:text-2xl text-amber-600 font-medium">
                          ₹{productPrice}
                          {productDiscount && (
                            <span className="text-green-500"> (10% OFF)</span>
                          )}
                        </p>
                        <p className="text-md lg:text-lg mt-2 font-medium">
                          {stock} in stock
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 lg:gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Brand
                      </p>
                      <p className="text-md lg:text-lg font-medium">
                        {brandName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Company
                      </p>
                      <p className="text-md lg:text-lg font-medium">
                        {companyName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 lg:mt-6">
                    <h2 className="text-md lg:text-xl">Specifications</h2>
                    <ul className="text-sm lg:text-[1rem] text-slate-600 text-justify">
                      <li>Country of Origin: India</li>
                      <li>Color Family: {productCategory}</li>
                      <li>Formulation: {brandDesc}</li>
                      <li>
                        Features: Smudge-proof, Transfer-proof, Water-resistant
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4 mt-6 ">
                    <button className="hover:text-red-500 transition-colors">
                      <AiOutlineHeart size={24} />
                    </button>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default StoreFrontProductDetails;
