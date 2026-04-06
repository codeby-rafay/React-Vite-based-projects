import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-purple-300 text-lg">
            Keep track of your daily tasks efficiently
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-purple-500 border-opacity-30">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Add New Task
            </h2>
            <AddTodo />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Tasks
            </h2>
            <Todos />
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Stay organized and productive</p>
        </div>
      </div>
    </div>
  );
};

export default App;
