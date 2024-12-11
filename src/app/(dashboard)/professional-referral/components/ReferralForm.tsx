"use client";
import CenterImageModal from "@/components/UI/CenterImageModal";
import React, { useState } from "react";
import { post } from "@/utils/axios"; // Adjust the path based on your project structure
import toast from "react-hot-toast";
import { Post_Referal_Data } from "@/utils/endpoints";

const ReferralForm = () => {
  // const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    referal_link: "",
    comment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await post(Post_Referal_Data, formData);
      if (response.data.success) {
        toast.success(response.data.message || "Referral created successfully!");
        setTimeout(() => {
          
          // setModalOpen(true);
          setFormData({ referal_link: "", comment: "" });
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
          </div>

          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update account
          </button>
        </div>
      </form>

      {/* <CenterImageModal
        title="Update Successfully"
        description="Your account has been updated."
        isOpen={modalOpen}
        image="/tick.svg"
        onClose={() => setModalOpen(false)}
      /> */}
    </div>
  );
};

export default ReferralForm;
