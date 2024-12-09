"use client";
import CenterImageModal from "@/components/UI/CenterImageModal";
import React, { useState } from "react";

const ReferralForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handelSubmit = (e: any) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <div>
      <form onSubmit={handelSubmit} className=" max-w-[660px] mb-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold ">
            {" "}
            Provide the professional referral
          </h3>
          <div className="">
            <label htmlFor="reflink" className="text-[#7c7c7c] ">
              Referral link
            </label>
            <input
              type="text"
              name="reflink"
              id="reflink"
              className="peer p-5 text-xl mt-1  block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c]  focus:outline-none  border "
            />
          </div>

          <div className="">
            <label htmlFor="comment" className="text-[#7c7c7c]">
              Comment
            </label>
            <input
              type="text"
              name="comment"
              id="comment"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c]  rounded-lg  placeholder-[#7c7c7c]  focus:outline-none   border  "
            />
          </div>

          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update acccount
          </button>
        </div>
      </form>

      <CenterImageModal
        title="Update Successfully"
        description="Your account has been updated."
        isOpen={modalOpen}
        image="/tick.svg"
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ReferralForm;
