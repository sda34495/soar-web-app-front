'use client';
import { post } from '@/utils/axios';
import endpoints from '@/utils/endpoints';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const talkToDocForm = () => {
  // State for the form fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });

  // State for form validation errors
  const [formErrors, setFormErrors] = useState({
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
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error for the specific field
    }));
  };

  // Validate form fields
  const validate = () => {
    const errors: { firstname: string; lastname: string; email: string; phone: string; message: string } = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      message: '',
    };

    if (!formData.firstname.trim()) errors.firstname = 'First name is required.';
    if (!formData.lastname.trim()) errors.lastname = 'Last name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{11}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 11 digits.';
    }
    if (!formData.message.trim()) errors.message = 'Message is required.';

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === '');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return; // Prevent submission if validation fails

    try {
      const response = await post(endpoints.POST_SUPPORT_DATA, formData);
      if (response.data.success) {
        toast.success(response.data.message || 'Support request submitted successfully!');
        setTimeout(() => {
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            message: '',
          });
          setFormErrors({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            message: '',
          });
        }, 500);
      } else {
        toast.error(response.data.message || 'Failed to submit support request.');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred while submitting.');
    }
  };

  return (
    <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold mt-2">Connect with a Doctor</h3>

        {/* First and Last Name Fields */}
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="w-full">
            <label htmlFor="firstname" className="text-[#7c7c7c]">
              First name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder="First name"
              id="firstname"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.firstname && (
              <p className="text-red-500 text-sm mt-1">{formErrors.firstname}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="lastname" className="text-[#7c7c7c]">
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="Last name"
              id="lastname"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.lastname && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastname}</p>
            )}
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
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              id="email"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="text-[#7c7c7c]">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              id="phone"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="text-[#7c7c7c]">
            Your message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter your message here"
            id="message"
            className="peer p-5 h-36 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
          />
          {formErrors.message && (
            <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
          )}
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
  );
};

export default talkToDocForm;
