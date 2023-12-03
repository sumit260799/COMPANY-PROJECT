import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
const url = import.meta.env.VITE_USER_BASE_URL;
const imgUrl = import.meta.env.VITE_IMAGE_API_URL;

export default function InfTable() {
  const [infInfo, setInfInfo] = useState([]);
  const fetchInfInfo = async () => {
    try {
      const response = await axios.get(`${url}admin/infdetails`);
      setInfInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfInfo();
  }, []);

  const columns = [
    { field: "profilePicture", headerName: "Image", width: 200 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "shopTitle", headerName: "Shop Name", width: 100 },
    { field: "action", headerName: "Action", width: 100 },
  ];

  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSortClick = (columnField) => {
    if (columnField === "Image") {
      return;
    }

    if (sortColumn === columnField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnField);
      setSortDirection("asc");
    }
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleViewAction = (row) => {
    // Define the action to perform when the "Eye" button is clicked.
    console.log("Viewing:", row.Name);
    // You can implement the specific action you need here.
  };

  const sortedData = [...infInfo].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const filteredRows = sortedData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredRows.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <section className="w-[95%] md:w-[90%] mx-auto my-20">
      <div className="mt-[5rem] flex justify-between my-5">
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        {selectedItems.length > 0 && (
          <button
            className="text-white bg-red-500 hover:bg-red-600 text-[1rem] px-2 py-1 rounded-md"
            onClick={() => handleDeleteProduct(selectedItems)}
          >
            Delete
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="px-4 py-2 select-none text-left font-semibold cursor-pointer"
                  onClick={() => handleSortClick(column.field)}
                >
                  {column.headerName}
                  {sortColumn === column.field && (
                    <span>
                      {sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td
                    key={column.field}
                    className="px-4 py-2 border-t border-gray-300"
                  >
                    {column.field === "profilePicture" ? (
                      <img
                        src={`${imgUrl}${row.profilePicture}`}
                        alt={row.Name} // Add alt text for accessibility
                        className="w-16 h-16 rounded-full" // Adjust the size as needed
                      />
                    ) : column.field === "action" ? (
                      <button
                        className="bg-blue-500 text-white rounded-full p-2"
                        onClick={() => handleViewAction(row)}
                      >
                        <VisibilityIcon />
                      </button>
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= filteredRows.length}
          className="px-3 py-1 bg-blue-500 hover-bg-blue-600 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </section>
  );
}
