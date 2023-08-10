import React, {useContext, useState} from 'react';
import s from './Footer.module.scss';
import {StoreContext} from "../../App";
import {type} from "@testing-library/user-event/dist/type";
import {ColumnType, TicketType} from "../../types";

type Props = {
  type: ColumnType;
  backlogTaskNumber: number;
  finishedTaskNumber: number
}

function Footer({backlogTaskNumber, type, finishedTaskNumber}: Props) {

    return (
        <div className={s.root}>
            <div className={s.tasksCounter}>
                <span>Active tasks: {backlogTaskNumber}</span>
                <span>Finished tasks: {finishedTaskNumber}</span>
            </div>
            <span className={s.accountHolder}>Kanban board by Name Surname</span>
        </div>
    )
}

export default Footer;