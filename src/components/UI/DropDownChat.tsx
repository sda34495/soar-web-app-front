"use client";
import { useState, useRef, useEffect } from "react";

const getLastMonthRange = () => {
  const now = new Date();
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  return `${formatDate(firstDayLastMonth)} - ${formatDate(lastDayLastMonth)}`;
};

const DateDropdown = ({ updateFilter }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(getLastMonthRange);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (range: string,filterValuse: string) => {
    setSelectedRange(range); // Update the selected range state

    updateFilter(filterValuse);
    setIsOpen(false); // Close the dropdown
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-sm font-medium"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-opacity-70 bg-[#1e1e1e] border-[#7c7c7c] rounded-lg border text-[#BDBDBD] focus:outline-none"
      >
        <span>{selectedRange}</span>
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
        <div className="absolute right-0 mt-2 w-56 bg-[#1E1E1E] text-[#BDBDBD] border border-[#7C7C7C] rounded-lg shadow-lg">
          <ul>
            {/* <li
              onClick={() => handleSelect("Custom")}
              className="px-4 py-3 hover:bg-[#191919] cursor-pointer rounded-t-lg"
            >
              Custom
            </li> */}
            <li
              onClick={() => handleSelect("Today", "today")}
              className="px-4 py-3 hover:bg-[#191919] cursor-pointer"
            >
              Today
            </li>
            <li
              onClick={() => handleSelect("Yesterday", "yesterday")}
              className="px-4 py-3 hover:bg-[#191919] cursor-pointer"
            >
              Yesterday
            </li>
            <li
              onClick={() => handleSelect("This Month" , "thisMonth")}
              className="px-4 py-3 hover:bg-[#191919] cursor-pointer"
            >
              This month
            </li>
            <li
              onClick={() => handleSelect("LastMonth" , "lastMonth")}
              className="px-4 py-3 bg-[#3a3a3a] hover:bg-[#191919] cursor-pointer rounded-md"
            >
              Last month
            </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateDropdown;
