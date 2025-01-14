'use client'
import React from 'react'
import AddCoupon from './components/AddCoupon'
import useSidebarLoading from '@/Hook/useSidebarLoading';

function CouponPage() {
  useSidebarLoading();
  return (
    <AddCoupon/>
  )
}

export default CouponPage