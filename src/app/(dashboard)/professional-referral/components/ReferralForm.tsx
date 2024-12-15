"use client";
import CenterImageModal from "@/components/UI/CenterImageModal";
import React, { useState } from "react";
import { post } from "@/utils/axios"; // Adjust the path based on your project structure
import toast from "react-hot-toast";
import endpoints from "@/utils/endpoints";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    referal_link: "",
    comment: "",
  });

  const [formErrors, setFormErrors] = useState<{ referal_link: string; comment: string }>({
    referal_link: "",
    comment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors for the specific field on input change
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const errors: { referal_link: string; comment: string } = {
      referal_link: "",
      comment: "",
    };

    if (!formData.referal_link.trim()) {
      errors.referal_link = "Referral link is required.";
    }
    if (!formData.comment.trim()) {
      errors.comment = "Comment is required.";
    }

    setFormErrors(errors);
    return !errors.referal_link && !errors.comment;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await post(endpoints.POST_REFERAL_DATA, formData);
      if (response.data.success) {
        toast.success(response.data.message || "Referral created successfully!");
        setTimeout(() => {
          setFormData({ referal_link: "", comment: "" });
          setFormErrors({ referal_link: "", comment: "" });
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
    <div>
      <form onSubmit={handleSubmit} className="max-w-[660px] mb-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">
            Provide the professional referral
          </h3>
          <div>
            <label htmlFor="referal_link" className="text-[#7c7c7c]">
              Referral link
            </label>
            <input
              type="text"
              name="referal_link"
              id="referal_link"
              value={formData.referal_link}
              onChange={handleInputChange}
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.referal_link && (
              <p className="text-red-500 text-sm mt-1">{formErrors.referal_link}</p>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="text-[#7c7c7c]">
              Comment
            </label>
            <input
              type="text"
              name="comment"
              id="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.comment && (
              <p className="text-red-500 text-sm mt-1">{formErrors.comment}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update account
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralForm;
