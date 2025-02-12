"use client";
import React, { useState } from "react";
import CenterImageModal from "@/components/UI/CenterImageModal";
import { post } from "@/utils/axios"; // Ensure you have a utility for making POST requests
import toast from "react-hot-toast";
import endpoints from "@/utils/endpoints";

type Errors = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const PasswordSecurity = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await post(endpoints.UPDATE_PASSWORD, {
        old_password: oldPassword,
        new_password: newPassword,
      });

      toast.success("Password updated successfully!");
      setModalOpen(true);
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
          <div>
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

          <div className="relative">
  <label htmlFor="newpassword" className="text-[#7c7c7c]">
    New Password
  </label>
  <div className="flex items-center mt-1">
    <input
      type={newPasswordVisible ? "text" : "password"}
      name="newpassword"
      id="newpassword"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      className="peer p-5 text-xl block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
    />
    <button
      type="button"
      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
      className=" absolute right-0 mr-4"
    >
      {newPasswordVisible ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-[#7c7c7c]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-[#7c7c7c]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      )}
    </button>
  </div>
  {errors.newPassword && (
    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
  )}
</div>


<div className="relative">
  <label htmlFor="confirmpassword" className="text-[#7c7c7c]">
    Confirm Password
  </label>
  <div className="flex items-center mt-1">
    <input
      type={confirmPasswordVisible ? "text" : "password"}
      name="confirmpassword"
      id="confirmpassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="peer p-5 text-xl block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
    />
    <button
      type="button"
      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
      className="absolute right-0 mr-4"
    >
      {confirmPasswordVisible ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-[#7c7c7c]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-[#7c7c7c]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      )}
    </button>
  </div>
  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
  )}
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
