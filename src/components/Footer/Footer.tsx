import React, {useContext} from 'react';
import s from './Footer.module.scss';
import {StoreContext} from "../../App";
import {type} from "@testing-library/user-event/dist/type";
import {ColumnType, TicketType} from "../../types";

type Props = {
  type: ColumnType;
  tickets: Array<TicketType>
}

function Footer({type, tickets}: Props) {

   const backlogTickets = tickets.map(ticket => type === 'backlog' && ticket);

    return (
        <div className={s.root}>
            <div className={s.tasksCounter}>
                <span>Active tasks: {backlogTickets ? backlogTickets.length : 0}</span>
                <span>Finished tasks: {type === 'progress' ? tickets.length : 0}</span>
            </div>
            <span className={s.accountHolder}>Kanban board by Name Surname</span>
        </div>
    )
}

export default Footer;