"use client";
import React, { useState } from "react";
import CenterImageModal from "@/components/UI/CenterImageModal";
import { postData } from "@/utils/axios"; // Ensure you have a utility for making POST requests
import toast from "react-hot-toast";

const PasswordSecurity = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      // Send data to the API
      await postData("profile/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      });

      // Display success message
      toast.success("Password updated successfully!");
      setModalOpen(true);

      // Clear the form fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update password. Please try again."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-[660px] mb-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Update Password</h3>
          <div className="">
            <label htmlFor="oldpassword" className="text-[#7c7c7c]">
              Current Password
            </label>
            <input
              type="password"
              name="oldpassword"
              id="oldpassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          <div className="">
            <label htmlFor="newpassword" className="text-[#7c7c7c]">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          <div className="">
            <label htmlFor="confirmpassword" className="text-[#7c7c7c]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>
          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update Password
          </button>
        </div>
      </form>

      <CenterImageModal
        title="Update Successfully"
        description="Your password has been updated successfully."
        isOpen={modalOpen}
        image="/tick.svg"
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default PasswordSecurity;