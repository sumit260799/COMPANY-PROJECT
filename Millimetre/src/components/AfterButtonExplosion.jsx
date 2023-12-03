import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../mnf_context/userContext";
const url = import.meta.env.VITE_USER_API_URL;
function AfterButtonExplosion() {
  const { fetchUserData } = useUserContext();
  const { userLogin } = useUserContext();
  const navigate = useNavigate();
  const explosionWidth = window.innerWidth;
  const explosionHeight = window.innerHeight;
  const [explosionVisible, setExplosionVisible] = useState(false);

  useEffect(() => {
    fetchUserData(url);
  }, []);

  useEffect(() => {
    let explosionTimeout;
    const startExplosion = () => {
      setExplosionVisible(true);
      explosionTimeout = setTimeout(() => {
        setExplosionVisible(false);
      }, 3000); // Set the duration for how long the explosion should be visible
    };

    startExplosion();

    return () => {
      clearTimeout(explosionTimeout);
    };
  }, []);

  const navigatePage = () => {
    userLogin("infUser");
    navigate("/");
  };

  return (
    <div className="bg-blue-950 h-screen flex flex-col justify-center items-center">
      {explosionVisible && (
        <ConfettiExplosion width={explosionWidth} height={explosionHeight} />
      )}
      <span className="text-[3rem]">🎉</span>
      <div className="text-center">
        <h2 className="text-white font-bold text-5xl md:text-[6rem] mb-2">
          Welcome
        </h2>
        <p className="text-white text-xl md:text-2xl">
          Welcome! Start building your shop.
        </p>
      </div>
      <button
        onClick={navigatePage}
        className="mt-14 bg-black text-white py-2 px-10  rounded-none shadow-lg"
      >
        Let's Start
      </button>
    </div>
  );
}

export default AfterButtonExplosion;
