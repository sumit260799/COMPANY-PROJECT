import React, { useState, useEffect } from "react";
import { useUserContext } from "../../mnf_context/userContext";
import ClipboardJS from "clipboard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
const Url = import.meta.env.VITE_USER_API_URL;

function Links() {
  const { tokenId } = useUserContext();
  const [linkData, setLinkData] = useState({ url: "", title: "" });

  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState([]);

  const [toggle, setToggle] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData({ ...linkData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Url}link`, {
        ...linkData,
        commonId: tokenId,
      });
      setLinkData({ url: "", title: "" });
      toast.success(response.data.message, { duration: 2000 });
      setToggle(!toggle);
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, { duration: 2000 });
    }
  };
  const deleteLink = async (value) => {
    try {
      const response = await axios.delete(`${Url}link/${value}`);
      toast.success(response.data.message, { duration: 2000 });
      setToggle(!toggle);
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, { duration: 2000 });
    }
  };

  // const updateLink = async () => {
  //   console.log("update");
  //   try {
  //     const response = await axios.get(`${Url}link/${tokenId}`);
  //     setLinkData(response.data?.post);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-button");

    clipboard.on("success", function (e) {
      e.clearSelection();
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });

    clipboard.on("error", function (e) {
      console.error("Copy failed:", e.action);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${Url}link/${tokenId}`);
      setLinks(response.data?.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [toggle]);

  return (
    <div className="flex sm:mt-2 mx-auto items-center justify-center min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "40px",
          },
        }}
      />
      <div className=" border sm:border-gray-400 bg-gray-100 p-3 overflow-hidden sm:p-8 sm:rounded-xl  w-full sm:w-[600px] lg:min-w-[700px]">
        <button
          className={`w-full overflow-hidden ${
            copied ? "bg-green-100 text-green-600" : "bg-gray-200 text-black"
          } font-semibold py-2 px-1 sm:px-4 rounded copy-button`}
          data-clipboard-text={`http://localhost:5173/${tokenId}/categories`}
        >
          {copied ? (
            <div className="p-1 text-green-500 font-semibold">Copied!</div>
          ) : (
            <span className="md:text-lg text-sm overflow-hidden">
              localhost:5173/{tokenId}/categories
            </span>
          )}
        </button>
        <form onSubmit={handleSubmit} className="overflow-hidden" action="">
          <div className="mt-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
              placeholder="URL (Including https://)"
              value={linkData.url}
              name="url"
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
              placeholder="Title"
              value={linkData.title}
              name="title"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gray-900 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700"
          >
            Save
          </button>
        </form>
        <div className="mt-4">
          {links.length > 0 && (
            <h4 className="text-lg font-medium">Side menu links...</h4>
          )}
          <div>
            {links.map((item, index) => {
              const { title, url, uniqueId } = item;
              return (
                <div
                  className="border flex  justify-between items-center border-gray-400 px-6 rounded-lg p-2 my-2"
                  key={index}
                >
                  <div>
                    <h3 className="font-medium tracking-wider mb-1 text-slate-700">
                      {title}
                    </h3>
                    <p className="font-normal text-slate-600">{url}</p>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    {/* <span
                      onClick={() => updateLink(uniqueId)}
                      className="text-[1.4rem] text-slate-900 cursor-pointer"
                    >
                      {<AiFillEdit />}
                    </span> */}
                    <span
                      onClick={() => deleteLink(uniqueId)}
                      className="text-[1.4rem] text-red-700 cursor-pointer"
                    >
                      {<AiFillDelete />}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;
