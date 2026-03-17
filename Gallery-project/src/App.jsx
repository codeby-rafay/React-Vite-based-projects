import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Prev_button from "./components/Prev_button";
import Next_button from "./components/Next_button";

const App = () => {
  const [userdata, setuserData] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`,
    );
    setuserData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [index]);

  return (
    <div
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      className="bg-zinc-950 min-h-screen text-white"
    >
      <header className="border-b border-zinc-800 px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-sans mb-1">
            Visual Gallery
          </p>
          <h1 className="text-3xl font-bold tracking-tight">The Picsum</h1>
        </div>
        <span className="text-zinc-500 text-sm font-sans">
          Page <span className="text-amber-400 font-bold text-lg">{index}</span>
        </span>
      </header>

      <main className="px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {userdata.map((elem, idx) => (
              <Card key={idx} elem={elem} idx={idx} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-800 px-8 py-6 flex justify-center items-center gap-6">
        <Prev_button
          index={index}
          setIndex={setIndex}
          setuserData={setuserData}
        />
        <div className="flex items-center gap-1">
          {[-1, 0, 1].map((offset) => {
            const pg = index + offset;
            if (pg < 1) return null;
            return (
              <button
                key={pg}
                onClick={() => {
                  if (pg !== index) {
                    setuserData([]);
                    setIndex(pg);
                  }
                }}
                className={`w-8 h-8 rounded-lg text-sm font-sans font-semibold transition-all duration-200
                  ${
                    pg === index
                      ? "bg-amber-400 text-black"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
              >
                {pg}
              </button>
            );
          })}
        </div>
        <Next_button
          index={index}
          setIndex={setIndex}
          setuserData={setuserData}
        />
      </footer>
    </div>
  );
};

export default App;
