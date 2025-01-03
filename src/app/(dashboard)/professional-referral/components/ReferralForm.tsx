"use client";
import { useState } from "react";
import { post } from "@/utils/axios";
import toast from "react-hot-toast";
import endpoints from "@/utils/endpoints";
import { FaShareAlt } from "react-icons/fa";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    comment: "",
  });

  const [formErrors, setFormErrors] = useState<{
    email: string;
    comment: string;
  }>({
    email: "",
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
    const errors: { email: string; comment: string } = {
      email: "",
      comment: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Referral email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    if (!formData.comment.trim()) {
      errors.comment = "Comment is required.";
    }

    setFormErrors(errors);
    return !errors.email && !errors.comment;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return; // Prevent form submission if validation fails
    }

    const toastId = toast.loading("Submitting your referral..."); // Show loading toast

    try {
      const response = await post(endpoints.POST_REFERAL_DATA, formData);
      if (response.data.success) {
        toast.success(
          response.data.message || "Referral created successfully!",
          { id: toastId } // Update toast
        );
        setFormData({ email: "", comment: "" });
        setFormErrors({ email: "", comment: "" });
      } else {
        toast.error(response.data.message || "Failed to create referral.", {
          id: toastId, // Update toast
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred while submitting.",
        { id: toastId } // Update toast
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-[660px] mb-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Provide the professional referral</h3>
          <div>
            <label htmlFor="email" className="text-[#7c7c7c]">
              Referral Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="ex: referal@domain.com"
              value={formData.email}
              onChange={handleInputChange}
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
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
              placeholder="type Comment"
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
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8 flex items-center justify-center gap-2"
          >
            <FaShareAlt className="text-lg" />
            <span>Share</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralForm;
