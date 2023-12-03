import React from "react";

const Modal = ({ loading, title, message, onConfirm, onCancel }) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loaders">
          Loading.<span className="dot">.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute"></div>
      <div className="modal-container z-50">
        <div className="modal bg-white rounded-lg overflow-hidden p-6 shadow-md">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-6 py-3 mr-2 rounded-full hover:bg-red-700 transition duration-300"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
