import React, {ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState} from 'react';
import Ticket from "../Ticket/Ticket";
import {StoreContext} from "../../App";
import {ColumnType, TicketType} from "../../types";
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
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [optionValue, setOptionValue] = useState('');
  const {tickets, setTickets} = useContext(StoreContext);
  const ref = useRef<HTMLInputElement|null>(null);
  const [filteredTickets, setFilteredTickets] = useState<Array<string>>([]);

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
          <option disabled selected>Choose task</option>
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
            .map(ticket => <option value={ticket.id}>{ticket.title}</option>)
          }
        </select>
      )
    }
  }

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
      setTickets([
        ...tickets,
        {
          id: tickets.length,
          title: e.currentTarget.value,
          type: 'backlog',
          description: 'Some dummy static description that\'s being created for any new ticket'
        }
      ]);

      setIsInputActive(false);
      console.log(tickets.map(ticket => ticket.id))
    }
  }

  function handleInputOnClick() {
    if (isInputActive) {
      ref.current && setTickets([
        ...tickets,
        {
          id: tickets.length,
          title: ref.current!.value,
          type: 'backlog',
          description: 'Some dummy static description that\'s being created for any new ticket'
        }
      ]);
    }
  }

  function handleSelect(e: ChangeEvent) {
    isSelectActive && setIsSelectActive(false);
    const target = e.target as HTMLOptionElement;
    switch (type) {
      case "ready":
          const newReadyTickets = tickets.map((ticket, id) => {
            if (ticket.id === Number(target.value)) {
              ticket.type = 'ready'
            }
            return ticket;
          })
        // @ts-ignore
        return setTickets(newReadyTickets);

      case "progress":
        const newProgressTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'progress'
          }
          return ticket;
        })
        // @ts-ignore
        return setTickets(newProgressTickets);

      case "finished":
        const newFinishedTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'finished'
          }
          return ticket;
        })
        // @ts-ignore
        return setTickets(newFinishedTickets);
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
    <div className={s.root} key={type}>
      <h4 className={s.title}>{titles[type]}</h4>
      <div>
        {tickets
          .filter(ticket => ticket.type === type)
          .map(ticket => <Ticket title={ticket.title} description={ticket.description} type={type} id={ticket.id}/>
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