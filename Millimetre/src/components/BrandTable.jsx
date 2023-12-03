import React, { useEffect, useState } from "react";
import { useBrandInfoContext } from "../../brand_context/brandInfoContext";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function BrandTable() {
  const { brandId, products, deleteProduct, fetchProducts, setTokenId } =
    useBrandInfoContext();

  const [sortColumn, setSortColumn] = useState(""); // Track the column to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Track the sorting order (asc or desc)

  useEffect(() => {
    setTokenId();
    fetchProducts(brandId);
  }, []);
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
  const sortedProducts = [...products].sort(compareRows);

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

  return (
    <div className="mt-16 p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-green-500 select-none text-white text-center">
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
            <th className="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-1 border text-center">{index + 1}</td>

              <td
                style={{ width: "150px", minWidth: "80px", maxWidth: "200px" }}
                className="py-1 border text-center"
              >
                <img
                  className="max-w-16 max-h-16 mx-auto"
                  src={`${row.productImages[0]}`}
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
                <Link to={`/update/${row.productId}`}>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                    <FiEdit />
                  </button>
                </Link>
                <button
                  onClick={() => deleteProduct(row.productId)}
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
