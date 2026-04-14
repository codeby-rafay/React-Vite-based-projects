import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results } = useSelector(
    (store) => store.search,
  );

  useEffect(
    function () {
      const getData = async () => {
        if (!query) return;
        dispatch(setLoading());
        try {
          let data = [];
          if (activeTab == "photos") {
            let response = await fetchPhotos(query);
            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description || "photo",
              thumbnail: item.urls.small,
              src: item.urls.full,
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

  return <div>{results.map((item, idx) => {
    return (
        <div key={idx}>
          {item.title}
        </div>
    )
  })}
  </div>;
};

export default ResultGrid;
