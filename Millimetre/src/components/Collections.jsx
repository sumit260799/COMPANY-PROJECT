import React, { useState } from "react";
import Modal from "../components/Modal"; // Import your modal component
import { BiGridAlt } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
const Url = import.meta.env.VITE_USERS_URL;
import { useUserContext } from "../../mnf_context/userContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function Collections() {
  const { tokenId } = useUserContext();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`${Url}collections/${tokenId && tokenId}`);
    const data = response.json();
    return data;
  };
  const { data, status, isFetching } = useQuery("collections", fetchData);
  const [loading, setLoading] = useState(false);
  const openModal = (commonId, collectionId) => {
    setCollectionToDelete({ commonId, collectionId });
    setShowModal(true);
  };

  const closeModal = () => {
    setCollectionToDelete(null);
    setShowModal(false);
  };

  const deleteCollection = async () => {
    const { commonId, collectionId } = collectionToDelete;

    try {
      setLoading(true);
      const response = await axios.delete(`${Url}/collections`, {
        data: { commonId, collectionId },
      });
      queryClient.invalidateQueries("collections");
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      closeModal();
    }
  };

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading.<span className="dot">.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto mt-20 w-full  sm:w-[80%]">
        <button className="text-black" onClick={() => {}}>
          <AiOutlineArrowLeft className="w-6 h-6" />
          Back to Shop
        </button>
        <h5 className="text-2xl my-2 ">Collections</h5>
        <div className="border sm:border-gray-400 bg-gray-50 sm:rounded-lg  p-6 min-h-[250px] my-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <h6 className="hidden sm:flex text-sm  sm:text-xl ">
                My Collections
              </h6>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="border border-gray-400 px-2 py-1"
                  onClick={() => {}}
                >
                  Reorder
                </button>
                <Link to="/collection/create">
                  <button
                    className="border border-gray-400 px-2 py-1"
                    onClick={() => {}}
                  >
                    Add Collections
                  </button>
                </Link>
              </div>
            </div>
            {data.length > 0 ? (
              <div className=" flex justify-center sm:justify-start items-center w-full flex-wrap gap-6 my-5">
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="relative w-[160px] shadow-xl  rounded-t-md    "
                  >
                    <button
                      onClick={() =>
                        openModal(item.commonId, item.collectionId)
                      }
                      className="absolute right-1 p-[0.1rem] font-bold bg-gray-200  rounded-full   text-red-500 text-xl "
                    >
                      <AiFillDelete />
                    </button>
                    <img
                      className="h-36 w-full rounded-t-md  object-cover mb-2 "
                      src={item.collectionImage}
                      alt=""
                    />
                    <div className="text-gray-800 flex flex-col justify-center w-full ">
                      <h2 className="text-md font-medium  px-2 mb-1 text-center capitalize">
                        {item.collectionName}
                      </h2>
                      <button className="bg-gray-700 text-white py-2 px-2 text-sm rounded-b-md duration-300">
                        <Link to={`${item.collectionId}`}>View Collection</Link>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-[2rem] w-full">
                <BiGridAlt className=" text-[2rem]" />
                <p className="text-sm sm:text-lg text-center">
                  No Collections Added
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {showModal && (
        <Modal
          title="Delete Collection"
          message="Are you sure you want to delete this collection?"
          onConfirm={deleteCollection}
          onCancel={closeModal}
          loading={loading}
        />
      )}
    </>
  );
}

export default Collections;
