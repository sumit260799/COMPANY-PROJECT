import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Notification from "../Notification";
import { useUserContext } from "../../../mnf_context/userContext";
import {
  HiMenu,
  HiX,
  HiCollection,
  HiCubeTransparent,
  HiPencil,
  HiLink,
  HiSearch,
  HiShoppingCart,
  HiUser,
  HiChat,
  HiQuestionMarkCircle,
  HiLogout,
  HiCurrencyDollar,
  HiBadgeCheck,
  HiCreditCard,
  HiUserAdd,
} from "react-icons/hi";

import { FcSettings } from "react-icons/fc";
const NAV_ITEMS = [
  {
    text: "Dashboard",
    icon: <HiCollection />,
    path: "/adminpannel",
  },
  { text: "Influencer", icon: <HiCubeTransparent />, path: "/adminpannel/influencer" },
  {
    text: "Brands",
    icon: <HiPencil />,
    path: "/adminpannel/brand",
  },
  { text: "Sales", icon: <HiLink />, path: "/blog" },
  
  {
    text: "Account",
    icon: <HiUser />,
    path: "/account",
    subPaths: [
      {
        text: "Settings",
        icon: <FcSettings />,
        path: "/settings",
      },
      {
        text: "Earnings",
        icon: <HiCurrencyDollar />,
        path: "/earnings",
      },
      {
        text: "Payouts",
        icon: <HiCreditCard />,
        path: "/payouts",
      },
      {
        text: "Bank Information",
        icon: <HiUserAdd />,
        path: "/bankinformation",
      },
      
      
    ],
  },
  
  
  { text: "Logout", icon: <HiLogout />, path: "/" },
];

function AdminNav(props) {
  const { handleLogout } = useUserContext();
  const [open, setOpen] = useState(true);
  const [openAccount, setOpenAccount] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [MenuName, setMenuName] = useState("");
  const location = useLocation();
  const children = props.children;
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 right-0 left-0 bg-slate-200 z-50 h-12 w-[100vw]  flex items-center justify-between px-4">
        <button
          className="text-2xl  text-black font-bold focus:outline-none"
          onClick={toggleDrawer}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
        <p className="text-green-500 font-sans font-semibold text-[1.3rem]">
          millimetre
        </p>
        <Notification className="mr-10" />
      </div>
      <nav
        className={`mt-12 h-[110vh]  ${
          open ? "fixed top-0 left-0   z-50 bg-slate-100  " : "hidden"
        }  w-64`}
      >
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.text} onClick={() => setMenuName(item.text)}>
              {!item.subPaths ? (
                <Link
                  to={item.path}
                  onClick={item.text === "Logout" && handleLogout}
                  className={`block px-4 duration-150 text-gray-700 hover:bg-gray-200 ${
                    MenuName === item.text ? "bg-gray-200" : "none"
                  } focus:outline-none ${openAccount ? "py-2" : "py-3"}`}
                >
                  <div className="flex items-center">
                    {item.icon}

                    <span className="ml-2">{item.text}</span>
                  </div>
                </Link>
              ) : (
                <>
                  <button
                    className="w-full  py-3 px-4 text-gray-700 hover:bg-gray-200 focus:outline-none"
                    onClick={() => {
                      if (item.text === "Account") setOpenAccount(!openAccount);
                      if (item.text === "Support") setOpenSupport(!openSupport);
                    }}
                  >
                    <div className={` flex items-center justify-between`}>
                      <div className={`flex items-center`}>
                        {item.icon}
                        <span className="ml-2">{item.text}</span>
                      </div>
                      <span>
                        {(item.text === "Account" && openAccount) ||
                        (item.text === "Support" && openSupport) ? (
                          <HiX className="ml-2 font-bold text-[1.1rem] mt-[0.1rem] " />
                        ) : (
                          <HiMenu className="ml-2 font-bold text-[1.1rem] mt-[0.1rem]" />
                        )}
                      </span>
                    </div>
                  </button>
                  <div
                    className={`${
                      (item.text === "Account" && openAccount) ||
                      (item.text === "Support" && openSupport)
                        ? "block"
                        : "hidden"
                    } transition-all duration-300 ease-in-out`}
                  >
                    <ul>
                      {item.subPaths.map((subPath) => (
                        <li
                          key={subPath.text}
                          className={`${
                            location.pathname.startsWith(subPath.path) &&
                            " border-black"
                          } pl-8`}
                        >
                          <Link
                            to={subPath.text}
                            className={`block py-1 px-4 text-gray-700 hover:bg-gray-200 focus:outline-none `}
                          >
                            <div className="flex items-center">
                              {subPath.icon}
                              <span className="ml-2">{subPath.text}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`w-full transition-all ${
          open ? "ml-64 duration-500" : "ml-0"
        } m z-20`}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminNav;
