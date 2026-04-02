import React from "react";

const SaveBtn = () => {
  return (
    <div>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 flex items-center gap-2 cursor-pointer rounded-xl transition-colors">
        <img
          className="size-4"
          src="https://www.svgrepo.com/show/447850/wishlist.svg"
          alt="Wishlist"
        />{" "}
        Save
      </button>
    </div>
  );
};

export default SaveBtn;
