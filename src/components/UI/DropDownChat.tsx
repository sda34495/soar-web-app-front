import { useState } from "react";

const DateDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-sm font-medium">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg opacity-70 border-[#7c7c7c] bg-[#1e1e1e] rounded-lg text-white border focus:outline-none "
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
        <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] text-white border border-gray-300 rounded-lg shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Sep 01 - 30, 2024
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Oct 01 - 31, 2024
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Nov 01 - 30, 2024
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateDropdown;
