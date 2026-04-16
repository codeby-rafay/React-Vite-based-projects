import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
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
        className="w-full max-w-2xl"
      >
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-2 text-center">
            Search Photos & Videos
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Discover amazing content
          </p>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                required
                placeholder="Search for photos, videos..."
                className="w-full px-5 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
              />
              {text && (
                <button
                  type="button"
                  onClick={() => {
                    setText("");
                    dispatch(setQuery(""));
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold active:scale-95 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/50"
            >
              <FiSearch size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
