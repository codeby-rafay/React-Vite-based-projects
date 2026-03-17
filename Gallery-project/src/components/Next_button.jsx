const Next_button = ({ index, setIndex, setuserData }) => {
  return (
    <button
      onClick={() => {
        setuserData([]);
        setIndex(index + 1);
      }}
      className="flex items-center gap-2 px-5 py-2 rounded-xl font-sans font-semibold text-sm
        bg-amber-400 text-black hover:bg-amber-300 transition-all duration-200
        active:scale-95 cursor-pointer"
    >
      Next →
    </button>
  );
};

export default Next_button;
