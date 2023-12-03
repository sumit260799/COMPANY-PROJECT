import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Notification from "./Notification";
import { useUserContext } from "../../mnf_context/userContext";
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
    text: "My Shop",
    icon: <HiCollection />,
    path: "/",
  },
  { text: "Products", icon: <HiCubeTransparent />, path: "/products" },
  {
    text: "Collections",
    icon: <HiPencil />,
    path: "/collections",
  },
  { text: "Blog", icon: <HiLink />, path: "/blog" },
  { text: "Design", icon: <HiSearch />, path: "/design" },
  {
    text: "Links",
    icon: <HiShoppingCart />,
    path: "/links",
  },
  {
    text: "Discover Brands",
    icon: <HiBadgeCheck />,
    path: "/brands",
  },
  {
    text: "My Orders",
    icon: <HiChat />,
    path: "/myorders",
  },
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
      {
        text: "Invite a friend",
        icon: <HiUserAdd />,
        path: "/inviteafriend",
      },
    ],
  },
  {
    text: "Support",
    icon: <HiChat />,
    path: "/support",
    subPaths: [
      {
        text: "FAQ",
        icon: <HiQuestionMarkCircle />,
        path: "/faq",
      },
    ],
  },
  { text: "Logout", icon: <HiLogout />, path: "/" },
];

function Nav(props) {
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
      <div className="fixed top-0 right-0 left-0 bg-gray-800  z-50 h-12 w-[100vw]  flex items-center justify-between px-4">
        <button
          className="text-2xl  text-green-600 font-bold focus:outline-none"
          onClick={toggleDrawer}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
        <p className="text-green-500 font-sans font-semibold text-[1.3rem]">
          millimetre
        </p>
        <Notification className="mr-10 text-green-600" />
      </div>
      <nav
        className={`mt-12 h-[110vh]  ${
          open ? "fixed top-0 left-0   z-50 bg-slate-100   shadow-5 " : "hidden"
        }  w-64`}
      >
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.text} onClick={() => setMenuName(item.text)}>
              {!item.subPaths ? (
                <Link
                  to={item.path}
                  onClick={item.text === "Logout" && handleLogout}
                  className={`block px-4 duration-150 text-gray-700 ${
                    MenuName === item.text ? "text-green-500" : "none"
                  }  ${openAccount ? "py-2" : "py-3"}`}
                >
                  <div className="flex items-center">
                    {item.icon}

                    <span className="ml-2">{item.text}</span>
                  </div>
                </Link>
              ) : (
                <>
                  <button
                    className="w-full  py-3 px-4 text-gray-700  focus:outline-none"
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
                            to={subPath.path}
                            className={`block py-1 px-4 text-gray-700  focus:outline-none `}
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

export default Nav;
