import React from 'react'
import SupportForm from './components/SupportForm'
import SupportCard from './components/SupportCard'

const SupportPage = () => {
  return (
    <div className='flex md:flex-row flex-col gap-x-3 justify-between'>
    <SupportForm />
    <SupportCard/>
    </div>
  )
}

export default SupportPage
