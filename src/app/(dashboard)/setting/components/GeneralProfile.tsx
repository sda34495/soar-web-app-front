"use client";
import React, { useState } from "react";

const GeneralProfile = () => {
  // Step 1: Initialize state variables
  const [formData, setFormData] = useState({
    username: "oliviarhye",
    firstname: "Olivia",
    lastname: "Rhye",
    email: "oliviarhye@soar.com",
  });

  // Step 2: Create a change handler for each input field
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Preserve the other values
      [name]: value, // Update the specific field
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Process form data or update profile logic
    console.log("Form submitted:", formData);
    // For example, send the data to an API or update a global state
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-start space-x-4 mb-6">
        <div className="flex flex-col mr-7">
          <p className="text-lg text-[#7c7c7c] ">Change picture</p>
          <img
            src="/avatar.jpeg"
            alt="profile image"
            className="h-36 w-36 rounded-full mt-2"
          />
        </div>
        <button
          type="submit"
          className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
        >
          Change image
        </button>
        <button
          type="submit"
          className="w-[220px] border-2 text-xl border-[#7c7c7c]    text-[#F8F8F8] font-medium rounded-full p-3 mt-8"
        >
          Delete image
        </button>
      </div>

      {/* <form className=" max-w-[660px]">
        <div className="space-y-4">
            <h3 className="text-2xl font-bold "> Account settings</h3>
          <div className="">
            <label htmlFor="username" className="text-[#7c7c7c] ">
              User name
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              className="peer py-3 px-4  mt-1  block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c]  focus:outline-none  border "
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="firstname" className="text-[#7c7c7c]">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                id="firstname"
                className="peer py-3 px-4  mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c]  focus:outline-none  border "
              />{" "}
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="text-[#7c7c7c]">
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                id="lastname"
                className="peer py-3 px-4 mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] focus:outline-none  border "
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="email" className="text-[#7c7c7c]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              id="email"
              className="peer py-3 px-4 mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c]  rounded-lg  placeholder-[#7c7c7c]  focus:outline-none   border  "
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
      
      */}

      <form className="max-w-[660px]" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mt-2">Account settings</h3>

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="text-[#7c7c7c]">
              User name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username} // Bind value to state
              onChange={handleChange} // Handle change
              placeholder="Username"
              id="username"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          {/* First and Last Name Fields */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="firstname" className="text-[#7c7c7c]">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname} // Bind value to state
                onChange={handleChange} // Handle change
                placeholder="First name"
                id="firstname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="text-[#7c7c7c]">
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname} // Bind value to state
                onChange={handleChange} // Handle change
                placeholder="Last name"
                id="lastname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-[#7c7c7c]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email} // Bind value to state
              onChange={handleChange} // Handle change
              placeholder="Email Address"
              id="email"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          {/* Submit Button */}
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
