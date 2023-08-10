import React from "react";
import s from './Ticket.module.scss';
import {TicketType} from "../../types";

function Ticket({title, id}: TicketType) {
  return (
    <div className={s.root} key={id}>
      {title}
    </div>
  )
}

export default Ticket;