// import { Outlet, useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(`/store/${commonId}/signin`);
//     }
//   }, [isAuthenticated, commonId, navigate]);

//   if (!isAuthenticated) {
//     return null; // Add this line to prevent rendering the <Outlet />
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ isAuthenticated }) => {
  const commonId = useSelector((state) => state.profile?.commonId);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={`/store/${commonId}/signin`} />;
  }
};

export default ProtectedRoute;
