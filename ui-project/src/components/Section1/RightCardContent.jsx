import React from 'react'
import { MoveRight } from 'lucide-react'

const RightCardContent = (props) => {
  return (
    <div>
      <div className="absolute top-0 left-0 h-full w-full bg-black/30 p-6 flex flex-col justify-between gap-4">
        <h2 className="text-black w-6 h-6 bg-white font-bold rounded-full flex items-center justify-center">
          {props.id + 1}
        </h2>
        <div>
          <p className="text-white mb-10 tracking-wider">
            {props.card_details.cardDescription}
          </p>
          <div className="flex items-center justify-between gap-6 cursor-pointer">
            <button style={{backgroundColor:props.card_details.btn_color}} className="text-white cursor-pointer font-medium rounded-full px-4 py-1">
              {props.card_details.buttonName}
            </button>
            <button style={{backgroundColor:props.card_details.btn_color}} className="cursor-pointer font-bold rounded-full px-2 py-1 flex items-center justify-center">
              <MoveRight className="text-white" size={24}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightCardContent
