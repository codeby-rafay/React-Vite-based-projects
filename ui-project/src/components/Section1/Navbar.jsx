import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-6 px-20">
      <h4 className="bg-black text-white py-2 px-6 rounded-full uppercase">
        Target Audience
      </h4>
      <button className="bg-gray-300 text-black py-2 px-6 rounded-full uppercase tracking-wider text-sm cursor-pointer hover:bg-gray-400 transition-colors">
        Digital Banking Platform
      </button>
    </div>
  );
};

export default Navbar;
