import { useEffect, useState } from "react";
import { BsBoxFill, BsPlusLg } from "react-icons/bs";
import { useCartContext } from "../../mnf_context/cartContext";
import { useUserContext } from "../../mnf_context/userContext";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

import axios from "axios"; // Import Axios for making HTTP requests
// import { UploadFile } from "@mui/icons-material";
const Url = import.meta.env.VITE_USERS_URL;
const baseUrl = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

const CollectionCreate = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // State to track selected products
  const [loading, setLoading] = useState(false);
  const { cart, fetchProducts } = useCartContext();
  const { tokenId } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const [collectionData, setCollectionData] = useState({
    collectionName: "",
    collectionImage: null,
    items: [],
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCollectionData((prevData) => ({
      ...prevData,
      collectionImage: file,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCollectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (index) => {
    const selectedProduct = cart[index];

    // Toggle selection
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.includes(selectedProduct);
      if (isSelected) {
        return prevSelected.filter((product) => product !== selectedProduct);
      } else {
        return [...prevSelected, selectedProduct];
      }
    });
  };

  // cloudinary.....
  const uploadFile = async (type, timestamp, signature) => {
    const folder = "userCollections";

    const data = new FormData();
    data.append("file", collectionData.collectionImage);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", API_KEY);
    data.append("folder", folder);

    try {
      let cloudName = CLOUD_NAME;
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`${baseUrl}api/upload/signature`, {
        folder,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { timestamp: imgTimestamp, signature: imgSignature } =
        await getSignatureForUpload("userCollections");
      const imgUrl = await uploadFile("image", imgTimestamp, imgSignature);
      await axios.post(`${Url}createcollection`, {
        commonId: tokenId,
        collectionName: collectionData.collectionName,
        collectionImage: imgUrl,
        items: selectedProducts,
      });
      await queryClient.invalidateQueries("collections");

      setLoading(false);
      navigate("/collections");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-[95vw] lg:max-w-[70vw] xl:max-w-[65vw] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Create a Collection</h1>

        {/* Collection Name Form */}
        <form
          onSubmit={handleSubmit}
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
              className="w-full py-2 px-3 border border-gray-300 rounded outline-none "
              onChange={handleInputChange}
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
              onChange={handleFileChange}
              className="w-full py-2 px-3 border border-gray-300 rounded outline-none "
            />
          </div>

          {/* Image Preview Section */}
          {collectionData.collectionImage && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Image Preview
              </label>
              <img
                src={URL.createObjectURL(collectionData.collectionImage)}
                alt="Image Preview"
                className="max-w-full max-h-[100px] h-auto rounded border border-gray-300"
              />
            </div>
          )}

          {/* Add Product Section */}
          <div className="mb-4">
            <h2 className="text-md sm:text-xl font-bold mb-2">Add Product</h2>
            <section className=" p-2 border border-gray-500 ">
              <div className="flex justify-between items-start">
                {" "}
                <p className="text-[1.4rem] font-sans ">Products</p>{" "}
                <button
                  onClick={() => setToggle(!toggle)}
                  type="button"
                  className=" flex justify-center items-center gap-1 text-gray-700 py-1 sm:py-2 px-1 sm:px-3  border border-gray-500"
                >
                  <BsPlusLg /> Add Product
                </button>
              </div>

              {toggle ? (
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
                  {cart.map((item, index) => (
                    <div
                      className="flex justify-center items-center border-b border-gray-300"
                      key={index}
                    >
                      <div className="w-1/12 p-2">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={() => handleCheckboxChange(index)}
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
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center my-[50px]">
                  <BsBoxFill className="text-[1.2rem] sm:text-[1.7rem] text-gray-700 " />
                  <p className="text-gray-600 text-center">no products added</p>
                </div>
              )}
            </section>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              {loading ? (
                <div className="flex w-full justify-center items-center">
                  <ThreeDots
                    height="20"
                    width="50"
                    radius="10"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              ) : (
                "Create Collection"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CollectionCreate;
