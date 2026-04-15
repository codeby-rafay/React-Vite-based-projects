import ResultGrid from "./components/ResultGrid";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";

const App = () => {
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white min-h-screen w-full flex flex-col items-center p-4">
      <SearchBar />
      <Tabs />
      <ResultGrid />
    </div>
  );
};

export default App;
