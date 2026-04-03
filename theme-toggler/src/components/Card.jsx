export default function Card() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg dark:shadow-2xl dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden bg-linear-to-b from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-900 p-6">
        <div className="block">
          <img
            className="w-full h-48 object-contain rounded-2xl hover:scale-110 transition-transform duration-300"
            src="https://allmytech.pk/wp-content/uploads/2021/12/apple-watch-7-starlight-band-gps-45mm.jpg"
            alt="Apple Watch Series 7"
          />
        </div>
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Sale
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="block group">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-200">
            Apple Watch Series 7
          </h5>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Starlight Sport
          </p>
        </div>

        <div className="flex items-center mt-3 mb-4">
          <div className="flex gap-0.5">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            <svg
              className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
            4.0
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <button className="text-white bg-linear-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
