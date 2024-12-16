'use client'
import BookingCard from '@/components/BookingCard'
import useSidebarLoading from '@/Hook/SidebarLoading';
import React from 'react'

const CoachingPage = () => {
  useSidebarLoading();
  return (
    <BookingCard />
  )
}

export default CoachingPage
