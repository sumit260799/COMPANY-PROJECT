import React, { useEffect, useState } from 'react'
const url = import.meta.env.VITE_BRAND_API_URL;
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Product from '../Product';
import AdminProducts from './AdminProducts';
const AdminBrandproductTable = () => {
    const { id } = useParams();
    console.log('iddd');
      const [brandProd, setBrandProd] = useState([]);
      console.log("brandprod", brandProd);
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}brandproducts/${id}`);
          setBrandProd(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [id]);
    
  return (
    <AdminProducts item={brandProd}/>
  )
}

export default AdminBrandproductTable