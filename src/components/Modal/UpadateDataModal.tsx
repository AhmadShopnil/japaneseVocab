/* eslint-disable @typescript-eslint/no-explicit-any */

const UpadateDataModal = ({ onClose, children }: any) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg">
        <div className="flex justify-end items-center px-4 py-3 border-b">
          {/* {title && <h2 className="text-lg font-semibold">{title}</h2>} */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default UpadateDataModal;
