import { useEffect, useState } from "react";
import axios from "axios";
import uploadIcon from "./../assets/upload-icon.png";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Url = import.meta.env.VITE_BRAND_API_URL;
const imgPostUrl = import.meta.env.VITE_IMAGE_POST_URL;

function BrandProductsUpdate() {
  const { id } = useParams();

  const [imageURL, setImageURL] = useState("");
  const { brandId } = useBrandInfoContext();

  const [fields, setFields] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productCategory: "",
    productDiscount: "",
    productImages: "",
    stock: "",
    brand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageURL) {
      const productImg = new FormData();
      const filename = Date.now() + imageURL.name;
      productImg.append("name", filename);
      productImg.append("image", imageURL);
      fields.productImages = filename;
      try {
        await axios.post(`${imgPostUrl}`, productImg);
        setImageURL(null);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const response = await axios.put(`${Url}brandproduct/${id}`, {
        ...fields,
        commonId: brandId,
      });
      toast.success(response?.data?.message, { duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${Url}brandproduct/${id}`);
      setFields(response.data.product);
    } catch (err) {
      console.err(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [id]);

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
            <div className="flex items-center space-x-2">
              <label htmlFor="productImages" className="cursor-pointer">
                <input
                  type="file"
                  id="productImages"
                  name="productImages"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageURL(e.target.files[0])}
                />
                {imageURL ? (
                  <img
                    src={URL.createObjectURL(imageURL)}
                    alt="Logo Preview"
                    className="w-24 h-24 rounded-full"
                  />
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
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Enter Categories"
            type="text"
            name="productCategory"
            value={fields.productCategory}
            onChange={handleChange}
          />
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
              Create
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BrandProductsUpdate;
