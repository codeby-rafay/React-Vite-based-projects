import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const copyTask = [...task];
    copyTask.push({ title, details });
    setTask(copyTask);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (index) => {
    const copyTask = [...task];
    copyTask.splice(index, 1);
    setTask(copyTask);
  };

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="p-10 flex flex-col gap-5 lg:w-1/2"
      >
        <h1 className="text-2xl font-bold">Add Note</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Note Headline"
            className="px-5 py-2 h-15 w-full rounded-2xl border-2 border-white text-2xl"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            type="text"
            placeholder="Enter a note"
            className="px-5 py-2 h-40 w-full rounded-2xl border-2 border-white text-2xl"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />

          <button className="cursor-pointer w-full bg-white text-black px-5 py-2 rounded-2xl active:scale-95">
            Add Note
          </button>
        </div>
      </form>

      <div className="lg:w-1/2 p-10 lg:border-l-2">
        <h1 className="text-2xl font-bold">Recent Notes</h1>
        <div className="flex flex-wrap items-start justify-start h-[90%] gap-3 mt-3 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {task.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-between relative min-h-60 w-40 bg-cover rounded-2xl py-10 pb-4 px-4 text-black bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] "
              >
                <div>
                  <h3 className="text-xl font-bold leading-tight wrap-break-word">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-tight text-gray-600">
                    {item.details}
                  </p>
                </div>
                <button onClick={() => {
                  deleteNote(index);
                }} className="w-full bg-red-500 rounded-2xl font-bold text-xs py-1 text-white cursor-pointer active:scale-95">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
