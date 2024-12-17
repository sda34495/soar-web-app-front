"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getData, postImage } from "@/utils/axios"; // Add postData for updating profile
import endpoints from "@/utils/endpoints";
import { useDispatch } from "react-redux";
import {profileActions} from '@/store/profile-slice'

interface UserProfile {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_url: string;
}

const GeneralProfile = () => {
  const dispatch = useDispatch()
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("/avatar.jpeg");
   const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<UserProfile>({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_url: "",
  });


  const fetchData = async () => {
    try {
     
      const response = await getData(endpoints.GET_PROFILE_DETAILS);
      if (response?.data?.success) {
        const { user_name, first_name, last_name, email, profile_url } = response.data.data;

        setFormData({
          user_name: user_name || "",
          first_name: first_name || "",
          last_name: last_name || "",
          email: email || "",
          profile_url: profile_url || "/avatar.jpeg",
        });

        setImageUrl(profile_url || "/avatar.jpeg");
        dispatch(profileActions.updateNavbar({profile_url: response.data.data?.profile_url }))
        console.log('this is dispatch', response.data.data?.profile_url  )
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
   
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Display the selected image
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDeleteImage = () => {
    setImage(null);
    setImageUrl("/avatar.jpeg"); // Reset to default avatar image
  };

  // Local postData function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("user_name", formData.user_name);
      formDataToSubmit.append("first_name", formData.first_name);
      formDataToSubmit.append("last_name", formData.last_name);
      formDataToSubmit.append("email", formData.email);
      if (image) {
        formDataToSubmit.append("profile_image", image); // Append the image if it was uploaded
      }
      setLoading(true);
      const response = await postImage(endpoints.UPDATE_PROFILE_DATA, formDataToSubmit);
      if (response?.data?.success) {
        fetchData()
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
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
            className="hidden"
            id="image-upload"
            onChange={handleImageUpload}
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

      <form className="max-w-[660px]" onSubmit={handleSubmit}>
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

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
