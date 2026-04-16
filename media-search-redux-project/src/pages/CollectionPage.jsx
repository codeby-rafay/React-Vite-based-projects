import CollectionCard from "../components/CollectionCard";
import { useSelector } from "react-redux";
import {
  clearCollection,
  clearallToast,
} from "../redux/features/collectionSlice";
import { useDispatch } from "react-redux";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);
  const dispatch = useDispatch();
  const clearCollectionHandler = () => {
    dispatch(clearCollection());
    dispatch(clearallToast());
  };
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white min-h-screen w-full">
      <div className="flex flex-wrap gap-15 p-8">
        {collection.map((item, idx) => {
          return (
            <div key={idx}>
              <CollectionCard item={item} />
            </div>
          );
        })}
      </div>
      {collection.length > 0 ? (
        <div className="flex justify-center items-center py-8 px-4 w-full ">
          <button
            onClick={clearCollectionHandler}
            className="bg-linear-to-r from-blue-500 text-white shadow-lg shadow-blue-500/50 font-bold px-8 py-3 text-lg rounded-lg transition-all duration-300 cursor-pointer
                  transform hover:scale-105 focus:outline-none focus:ring-offset-gray-800"
          >
            Clear All
          </button>
        </div>
      ) : (
        <h1 className="text-center text-gray-500 text-3xl py-10">
          No items in Collection!
        </h1>
      )}
    </div>
  );
};

export default CollectionPage;
