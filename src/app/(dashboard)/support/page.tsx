import React from 'react'
import SupportForm from './components/SupportForm'
import SupportCard from './components/SupportCard'

const SupportPage = () => {
  return (
    <div className='flex gap-8'>
    <SupportForm />
    <SupportCard/>
    </div>
  )
}

export default SupportPage
