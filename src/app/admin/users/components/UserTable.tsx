"use client";
import { getData } from "@/utils/axios";
import React, { useEffect, useState } from "react";


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const rowsPerPage = 10;

  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getData("/admin/users"); // Adjust endpoint as needed
        if (response.data && response.data.success) {
          setUsers(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch users");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  const totalPages = Math.ceil(users.length / rowsPerPage);

  const paginatedData = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            {paginatedData.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-800 transition-all">
                <td className="p-3">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={user.profile_url || '/avatar.jpeg'}
                    alt={user.first_name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{`${user.first_name} ${user.last_name || ""}`}</span>
                  </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.total_points}</td>
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
          className=" bg-custom-gradient hover:bg-custom-gradient-hover text-sm text-black font-bold rounded-md py-2 px-4 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
