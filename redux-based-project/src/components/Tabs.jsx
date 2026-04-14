import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);
  const tabs = ["photos", "videos"];

  return (
    <div className="flex justify-center items-center py-8 px-4 w-full">
      <div className="flex gap-4 bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700">
        {tabs.map(function (elem, idx) {
          return (
            <button
              key={idx}
              onClick={() => dispatch(setActiveTab(elem))}
              className={`
                px-8 py-3 font-semibold text-lg rounded-lg transition duration-300 uppercase cursor-pointer
                transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
                ${
                  activeTab === elem
                    ? "bg-linear-to-r from-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white"
                }
              `}
            >
              {elem}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
