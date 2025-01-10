"use client";
import React, { useEffect, useState } from "react";
import { getData, post } from "@/utils/axios";
import CenterImageModal from "@/components/UI/DeleteModal";
import Link from "next/link";

const UserTable = ({ activeTab }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const rowsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    console.log(activeTab);
    try {
      const response = await getData(`admin/users?type=${activeTab}`); // Adjust endpoint as needed
      if (response.data && response.data.success) {
        setUsers(response.data.data);
        console.log(response?.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await post("admin/delete-user", {
        user_id: selectedUser._id,
      });
      if (response.data && response.data.success) {
        fetchUsers();
      } else {
        throw new Error(response.data.message || "Failed to delete user");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setModalOpen(false);
      setSelectedUser(null);
    }
  };

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
          <thead>
            <tr className="text-[#7C7C7C]">
              <th className="p-3">Sr,</th>
              <th className="p-3">User name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Points</th>
              <th className="p-3">Actions</th>
            </tr>
            <tr className="border-t border-gray-700 h transition-all"></tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-800 transition-all">
                <td className="p-3">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={user.profile_url || "/avatar.jpeg"}
                    alt={user.first_name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{`${user.first_name} ${user.last_name || ""}`}</span>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.total_points}</td>
                <td className="px-4 py-2 space-x-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    <img src="/delete.svg" alt="delete icon" />
                  </button>
                  <Link href={`/admin/users/details/${user._id}`}>
                    <button className="text-blue-500 hover:underline">
                      <img src="/eye.svg" alt="eye icon" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

      <CenterImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        image="/delete.png"
        title="Want to Delete?"
        description="Are you sure you want to delete this user from your database this will be deleted permanently?"
      >
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setModalOpen(false)}
            className="px-24 py-4 border-[#7c7c7c] text-white border font-semibold hover:bg-custom-gradient-hover rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-24 py-4 text-white bg-[#D92D20] rounded-full font-semibold"
          >
            Delete
          </button>
        </div>
      </CenterImageModal>
    </div>
  );
};

export default UserTable;
