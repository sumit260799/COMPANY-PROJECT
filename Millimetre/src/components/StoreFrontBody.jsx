import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserContext } from "../../mnf_context/userContext";
import StoreFrontTabs from "./StoreFrontTabs";
import StoreFrontNav from "./StoreFrontNav";
import StorefrontHome from "./StorefrontHome";

const imgUrl = import.meta.env.VITE_IMAGE_API_URL;

export default function StoreFrontBody({ userData }) {
  const {
    useCards,
    buttonColor,
    buttonShape,
    profilePicture,
    name,
    shopTitle,
    storeBackgroundColor,
    logo,
    heroImage,
  } = userData || {};

  const randomName = name;

  return (
    <div className={` flex items-center justify-center`}>
      {userData && (
        <div className=" rounded p-3 sm:p-8 flex flex-col sm:flex-row items-center mt-16 sm:mt-20 gap-5 ">
          <div className="w-28 h-28">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={randomName}
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <img
                src="https://secure.gravatar.com/avatar/6b72f6d6f4e46d77b82732ec182d248f/?s=48&d=https://images.binaryfortress.com/General/UnknownUser1024.png"
                alt="avatar"
                className="rounded-full object-cover bg-transparent w-full h-full"
              />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{randomName}</h1>
            <p className="text-gray-600">
              Shop: <span className="font-bold">{shopTitle}</span>
            </p>
          </div>
          <button className="  border-2 border-slate-400 text-black py-2 px-4 rounded-full">
            Follow
          </button>
        </div>
      )}
    </div>
  );
}
