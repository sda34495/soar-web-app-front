'use client'
import React from 'react'
import SupportForm from './components/SupportForm'
import SupportCard from './components/SupportCard'
import useSidebarLoading from '@/Hook/SidebarLoading';

const SupportPage = () => {
  useSidebarLoading();
  return (
    <div className='flex md:flex-row flex-col gap-x-3 justify-between'>
    <SupportForm />
    <SupportCard/>
    </div>
  )
}

export default SupportPage
