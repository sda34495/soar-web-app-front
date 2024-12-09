"use client";
import React, { useState } from "react";

const tableData = [
  {
    id: 1,
    name: "Chance Levin",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Angel Westervelt",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Roger Franci",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Roger Franci",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 5,
    name: "Lydia Lipshutz",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 6,
    name: "Jaydon Calzoni",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 7,
    name: "Marley Westervelt",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 8,
    name: "Abram Botosh",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 9,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Makenna Carder",
    email: "chancelevin@gmail.com",
    points: "2,424,355",
    avatar: "https://via.placeholder.com/40",
  },
];
const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const paginatedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md overflow-hidden overflow-x-auto">
      <div className="bg-[#121212] text-white rounded-t-2xl px-2 py-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="text-[#7C7C7C]">
              <th className="p-3">Sr,</th>
              <th className="p-3">User name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Points</th>
              
            </tr>
            <tr className="border-t border-gray-700 h transition-all"></tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-800 transition-all">
                <td className="p-3">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{entry.name}</span>
                </td>
                <td className="p-3">{entry.email}</td>
                <td className="p-3">{entry.points}</td>
                <td className="px-4 py-2 space-x-2 flex gap-2">
                  <button className="text-red-500 hover:underline">
                    <img src="/delete.svg" alt="delete icon" />
                  </button>
                  <button className="text-blue-500 hover:underline">
                    <img src="/eye.svg" alt="eye icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between rounded-b-2xl items-center bg-[#121212] p-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className=" bg-custom-gradient hover:bg-custom-gradient-hover text-sm text-black font-bold rounded-md p-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className=" bg-custom-gradient hover:bg-custom-gradient-hover text-sm text-black font-bold rounded-md p-2 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
