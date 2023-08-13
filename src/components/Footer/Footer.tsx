import React, {Dispatch, SetStateAction, useEffect} from 'react';
import s from './Footer.module.scss';
import {ColumnType} from "../../types";

type Props = {
  type: ColumnType;
  backlogTaskNumber: number;
  finishedTaskNumber: number;
}

function Footer({type, finishedTaskNumber, backlogTaskNumber}: Props) {

  // useEffect(() => {
  //   const backlogCounter = JSON.parse(localStorage.getItem('ticketsCounter') as string);
  //   const finishedCounter = JSON.parse(localStorage.getItem('finishedTicketsCounter') as string);
  //
  //   switch (type) {
  //     case "backlog": setBacklogTaskNumber(backlogCounter.length);
  //     case "finished": setFinishedTaskNumber(finishedCounter.length);
  //   }
  // }, [finishedTaskNumber, backlogTaskNumber]);

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