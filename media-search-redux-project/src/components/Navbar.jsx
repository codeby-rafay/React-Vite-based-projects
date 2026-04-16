import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between py-6 px-10 items-center">
      <Link className="text-2xl font-bold" to="/">
        Media
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
          Search
        </span>
      </Link>
      <div className="flex gap-5 items-center">
        <Link
          className="text-base font-medium text-blue-800 bg-white rounded px-3 py-1 active:scale-95"
          to="/"
        >
          Search
        </Link>
        <Link
          className="text-base font-medium text-blue-800 bg-white rounded px-3 py-1 active:scale-95"
          to="/collection"
        >
          Collection
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
