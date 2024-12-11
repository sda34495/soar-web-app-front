'use client'
import CheckinCard from '@/components/UI/CheckInCard'
import FitnessCard from '@/components/UI/FitnessCard'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {endLoadingAction} from '@/store/loader-slice'
import FinanceCard from '@/components/UI/FinanceCard';
import Sobriety from '@/components/UI/Sobriety';
import CenterImageModal from '@/components/UI/CenterImageModal';


const leaderboardData = [
  {
    position: "1st",
    username: "marshmellow",
    points: 1280,
    league: "1988 / 2000",
    competition: "89 / 100",
    avatar: "/avatar.jpeg",
    color: "linear-gradient(135deg, #043927, #055532)",
  },
  {
    position: "2nd",
    username: "oliviarhye",
    points: 1260,
    league: "1988 / 2000",
    competition: "89 / 100",
    avatar: "/avatar.jpeg",
    color: "linear-gradient(135deg, #4E342E, #6D4C41)",
  },
  {
    position: "3rd",
    username: "marshmellow",
    points: 1240,
    league: "1988 / 2000",
    competition: "89 / 100",
    avatar: "/avatar.jpeg",
    color: "linear-gradient(135deg, #1A237E, #3949AB)",
  },
];

const CheckInPage = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCheckIn, setRefreshCheckIn] = useState(false); // Track refresh state
  const [modalTitle, setModalTitle] = useState('')

  const updateModalTitle = (value:any)=>{
    setModalTitle(value)
    console.log(value)
  }
  
  useEffect(() => {
    
    dispatch(endLoadingAction.endLoading(100))
  }, [dispatch])


  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setRefreshCheckIn(prev => !prev);
  };






  return (
    <div className='space-y-6 '>
       <CheckinCard key={refreshCheckIn ? 1: 0}/>
   
        <FitnessCard percentage={80} 
        setIsModalOpen={setIsModalOpen} 
        updateModalTitle={updateModalTitle}
         />


        <FinanceCard  percentage={50}
        setIsModalOpen={setIsModalOpen} 
        updateModalTitle={updateModalTitle}

        />
        <Sobriety  percentage={30}
        setIsModalOpen={setIsModalOpen} 
        updateModalTitle={updateModalTitle}

        />


        {isModalOpen && (
        <CenterImageModal
          title={modalTitle}
          description=""
          isOpen={isModalOpen}
          image="/icon_success.png"
          onClose={handleModalClose}
        />
      )}
      
    </div>
  )
}

export default CheckInPage
