import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = (props) => {
  return (
    <div className='h-[90vh] py-15 px-18 flex items-center gap-10'>
      <LeftContent />
      <RightContent card_details={props.card_details} />
    </div>
  )
}

export default Page1Content
