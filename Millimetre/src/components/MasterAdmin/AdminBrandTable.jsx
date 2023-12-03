import { useEffect, useState } from "react";
import { useBrandInfoContext } from "../../../brand_context/brandInfoContext";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_BRAND_API_URL;
import axios from "axios";
import AdminBrandsCard from "../AdminBrandcard";

export default function AdminBrandTable() {
  const [brandInfo, setBrandInfo] = useState([]);
  const fetchBrandInfo = async () => {
    try {
      const response = await axios.get(`${url}brandinfo`);
      setBrandInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("aa", brandInfo);
  useEffect(() => {
    fetchBrandInfo();
  }, []);
  return (
    <>
      {brandInfo.map((item) => {
        return <AdminBrandsCard key={item._id} {...item} />;
      })}
    </>
  );
}
