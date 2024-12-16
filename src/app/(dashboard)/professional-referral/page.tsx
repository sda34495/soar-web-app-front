'use client'
import React from 'react'
import ReferralForm from './components/ReferralForm'
import useSidebarLoading from '@/Hook/SidebarLoading';

const ProfessionalReferralPage = () => {
  useSidebarLoading();
  return (
    <div>
    
      <ReferralForm/>
    </div>
  )
}

export default ProfessionalReferralPage
