import React, {KeyboardEvent, useContext, useState} from 'react';
import Ticket from "../Ticket/Ticket";
import {StoreContext} from "../../App";
import {ColumnType} from "../../types";
import s from "./Column.module.scss";

type Props = {
  type: ColumnType;
}

const titles = {
  backlog: 'Backlog',
  ready: 'Ready',
  progress: 'In Progress',
  finished: 'Finished'
}

function Column({type}: Props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const {tickets, setTickets} = useContext(StoreContext);

  function renderInput() {
    if (type === 'backlog') {
      return (
        <input
          className={s.input}
          type='text'
          placeholder='Enter new title'
          onKeyDown={handleInput}
        />
      );
    }

    return (
      <select>
        {tickets
          .filter(ticket => {
            switch (type) {
              case "ready": return ticket.type === 'backlog';
              case "progress": return ticket.type === 'ready';
              case "finished": return ticket.type === 'progress';
            }
          })
          .map(ticket => <option>{ticket.title}</option>)
        }
      </select>
    )
  }

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setTickets([
        ...tickets,
        {
          title: e.currentTarget.value,
          type: 'backlog',
          description: 'Some dummy static escription that\'s being created for any new ticket'
        }
      ]);

      setIsInputActive(false);
    }
  }


  return (
    <div className={s.root}>
      <h4 className={s.title}>{titles[type]}</h4>
      <div>
        {tickets
          .filter(ticket => ticket.type === type)
          .map(ticket => <Ticket title={ticket.title} description={ticket.description} type={type}/>
          )}
      </div>
      {!isInputActive && (
        <button className={s.button} onClick={() => setIsInputActive(true)}>
          + Add issue
        </button>
      )}
      {isInputActive && renderInput()}
    </div>
  )
}

export default Column;