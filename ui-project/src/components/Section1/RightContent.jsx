import React from 'react'
import RightCard from './RightCard'
import { MoveRight } from 'lucide-react'

const RightContent = (props) => {
  return (
    <div id="right-content" className='h-full  w-2/3 flex flex-nowrap overflow-x-auto gap-2'>
      {props.card_details.map(function (card_details, idx) {
        return (
            <RightCard key={idx} id={idx} card_details={card_details} />
        );
      })}
    </div>
  )
}

export default RightContent
