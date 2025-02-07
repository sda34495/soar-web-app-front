"use client";
import React, { useState } from "react";
import AddCoupon from "./components/AddCoupon";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import UpdateCoupon from "./components/UpdateCoupon";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";

function CouponPage() {
  useSidebarLoading();
  const [coupons, setCoupons] = useState([]);

  // Fetch coupons from API
  const fetchCoupons = async () => {
    try {
      const response = await getData(endpoints.GET_COUPONS);
      if (response.status === 200) {
        const transformedData = response.data.data.map((coupon) => ({
          id: coupon._id,
          name: coupon.code,
          type: coupon.one_time_use ? "One-time Use" : "Multiple Use",
          expiry: new Date(coupon.expiry_date).toLocaleDateString(),
          isActive: coupon.is_active,
        }));
        console.log("Transformed data:", transformedData);
        setCoupons(transformedData);
      }
    } catch (error) {}
  };

  return (
    <div className="">
      <AddCoupon fetchCoupons={fetchCoupons} />
      <UpdateCoupon fetchCoupons={fetchCoupons} coupons={coupons} />
    </div>
  );
}

export default CouponPage;
