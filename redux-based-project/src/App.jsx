import { fetchPhotos, fetchVideos } from "./api/mediaApi";

const App = () => {
  return (
    <div className="bg-gray-950 text-white h-screen w-full">
      <h1>Redux Project</h1>
      <button
        className="bg-green-400 px-2 py-2 m-5"
        onClick={async () => {
          const data = await fetchPhotos("cat");
          console.log(data.results);
        }}
      >
        Get Photos
      </button>
      <button
        className="bg-green-400 px-2 py-2 m-5"
        onClick={async () => {
          const data = await fetchVideos("dog");
          console.log(data.videos);
        }}
      >
        Get Videos
      </button>
    </div>
  );
};

export default App;
