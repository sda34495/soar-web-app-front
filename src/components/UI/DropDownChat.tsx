import { useState } from "react";

const DateDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-sm font-medium">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-opacity-70 bg-[#1e1e1e] border-[#7c7c7c] rounded-lg border text-[#BDBDBD] focus:outline-none"
      >
        <span>Oct 01 - 31, 2024</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56  bg-[#1E1E1E] text-[#BDBDBD] border border-[#7C7C7C] rounded-lg shadow-lg">
          <ul>
            <li className="px-4 py-3 hover:bg-[#191919] cursor-pointer rounded-t-lg">
              Custom
            </li>
            <li className="px-4 py-3 hover:bg-[#191919] cursor-pointer">
              Today
            </li>
            <li className="px-4 py-3 hover:bg-[#191919] cursor-pointer">
              Yesterday
            </li>
            <li className="px-4 py-3 hover:bg-[#191919] cursor-pointer">
              This month
            </li>
            <li className="px-4 py-3 bg-[#3a3a3a] hover:bg-[#191919] cursor-pointer rounded-md">
              Last month
            </li>
            <li className="px-4 py-3 hover:bg-[#191919] cursor-pointer rounded-b-lg">
              All time
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateDropdown;
