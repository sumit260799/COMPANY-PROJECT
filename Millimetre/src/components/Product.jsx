import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Link } from "react-router-dom";
import { useCartContext } from "../../mnf_context/cartContext";
import { useUserContext } from "../../mnf_context/userContext";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function Product() {
  const { tokenId } = useUserContext();
  const { isLoading, cart, fetchProducts, handleDeleteProduct } =
    useCartContext();

  useEffect(() => {
    fetchProducts();
  }, [tokenId]);

  const [sortColumn, setSortColumn] = useState(""); // Track the column to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Track the sorting order (asc or desc)

  // Function to handle sorting when a column header is clicked
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Function to compare two rows based on the selected column and order
  const compareRows = (a, b) => {
    if (sortOrder === "asc") {
      if (sortColumn === "productName" || sortColumn === "productCategory") {
        return a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        return a[sortColumn] - b[sortColumn];
      }
    } else {
      if (sortColumn === "productName" || sortColumn === "productCategory") {
        return b[sortColumn].localeCompare(a[sortColumn]);
      } else {
        return b[sortColumn] - a[sortColumn];
      }
    }
  };

  // Sort the products array based on the selected column and order
  const sortedProducts = [...cart].sort(compareRows);

  // Function to render up or down arrow based on sorting order
  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      if (sortOrder === "asc") {
        return <span>&uarr;</span>; // Up arrow
      } else {
        return <span>&darr;</span>; // Down arrow
      }
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading.<span className="dot">.</span>
        </div>
      </div>
    );
  }
  if (cart.length < 1) {
    return (
      <div className="mt-28 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Add your empty SVG icon here */}
          {/* For example, you can use an empty box icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <div className="mt-4 text-2xl text-gray-600">Your store is empty</div>
      </div>
    );
  }

  return (
    <div className="mt-16 p-4">
      <table className="border border-gray-700 min-w-full table-auto">
        <thead>
          <tr className="bg-green-500 select-none text-white  text-center">
            <th
              className="py-2  border"
              onClick={() => handleSort("productId")}
            >
              Id {renderSortArrow("productId")}
            </th>
            <th className="py-2  border">Image</th>
            <th
              className="py-2 border max-w-xs"
              onClick={() => handleSort("productName")}
            >
              Title {renderSortArrow("productName")}
            </th>
            <th
              className="py-2 border"
              onClick={() => handleSort("productPrice")}
            >
              Price {renderSortArrow("productPrice")}
            </th>
            <th
              className="py-2 border"
              onClick={() => handleSort("productCategory")}
            >
              Categories {renderSortArrow("productCategory")}
            </th>
            <th
              className="py-2 border"
              onClick={() => handleSort("productDiscount")}
            >
              Discount {renderSortArrow("productDiscount")}
            </th>
            <th className="py-2 border" onClick={() => handleSort("stock")}>
              Stock {renderSortArrow("stock")}
            </th>
            <th className="py-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-1 border text-center">{index + 1}</td>

              <td className="py-1 border text-center">
                <img
                  className="max-w-16 max-h-16 mx-auto"
                  src={row.productImages[0]}
                  alt={row.productName}
                />
              </td>
              <td
                className="py-1 text-[0.9rem] border text-center"
                style={{ width: "260px", minWidth: "180px", maxWidth: "350px" }}
              >
                {row.productName.substr(0, 80)}
              </td>
              <td className="py-1 border text-center">{row.productPrice}</td>
              <td className="py-1 border text-center">{row.productCategory}</td>
              <td className="py-1 border text-center">{row.productDiscount}</td>
              <td className="py-1 border text-center">{row.stock}</td>
              <td className="py-1 border text-center  flex-wrap ">
                <button
                  onClick={() => handleDeleteProduct(row.productId)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
