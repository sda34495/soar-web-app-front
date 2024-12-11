"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProfileData,
  postImage,
  updateProfile,
  deleteImage,
} from "@/utils/axios";

interface UserProfile {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_url: string;
}

const GeneralProfile = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("/avatar.jpeg");

  const [formData, setFormData] = useState<UserProfile>({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Authentication error. Please login.");
          return;
        }

        const response = await getProfileData(token);

        if (response && response.data) {
          setFormData({
            user_name: response.data.user_name || "",
            first_name: response.data.first_name || "",
            last_name: response.data.last_name || "",
            email: response.data.email || "",
            profile_url: response.data.profile_url || "/avatar.jpeg",
          });
          setImageUrl(response.data.profile_url || "/avatar.jpeg");
        } else {
          toast.error("Failed to load user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("An error occurred while fetching user data.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload and submit automatically
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedImage = e.target.files[0];
      setImage(uploadedImage);
      setImageUrl(URL.createObjectURL(uploadedImage));

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Authentication error. Please login.");
          return;
        }

        const formData = new FormData();
        formData.append("profile_image", uploadedImage);

        const response = await postImage(token, formData);
        if (response?.status === 200) {
          setImageUrl(response.data.profile_image); // Update with server URL
          toast.success("Profile image updated successfully!");
        } else {
          toast.error("Failed to upload profile image.");
        }
      } catch (err) {
        console.error("Error uploading image:", err);
        toast.error("An error occurred while uploading the image.");
      }
    }
  };

  // Handle delete image
  const handleDeleteImage = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication error. Please login.");
        return;
      }

      const response = await deleteImage(token);
      if (response?.status === 200) {
        setImageUrl("/avatar.jpeg"); // Reset to default image
        toast.success("Profile image deleted successfully!");
      } else {
        toast.error("Failed to delete profile image.");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      toast.error("An error occurred while deleting the image.");
    }
  };

  const handleProfileDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication error. Please login.");
        return;
      }

      const response = await updateProfile(token, formData);
      if (response?.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile data:", err);
      toast.error("An error occurred while updating profile data.");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-start space-x-4 mb-6">
        <div className="flex flex-col mr-7">
          <p className="text-lg text-[#7c7c7c]">Change picture</p>
          <img
            src={imageUrl}
            alt="profile image"
            className="h-36 w-36 rounded-full mt-2"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
        </div>
        <button
          type="button"
          onClick={() => document.getElementById("image-upload")?.click()}
          className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
        >
          Change image
        </button>
        <button
          type="button"
          onClick={handleDeleteImage}
          className="w-[220px] border-2 text-xl border-[#7c7c7c] text-[#F8F8F8] font-medium rounded-full p-3 mt-8"
        >
          Delete image
        </button>
      </div>

      <form className="max-w-[660px]" onSubmit={handleProfileDataSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mt-2">Account settings</h3>

          <div>
            <label htmlFor="user_name" className="text-[#7c7c7c]">
              User name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="username"
              id="user_name"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-xl placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="firstname" className="text-[#7c7c7c]">
                First name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First name"
                id="firstname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-xl placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="text-[#7c7c7c]">
                Last name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last name"
                id="lastname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-xl placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-[#7c7c7c]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              onChange={handleChange}
              placeholder="Email"
              id="email"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-xl placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralProfile;
