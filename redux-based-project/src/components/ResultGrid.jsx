import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(
    function () {
      if (!query) return;

      setPage(1);
      setHasMore(true);

      const getData = async () => {
        try {
          dispatch(setLoading());

          let data = [];
          if (activeTab == "photos") {
            let response = await fetchPhotos(query, 1, 20);
            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description || "photo",
              thumbnail: item.urls.small,
              src: item.urls.regular,
              url: item.links.html,
            }));
            setHasMore(response.results.length === 20);
          }
          if (activeTab == "videos") {
            let response = await fetchVideos(query, 1, 20);
            data = response.videos.map((item) => ({
              id: item.id,
              type: "video",
              title: item.user.name || "video",
              thumbnail: item.image,
              src: item.video_files[0]?.link || item.video_files[1]?.link,
              url: item.url,
            }));
            setHasMore(response.videos.length === 20);
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

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      let newData = [];
      if (activeTab == "photos") {
        let response = await fetchPhotos(query, nextPage, 20);
        newData = response.results.map((item) => ({
          id: item.id,
          type: "photo",
          title: item.alt_description || "photo",
          thumbnail: item.urls.small,
          src: item.urls.regular,
          url: item.links.html,
        }));
        setHasMore(response.results.length === 20);
      }
      if (activeTab == "videos") {
        let response = await fetchVideos(query, nextPage, 20);
        newData = response.videos.map((item) => ({
          id: item.id,
          type: "video",
          title: item.user.name || "video",
          thumbnail: item.image,
          src: item.video_files[0]?.link || item.video_files[1]?.link,
          url: item.url,
        }));
        setHasMore(response.videos.length === 20);
      }
      dispatch(setResults([...results, ...newData]));

      setPage(nextPage);
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

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
    <div className="w-full">
      <div className="flex flex-wrap gap-5 p-8 justify-center">
        {results.map((item) => {
          return (
            <div key={item.id}>
              <ResultCard item={item} />
            </div>
          );
        })}
      </div>
      {hasMore && results.length > 0 && (
        <div className="flex justify-center pb-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 cursor-pointer bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultGrid;
