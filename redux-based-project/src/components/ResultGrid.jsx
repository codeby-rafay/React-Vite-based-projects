import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, error, loading } = useSelector(
    (store) => store.search,
  );

  useEffect(
    function () {
      if (!query) return;
      const getData = async () => {
        try {
          dispatch(setLoading());
          let data = [];
          if (activeTab == "photos") {
            let response = await fetchPhotos(query);
            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description || "photo",
              thumbnail: item.urls.small,
              src: item.urls.full,
              url: item.links.html,
            }));
          }
          if (activeTab == "videos") {
            let response = await fetchVideos(query);
            data = response.videos.map((item) => ({
              id: item.id,
              type: "video",
              title: item.user.name || "video",
              thumbnail: item.image,
              src: item.video_files[0].link,
              url: item.url,
            }));
          }
          dispatch(setResults(data));
        } catch (err) {
          dispatch(setError(err.message));
        }
      };
      getData();
    },
    [query, activeTab],
  );

  if (error)
    return (
      <h1 className="text-center text-red-500 text-2xl py-10">
        Error loading results!
      </h1>
    );
  if (loading)
    return (
      <h1 className="text-center text-blue-300 text-2xl py-10">Loading...</h1>
    );
  if (!query)
    return (
      <h1 className="text-center text-gray-500 text-2xl py-10">
        Start searching to see results
      </h1>
    );
  if (results.length === 0)
    return (
      <h1 className="text-center text-gray-500 text-2xl py-10">
        No Data Found!
      </h1>
    );

  return (
    <div className="flex flex-wrap gap-5 overflow-auto p-8 justify-center">
      {results.map((item, idx) => {
        return (
          <div key={idx}>
              <ResultCard item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default ResultGrid;
