import React, {FormEvent, useEffect, useRef, useState} from "react";
import s from './Ticket.module.scss';
import Column from "../Column/Column";
import {TicketType} from "../../types";

function Ticket({description, status, title}: TicketType) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isSelectActive, setIsSelectActive] = useState(false);

  // Move up
  // const [readyTasks, setReadyTasks] = useState<Array<string>>([]);
  // const [inProgressTasks, setInProgressTasks] = useState<Array<string>>([]);
  // const [finishedTasks, setFinishedTasks] = useState<Array<string>>([]);
  // const [backlogTasks, setBacklogTasks] = useState<Array<string>>([]);

  const ref = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //     localStorage.setItem('backlogTasks', JSON.stringify(backlogTasks));
  // }, [backlogTasks])

  return (
    <div>
      <div className={s.root}>
        {backlogTasks && backlogTasks.map((task) => <Column value={task}/>)}
        {isInputActive &&
          <form onSubmit={handleSubmit}>
            <input type='text' className={s.input} ref={ref}/>
          </form>
        }
        {cardName === 'Backlog' &&
          <span className={s.addCard} onClick={clickButton}>{isInputActive ? 'Submit' : '+Add card'}</span>}
        {cardName === 'Ready' && (isSelectActive ?
          <select onClick={(e) => chooseTask}>{backlogTasks.map(backlogTask => {
            console.log(backlogTask);
            return <option>{backlogTask}</option>
          })}</select> : <span className={s.addCard} onClick={showSelect}>+Add card</span>)}
        {cardName === 'In Progress' && (isSelectActive ?
          <select>{readyTasks && readyTasks.map(readyTask => <option>{readyTask}</option>)}</select> :
          <span className={s.addCard} onClick={showSelect}>+Add card</span>)}
        {cardName === 'Finished' && (isSelectActive ? <select>{inProgressTasks && inProgressTasks.map(inProgressTask =>
            <option>{inProgressTask}</option>)}</select> :
          <span className={s.addCard} onClick={showSelect}>+Add card</span>)}
      </div>
    </div>
  )
}

export default Ticket;