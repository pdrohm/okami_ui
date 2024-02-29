import React from "react";

const PictureModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="relative">{children}</div>
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default PictureModal;
