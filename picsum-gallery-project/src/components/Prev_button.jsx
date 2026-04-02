const Prev_button = ({ index, setIndex, setuserData }) => {
  const disabled = index <= 1;
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          setuserData([]);
          setIndex(index - 1);
        }
      }}
      className={`flex items-center gap-2 px-5 py-2 rounded-xl font-sans font-semibold text-sm
        border transition-all duration-200 active:scale-95
        ${
          disabled
            ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
            : "border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black cursor-pointer"
        }`}
    >
      ← Prev
    </button>
  );
};

export default Prev_button;
