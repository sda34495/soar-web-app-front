'use client'
import TalkToDoc from '@/components/TalkToDoc'
import useSidebarLoading from '@/Hook/useSidebarLoading';
import React from 'react'

function DoctorPage() {
  useSidebarLoading();
  return (
    <TalkToDoc/>
  )
}

export default DoctorPage