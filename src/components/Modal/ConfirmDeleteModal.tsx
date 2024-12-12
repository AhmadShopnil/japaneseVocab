/* eslint-disable @typescript-eslint/no-explicit-any */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  handleDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: any;
}) => {
  const handleConfirmDelete = () => {
    handleDelete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-8">
      <div className="relative bg-white p-6 sm:p-8 rounded shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-md">
        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faTimes} size="xl" color="teal" />
        </button>

        <h2 className="text-lg font-bold mb-6 text-center">
          Are you sure want to delete ?
        </h2>

        {/* Confirm Button */}
        <div className="w-full flex justify-center">
          <button
            className="w-2/3  bg-red-400 text-white py-2 rounded hover:bg-red-600 "
            onClick={() => handleConfirmDelete()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
