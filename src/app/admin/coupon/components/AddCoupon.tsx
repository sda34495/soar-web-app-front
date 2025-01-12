"use client";
import React, { useState } from "react";
import { post } from "@/utils/axios"; // Import the post function
import toast from "react-hot-toast";
import endpoints from "@/utils/endpoints";

const AddCoupon: React.FC = () => {
  const [couponCode, setCouponCode] = useState("");
  const [oneTime, setOneTime] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate a random coupon code
  const generateCouponCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setCouponCode(randomCode);
  };

  // Handle Create Coupon
  const handleCreateCoupon = async () => {
    if (!couponCode) {
        toast.error("Please enter or generate a coupon code.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        code: couponCode,
        is_one_time: oneTime,
      };

      const response = await post(endpoints.SET_COUPON_CODE, payload);

      if (response.data.success) {
        toast.success(response.data.message || "Coupon created successfully!");
        setCouponCode(""); // Reset input field
        setOneTime(false); // Reset checkbox
      } else {
        toast.error(response.data.error || "Failed to create the coupon.");
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("An error occurred while creating the coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md max-w-md">
      <div className="bg-[#121212] p-5 rounded-2xl">
        <h2 className="text-lg font-bold text-white">Create Coupon</h2>
        <p className="text-sm text-[#7C7C7C] mt-1">
          Fill out the details below to create a new coupon.
        </p>

        {/* Coupon Code Input */}
        <div className="mt-4">
          <label htmlFor="couponCode" className="text-sm text-[#7C7C7C]">
            Coupon Code:
          </label>
          <div className="flex items-center mt-1 space-x-2">
            <input
              type="text"
              id="couponCode"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter or generate a code"
              className="w-full p-2 bg-[#1a1a1a] text-white rounded-lg border border-gray-600"
            />
            <button
              onClick={generateCouponCode}
              className="py-2 px-4 bg-custom-gradient text-black font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              Generate
            </button>
          </div>
        </div>

        {/* One-Time Use Checkbox */}
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={oneTime}
              onChange={(e) => setOneTime(e.target.checked)}
              className="w-4 h-4 text-[#09DE7A] bg-gray-800 rounded border-gray-600 focus:ring-0"
            />
            <span className="text-sm text-[#7C7C7C]">One-Time Use</span>
          </label>
        </div>

        {/* Create Coupon Button */}
        <button
          onClick={handleCreateCoupon}
          disabled={loading}
          className={`mt-6 w-full py-2 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-[#09DE7A] to-[#34D399] hover:to-[#22C55E]"
          } text-black font-semibold rounded-lg transition-all`}
        >
          {loading ? "Creating..." : "Create Coupon"}
        </button>
      </div>
    </div>
  );
};

export default AddCoupon;
