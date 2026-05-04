import React from "react";
import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteConfirmationModal = ({ showDeleteModal, handleCancelDelete, handleConfirmDelete }) => {
  return (
    <AnimatePresence>
      {showDeleteModal && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-4 sm:py-12 px-8 sm:px-12 flex flex-col items-center justify-center gap-7">
              {/* Icon */}
              <div className="bg-red-100 rounded-full p-4">
                <Trash2 size={48} className="text-red-600" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Remove
                  <span className="font-light"> Order</span>
                </h2>
                <p className="text-gray-600 text-sm font-semibold opacity-60">
                  You sure you want to remove this order?
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 w-full">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
