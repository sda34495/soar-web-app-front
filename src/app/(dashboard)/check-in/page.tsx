import CheckinCard from '@/components/UI/CheckInCard'
import FitnessCard from '@/components/UI/FitnessCard'
import React from 'react'

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
  return (
    <div className='space-y-6'>
       <CheckinCard/>
        <FitnessCard percentage={80} />
        <FitnessCard percentage={50} />
        <FitnessCard  percentage={30} />
    </div>
  )
}

export default CheckInPage
