import CollectionCard from "../components/CollectionCard";
import { useSelector } from "react-redux";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white min-h-screen w-full">
      <div className="flex flex-wrap gap-5 p-8 justify-center">
        {collection.map((item, idx) => {
          return (
            <div key={idx}>
              <CollectionCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionPage;
