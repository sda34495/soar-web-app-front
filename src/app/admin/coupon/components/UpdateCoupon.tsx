"use client";
import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import PostModal from "./PostModal";
import toast from "react-hot-toast";

const UpdateCoupon = ({ coupons, fetchCoupons }) => {
  const [loading, setLoading] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteLoading , setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchCoupons();
    setLoading(false);
  }, []);

  const handleTypeChange = async (id, type) => {
    // setCoupons((prev) =>
    //   prev.map((coupon) => (coupon.id === id ? { ...coupon, type } : coupon))
    // );
    try {
      const formData = new FormData();

      formData.append("id", id);
      const response = await post(endpoints.TOGGLE_COUPON, formData);
      console.log(response);
      fetchCoupons();
    } catch {}
  };

  const handleDelete = async (id) => {
    console.log(id + " is deleted");
    // setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
    try {
      const formData = new FormData();

      formData.append("id", id);
      const response = post(endpoints.DELETE_COUPON, formData);
      console.log(response);
      fetchCoupons();
      setDeleteMode(false);
      toast.success("Coupon Deleted Successfully");
    } catch {
      console.log("error to delete the data");
    }
  };

  if (loading) {
    return <div>Loading coupons...</div>;
  }

  return (
    <div className="p-4">
      <table className="max-w-2xl border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-900">
            <th className="border border-gray-700 p-2 text-left">
              Coupon Name
            </th>
            <th className="border border-gray-700 p-2 text-left">Type</th>
            <th className="border border-gray-700 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="border border-gray-700 p-2">{coupon.name}</td>
              <td className="border border-gray-700 p-2">
                <select
                  className="border bg-black border-gray-700 rounded p-1"
                  value={coupon.type}
                  onChange={(e) => handleTypeChange(coupon.id, e.target.value)}
                >
                  <option value="One-time Use">One-time Use</option>
                  <option value="Multiple Use">Multiple Use</option>
                </select>
              </td>

              <td className="border border-gray-700 p-2">
                <button
                  onClick={() => setDeleteMode(true)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
                <PostModal
                  isOpen={deleteMode}
                  title="Delete Coupon"
                  description="Are you sure you want to delete this coupon?"
                >
                  <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      className="px-10 w-full py-1 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
                      onClick={() => setDeleteMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-10 w-full py-3 text-black bg-red-600 hover:bg-red-800 rounded-full font-semibold"
                      onClick={() => handleDelete(coupon.id)}
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </PostModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateCoupon;
