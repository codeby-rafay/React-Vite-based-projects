import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { setQuery } from "../redux/features/searchSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    // setText("");
  };
  return (
    <div className="flex justify-center p-4 w-full">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="w-full max-w-lg shadow-2xl rounded-lg overflow-hidden"
      >
        <div className="bg-white p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Search Photos and Videos
          </h2>

          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              required
              placeholder="Enter your search..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
            />

            <button
              type="submit"
              className="cursor-pointer px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold active:scale-95 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <FiSearch size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Type something and click search
          </p>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
