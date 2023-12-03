import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-slate-100 fixed top-0 right-0 left-0  mx-auto z-10 lg:px-10   shadow-5">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-500">
            MilliMetre
          </span>
        </Link>
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 duration-500 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block items-center w-full lg:w-auto lg:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex items-center flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 text-slate-500">
            <li onClick={toggleMenu}>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-black rounded-xl hover:bg-gray-100  "
                aria-current="page"
              >
                millimetre for brands
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link
                to="/login"
                className="block py-2 pl-3 pr-4 text-black rounded-xl hover:bg-gray-100 "
              >
                login
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/register">
                <button className="block  text-white rounded-none border-2 border-black bg-black p-2 ">
                  Start a Marketplace
                </button>
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/brand-signup">
                <button className="block  max-[775px]:mt-2 text-black rounded-none border-2 border-black p-2 ">
                  join as a brand
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
