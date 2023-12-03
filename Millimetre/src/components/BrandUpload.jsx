import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import uploadIcon from "./../assets/upload-icon.png";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";
const Url = import.meta.env.VITE_BRAND_API_URL;
const baseUrl = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

const imgPostUrl = import.meta.env.VITE_IMAGE_POST_URL;
import toast, { Toaster } from "react-hot-toast";

function BrandUpload() {
  const [imageURL, setImageURL] = useState([]);

  const [loading, setLoading] = useState(false);

  const { brandId, setTokenId } = useBrandInfoContext();

  useEffect(() => {
    setTokenId();
  }, []);

  const ProductArr = [
    "Electronics",
    "Clothes",
    "Shoes",
    "Jewellery",
    "Home and Kitchen",
    "Beauty",
    "Personal Care",
    "Books",
    "Pet Supplies",
    "Sports and Outdoors",
    "Medicines",
  ];

  const [fields, setFields] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productCategory: "others",
    productDiscount: "",
    productImages: [],
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFields({ ...fields, productImages: files });
  };
  const uploadFile = async (image, timestamp, signature) => {
    const folder = "ProductImages";

    const data = new FormData();
    data.append("file", image);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", API_KEY);
    data.append("folder", folder);

    try {
      let cloudName = CLOUD_NAME;
      let resourceType = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
      throw error;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Map over the productImages array to upload each image
      const uploadedImageURLs = await Promise.all(
        fields.productImages.map(async (image) => {
          const { timestamp, signature } = await getSignatureForUpload(
            "ProductImages"
          );
          return uploadFile(image, timestamp, signature);
        })
      );

      const response = await axios.post(`${Url}brandproducts`, {
        ...fields,
        productImages: [...uploadedImageURLs],
        commonId: brandId,
      });

      toast.success("product uploaded successfully🚀");
      setLoading(false);

      setFields({
        productName: "",
        productPrice: "",
        productDesc: "",
        productCategory: "",
        productDiscount: "",
        productImages: "",
        stock: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.error, { duration: 1000 });
    }
  };

  return (
    <section>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "40px",
          },
        }}
      />
      <div className="mx-auto w-[95%] sm:w-[90%] md:w-[60%] my-16 md:my-10 border-3 border-black p-2 md:p-10 flex flex-col gap-y-2">
        <h3 className="text-3xl">Add Product</h3>
        <form action="" onSubmit={handleSubmit}>
          <p className="text-base">Images</p>
          <div className="max-w-md">
            <div className="flex items-center gap-2 space-x-2">
              <label
                htmlFor="productImages"
                className="cursor-pointer flex justify-around items-center gap-2"
              >
                <input
                  type="file"
                  id="productImages"
                  name="productImages"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  multiple
                />
                {fields.productImages.length > 0 ? (
                  fields.productImages.map((imageFile, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(imageFile)}
                      alt={`Image ${index + 1}`}
                      className="w-16 h-16 rounded-full"
                    />
                  ))
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <img src={uploadIcon} alt="Upload" className="w-12 h-12" />
                  </div>
                )}
              </label>
            </div>
          </div>
          <p className="text-base">Title</p>
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Product Name"
            type="text"
            name="productName"
            value={fields.productName}
            onChange={handleChange}
          />
          <p className="text-base">Description</p>
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Enter Description"
            type="text"
            name="productDesc"
            value={fields.productDesc}
            onChange={handleChange}
          />
          <p className="text-base">Price</p>
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Enter Price"
            type="number"
            name="productPrice"
            value={fields.productPrice}
            onChange={handleChange}
          />
          <p className="text-base">Categories</p>

          <select
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            name="productCategory"
            value={fields.productCategory}
            id=""
          >
            <option defaultValue="select">Select</option>
            {ProductArr.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p className="text-base">Discount</p>
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Enter Discount"
            type="number"
            name="productDiscount"
            value={fields.productDiscount}
            onChange={handleChange}
          />
          <p className="text-base">Stock</p>
          <input
            className="block appearance-none w-ful border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            name="stock"
            placeholder="enter stock value"
            value={fields.stock}
            onChange={handleChange}
          ></input>
          <div>
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 mt-3 mb-2"
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
                " Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BrandUpload;
