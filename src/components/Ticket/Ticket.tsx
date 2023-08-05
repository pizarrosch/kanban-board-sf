import React from "react";
import s from './Ticket.module.scss';
import {TicketType} from "../../types";

function Ticket({title}: TicketType) {
  return (
    <div className={s.root}>
      {title}
    </div>
  )
}

export default Ticket;