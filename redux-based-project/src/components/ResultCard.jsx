import { Bookmark } from "lucide-react";
import { useState } from "react";

const ResultCard = ({ item }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (item) => {
    item.preventDefault();
    setIsBookmarked(!isBookmarked);

    const oldData = JSON.parse(localStorage.getItem("collection")) || [];
    const newData = [...oldData, item];
    localStorage.setItem("collection", JSON.stringify(newData));
  };

  return (
    <div className="group relative h-70 w-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <a href={item.url} target="_blank" className="h-full w-full block">
        {item.type === "photo" ? (
          <img
            src={item.src}
            className="h-70 w-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
            alt={item.title}
          />
        ) : null}
        {item.type === "video" ? (
          <video
            src={item.src}
            className="h-70 w-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
            autoPlay
            loop
            muted
          />
        ) : null}

        {/* Gradient overlay on cards */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent text-white">
          <div className="flex justify-between items-start gap-2">
            <h1 className="text-sm font-bold capitalize line-clamp-2 flex-1">
              {item.title}
            </h1>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                isBookmarked
                  ? "bg-blue-300 text-black"
                  : "bg-white/20 hover:bg-white/40 text-white"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark
                size={20}
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ResultCard;
