import React from "react";
import s from './Ticket.module.scss';
import {TicketType} from "../../types";
import {Link} from "react-router-dom";

function Ticket({title, id}: TicketType) {

  return (
    <Link to={`/ticket/${id}`} className={s.linkStyle}>
      <div className={s.root} key={id}>
        {title}
      </div>
    </Link>
  )
}

export default Ticket;