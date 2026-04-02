import { useState } from 'react';

const SaveBtn = () => {
  const [isSaved, setIsSaved] = useState(false);

  const ClickSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div>
      <button
        onClick={ClickSave}
        className={`py-3 px-4 flex items-center gap-2 cursor-pointer rounded-xl transition-colors ${
          isSaved
            ? 'bg-red-100 hover:bg-red-200 text-red-600'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <img
          className="size-4"
          src={
            isSaved
              ? 'https://www.svgrepo.com/show/535436/heart.svg'
              : 'https://www.svgrepo.com/show/447850/wishlist.svg'
          }
          alt="Wishlist"
        />
        {isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default SaveBtn;
