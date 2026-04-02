import { Link } from "react-router-dom";

const Cards = ({ categoryIcons, categories, formatName }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((slug) => (
        <Link key={slug} to={`/category/${slug}`}>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-200 hover:-translate-y-1 transition-all duration-200 text-center group cursor-pointer flex flex-col items-center justify-center min-h-30">
            {/* Emoji icon */}
            <div className="text-4xl mb-3 mt-6">
              {categoryIcons[slug] || "📦"}
            </div>
            {/* Category name */}
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
              {formatName(slug)}
            </h3>
            {/* Arrow */}
            <div className="text-orange-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Browse →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;