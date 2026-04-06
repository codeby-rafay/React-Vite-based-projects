import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { useState } from "react";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };
  return (
    <form onSubmit={addTodoHandler} className="flex gap-3">
      <input
        type="text"
        className="flex-1 bg-slate-700 border-2 border-slate-600 hover:border-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-30 text-base outline-none text-gray-100 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out placeholder-gray-400"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={input.trim() === ""}
        className="text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed border-0 py-3 px-8 focus:outline-none rounded-lg text-base font-semibold transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add
      </button>
    </form>
  );
};

export default AddTodo;
