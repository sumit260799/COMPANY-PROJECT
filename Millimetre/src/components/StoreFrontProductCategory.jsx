import React from "react";
import { uniqueCategory } from "../utils/uniqueValues";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByCategory } from "../features/dataSlice";
const electronicsImg = "";

const beautyImg = "";

const imgData = [
  {
    id: 1,
    type: "Electronics",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698995371/StoreFrontCategoryImages/t8pyvdhcg6iqys1ab0fo.jpg",
  },
  {
    id: 2,
    type: "Clothes",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698996547/StoreFrontCategoryImages/icmqnruaucjuxhd0cg01.jpg",
  },
  {
    id: 3,
    type: "Shoes",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698994791/StoreFrontCategoryImages/ncpqtlo57yslvstepjfy.jpg",
  },
  {
    id: 4,
    type: "Jewellery",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698994681/StoreFrontCategoryImages/moy7h5uaydvefxcoxq7q.jpg",
  },
  {
    id: 5,
    type: "Home and Kitchen",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698995587/StoreFrontCategoryImages/sagbjvdy5r1qczk8qt4f.jpg",
  },
  {
    id: 6,
    type: "Personal Care",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698994681/StoreFrontCategoryImages/mrhlgql9jrfjfpwhsswp.jpg",
  },
  {
    id: 7,
    type: "Beauty",
    imgUrl:
      "https://st3.depositphotos.com/6903990/12629/i/450/depositphotos_126292436-stock-photo-woman-with-clean-fresh-skin.jpg",
  },
  {
    id: 8,
    type: "Books",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698994965/StoreFrontCategoryImages/tdwpwxwdlv4ecudcdhdv.jpg",
  },
  {
    id: 9,
    type: "Pet Supplies",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698994964/StoreFrontCategoryImages/xti2hdoy8jtmgl4iikpn.jpg",
  },
  {
    id: 10,
    type: "Sports and Outdoors",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698996057/StoreFrontCategoryImages/t1sdggakvybjahpoouo3.jpg",
  },
  {
    id: 11,
    type: "Medicines",
    imgUrl:
      "https://res.cloudinary.com/djle7gupn/image/upload/v1698995396/StoreFrontCategoryImages/u0krhyn2czohalqeosvm.jpg",
  },
];

const imgUrl = import.meta.env.VITE_IMAGE_API_URL;

const StoreFrontProductCategory = ({ productsData }) => {
  const categories = uniqueCategory(productsData, "productCategory");

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.profile);

  return (
    <div
      // style={{ backgroundColor: userData?.storeBackgroundColor }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[95%] py-10 md:w-[80%] mx-auto gap-6"
    >
      {categories.map((item, index) => {
        return (
          <article
            key={index}
            className=" rounded-lg border border-slate-300 overflow-hidden transform  transition-transform duration-300"
          >
            <div className="relative">
              {imgData.map((img) => {
                return (
                  <div key={img.id}>
                    {item === img.type && (
                      <img
                        src={img.imgUrl}
                        alt=""
                        className="w-full h-[250px]"
                      />
                    )}
                  </div>
                );
              })}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Link to={`${item}`}>
                  <button
                    onClick={() => dispatch(filterByCategory(item))}
                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700  transition duration-300"
                  >
                    Explore..
                  </button>
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item}</h2>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default StoreFrontProductCategory;
