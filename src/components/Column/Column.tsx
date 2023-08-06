import React, {ChangeEvent, KeyboardEvent, useContext, useRef, useState} from 'react';
import Ticket from "../Ticket/Ticket";
import {StoreContext} from "../../App";
import {ColumnType} from "../../types";
import s from "./Column.module.scss";
import ticket from "../Ticket/Ticket";
import {logDOM} from "@testing-library/react";

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
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {tickets, setTickets} = useContext(StoreContext);
  const ref = useRef<HTMLInputElement|null>(null);


  function renderInput() {
    if (type === 'backlog') {
      return (
        <input
          className={s.input}
          type='text'
          placeholder='Enter new title'
          onKeyDown={handleInput}
          ref={ref}
        />
      );
    }
  }

  function renderSelect() {
    if (type === 'ready' || type === 'progress' || type == 'finished') {
      return (
        <select className={s.select} onChange={handleSelect}>
          <option disabled selected>Chose task</option>
          {tickets
            .filter(ticket => {
              switch (type) {
                case "ready":
                  return ticket.type === 'backlog';
                case "progress":
                  return ticket.type === 'ready';
                case "finished":
                  return ticket.type === 'progress';
              }
            })
            .map(ticket => <option value={ticket.title}>{ticket.title}</option>)
          }
        </select>
      )
    }
  }

  function removeTickets() {
    if (type === "backlog") {
      tickets.filter(ticket => {
        switch (type) {
          case "backlog": return ticket.type !== "ready"
        }
      }).map(ticket => console.log(ticket))
    }
  }

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
      setTickets([
        ...tickets,
        {
          title: e.currentTarget.value,
          type: 'backlog',
          description: 'Some dummy static description that\'s being created for any new ticket'
        }
      ]);

      setIsInputActive(false);
    }
  }

  function handleInputOnClick() {
    if (isInputActive) {
      ref.current && setTickets([
        ...tickets,
        {
          title: ref.current!.value,
          type: 'backlog',
          description: 'Some dummy static description that\'s being created for any new ticket'
        }
      ]);
    }
  }

  function handleSelect(e: ChangeEvent) {
    isSelectActive && setIsSelectActive(false);
    removeTickets()
    const target = e.target as HTMLSelectElement;
    switch (type) {
      case "ready":
        return setTickets(
          [
            ...tickets,
            {
              title: target.value,
              type: 'ready',
              description: 'Some dummy static description that\'s being created for any new ticket'
            }
          ]
        );
      case "progress":
        return setTickets(
          [
            ...tickets,
            {
              title: target.value,
              type: 'progress',
              description: 'Some dummy static description that\'s being created for any new ticket'
            }
          ]);
      case "finished":
        return setTickets(
          [
            ...tickets,
            {
              title: target.value,
              type: 'finished',
              description: 'Some dummy static description that\'s being created for any new ticket'
            }
          ]);
    }
  }

    tickets.map(ticket => {
      if (ticket.type === 'backlog' && ticket.title === '') {
        switch (type) {
          case 'ready':
            return setIsButtonDisabled(true);
          case 'progress':
            return setIsButtonDisabled(true);
          case 'finished':
            return setIsButtonDisabled(true);
        }
      }
    })

  function handleIsInputActive() {
    handleInputOnClick();
    if (!isInputActive) {
      setIsInputActive(true);
      ref.current && ref.current!.focus()
    } else {
      setIsInputActive(false);
    }

    if (!isSelectActive) {
      setIsSelectActive(true)
    } else {
      setIsSelectActive(false);
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
      {isInputActive && renderInput()}
      {isSelectActive && renderSelect()}
      <div className={s.addCard} onClick={handleIsInputActive}>
        {isInputActive ? (type === 'backlog' && 'Submit') : type === 'backlog' && '+Add card'}
        {!isSelectActive && (type !== 'backlog' && '+Add card')}
      </div>
    </div>
  )
}

export default Column;