import React, { useState, useRef, useEffect } from "react";
import { BsBag, BsSearch, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../features/dataSlice";
import { setUserData, userLogout } from "../features/userSlice";
import axios from "axios";
export default function StoreFrontNav() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cart);
  const commonId = useSelector((state) => state?.profile);

  const userData = useSelector((state) => state?.user?.user);

  useEffect(() => {
    setUserData();
  }, []);

  const { email, name, profilePicture } = userData ?? "";

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const searchData = useSelector((state) => state?.data);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const totalAmount = cartData.reduce((total, item) => total + item.qnty, 0);
    setAmount(totalAmount);
  }, [cartData]);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleChange = (e) => {
    dispatch(searchProduct(e.target.value));
  };
  const handleLogout = async () => {
    try {
      // const response = await axios.post("http://localhost:3000/users/logout");
      // console.log(
      //   "🚀 ---------------------------------------------------------------🚀"
      // );
      // console.log(
      //   "🚀  file: StoreFrontNav.jsx:63  handleLogout  response",
      //   response.data
      // );
      // console.log(
      //   "🚀 ---------------------------------------------------------------🚀"
      // );
      dispatch(userLogout(null));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mx-auto z-50 fixed right-0 left-0 bg-gray-100 top-0 px-2 sm:px-6 border-b border-gray-200 lg:px-8 mb-5">
      <div className="relative flex items-center justify-between h-16">
        <Link to={`/${commonId && commonId.commonId}/categories`}>
          <div className="md:flex hidden items-center flex-shrink-0 text-xl md:text-2xl md:font-bold text-green-500">
            Millimetre
          </div>
        </Link>

        <div className="w-1/2 sm:w-1/3 flex items-center justify-center">
          <div className="flex items-center border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-400 focus:outline-none">
            <BsSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="what are you looking for?"
              className="w-full bg-transparent outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="relative flex justify-between items-center gap-x-4">
          <Link to={`/${commonId && commonId.commonId}/cart`}>
            <span className="relative flex flex-col justify-center items-center cursor-pointer">
              <BsBag className="text-xl " />
              {amount > 0 && (
                <div className="absolute shadow-md ring-1 ring-green-500 bottom-6 flex justify-center items-center text-[0.8rem] left-3 w-5 h-5 p-2 bg-gray-900 rounded-full text-white  ">
                  {amount}
                </div>
              )}

              <span className="text-[0.7rem]">Bag</span>
            </span>
          </Link>
          <Link to={`/${commonId.commonId}/wishlist`}>
            <span className="flex flex-col justify-center items-center cursor-pointer">
              <BsHeart className="text-xl " />
              <span className="text-[0.7rem]">Wishlist</span>
            </span>
          </Link>
          <div className="relative inline-block">
            {/* Replace with your avatar image */}
            {userData && userData.profilePicture ? (
              <img
                src={profilePicture}
                alt="Avatar"
                className="w-10 h-10 mb-2 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
            ) : (
              <img
                src="https://img.freepik.com/premium-vector/man-character_665280-46970.jpg"
                alt="Avatar"
                className="w-10 h-10 mb-2 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
            )}

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-0 w-40 bg-white border border-b-2 border-gray-300 rounded-md shadow-lg"
                ref={dropdownRef}
              >
                {/* Add your dropdown content here */}
                <div className="px-3 cursor-pointer font-bold py-1 border-b">
                  Hello {name ? name : "Shopper"}
                </div>

                {userData && userData.name ? (
                  <>
                    <Link to={`/${commonId && commonId.commonId}/orders`}>
                      <div className="hover:text-green-500 px-3 cursor-pointer  py-1 ">
                        Orders
                      </div>
                    </Link>
                    <Link to={`/${commonId && commonId.commonId}/shipping`}>
                      <div className="hover:text-green-500 px-3 cursor-pointer  py-1 ">
                        Shipping
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hover:text-green-500 px-3 cursor-pointer  py-1 "
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <Link to={`/${commonId && commonId.commonId}/signin`}>
                      <div className="px-3 cursor-pointer  py-1 ">sign in</div>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
