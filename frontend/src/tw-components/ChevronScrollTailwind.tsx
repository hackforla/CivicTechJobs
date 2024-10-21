import React from "react";

const ChevronScroll = () => {
  return (
    <div className="whitespace-nowrap flex w-[1088px] h-[47px]">
      <div className="scroll-snap-x mandatory overflow-auto flex items-center gap-4 scrollbar-none">
        {/* Chevron Scroll Left Button */}
        <button
          className="bg-white px-8 py-0 cursor-pointer border-none"
          aria-label="Scroll Left"
        >
          {/* Insert left chevron icon here */}
        </button>

        {/* Scrollable Content */}
        <div className="flex-1">Scrollable content goes here</div>

        {/* Chevron Scroll Right Button */}
        <button
          className="bg-white px-8 py-0 cursor-pointer border-none"
          aria-label="Scroll Right"
        >
          {/* Insert right chevron icon here */}
        </button>
      </div>

      {/* Clear Button */}
      <button className="flex items-center underline font-bold text-lg text-gray-700 ml-4 bg-transparent p-0 border-none cursor-pointer">
        Clear
      </button>
    </div>
  );
};

export default ChevronScroll;
