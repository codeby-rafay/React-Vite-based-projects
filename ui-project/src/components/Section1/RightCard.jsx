import React from "react";
import { MoveRight } from "lucide-react";
import RightCardContent from "./RightCardContent";

const RightCard = (props) => {
  return (
    <div className="h-full w-64 overflow-hidden shrink-0 relative rounded-4xl">
      <img
        className="h-full w-full object-cover"
        src={props.card_details.cardLogo}
        alt="Picture"
      />
      <RightCardContent card_details={props.card_details} id={props.id} />
    </div>
  );
};

export default RightCard;
