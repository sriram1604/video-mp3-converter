import React, { useState, useEffect } from "react";

export default function Dialog({ isOpen, message, onClose, onSubmit, inputMode }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isOpen) setInputValue("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Overlay with translucent background and blur
    <div className="fixed inset-0  bg-gradient-to-br from-purple-700 to-blue-500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <p className="mb-4 text-black font-semibold">{message}</p>

        {inputMode && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter filename"
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4 text-black"
          />
        )}

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => {
              setInputValue("");
              onClose();
            }}
          >
            Cancel
          </button>

          {inputMode ? (
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
              disabled={inputValue.trim() === ""}
              onClick={() => {
                onSubmit(inputValue.trim());
                setInputValue("");
              }}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
              onClick={onClose}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
