'use client';
import { post } from '@/utils/axios';
import { Post_Support_Data } from '@/utils/endpoints';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SupportForm = () => {
  // State for the form fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstname, lastname, email, phone, message } = formData;
    if (!firstname.trim()) {
      toast.error("First name is required.");
      return false;
    }
    if (!lastname.trim()) {
      toast.error("Last name is required.");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Valid email is required.");
      return false;
    }
    if (!phone.trim() || !/^\d{10,15}$/.test(phone)) {
      toast.error("Valid phone number is required.");
      return false;
    }
    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await post(Post_Support_Data, formData);
      if (response.data.success) {
        toast.success(response.data.message || "Referral created successfully!");
        setTimeout(() => {
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            message: '',
          });
        }, 500); 
      } else {
        toast.error(response.data.message || "Failed to create referral.");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred while submitting."
      );
    }
  };

  return (
    // <div className='bg-blue-500 '>
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mt-2">Get in touch</h3>

          {/* First and Last Name Fields */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="firstname" className="text-[#7c7c7c]">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname} // Corrected from FormData to formData
                onChange={handleInputChange}
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
                value={formData.lastname} // Corrected from FormData to formData
                onChange={handleInputChange}
                placeholder="Last name"
                id="lastname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
          </div>

          {/* Email and Phone Fields */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="email" className="text-[#7c7c7c]">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email} // Corrected from FormData to formData
                onChange={handleInputChange}
                placeholder="Email address"
                id="email"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="text-[#7c7c7c]">
                Phone
              </label>
              <input
                type="text" // Changed to text to handle formatted numbers (e.g., with dashes)
                name="phone"
                value={formData.phone} // Corrected from FormData to formData
                onChange={handleInputChange}
                placeholder="Phone number"
                id="phone"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="text-[#7c7c7c]">
              Your message
            </label>
            <textarea
              name="message"
              value={formData.message} // Corrected from FormData to formData
              onChange={handleInputChange}
              placeholder="Enter your message here"
              id="message"
              className="peer p-5 h-36 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Submit
          </button>
        </div>
      </form>
    // </div>
  );
};

export default SupportForm;
