import React from 'react';
import s from './Footer.module.scss';
import {ColumnType} from "../../types";

type Props = {
  type: ColumnType;
  backlogTaskNumber: number;
  finishedTaskNumber: number;
  userName: string | null;
}

function Footer({finishedTaskNumber, backlogTaskNumber, userName}: Props) {

  return (
    <div className={s.root}>
      <div className={s.tasksCounter}>
        <span>Active tasks: {backlogTaskNumber}</span>
        <span>Finished tasks: {finishedTaskNumber}</span>
      </div>
      <span className={s.accountHolder}>{userName ? `Kanban board by ${userName}` : 'Kanban board by username'}</span>
    </div>
  )
}

export default Footer;