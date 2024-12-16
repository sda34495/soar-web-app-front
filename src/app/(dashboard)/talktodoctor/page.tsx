'use client'
import TalkToDoc from '@/components/TalkToDoc'
import useSidebarLoading from '@/Hook/SidebarLoading';
import React from 'react'

function page() {
  useSidebarLoading();
  return (
    <TalkToDoc/>
  )
}

export default page