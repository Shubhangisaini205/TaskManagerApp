import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96 transform transition-transform duration-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">❌</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
