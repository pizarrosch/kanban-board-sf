import React, {ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState} from 'react';
import Ticket from "../Ticket/Ticket";
import {StoreContext} from "../../App";
import {ColumnType, TicketType} from "../../types";
import s from "./Column.module.scss";
import {Route, Routes} from "react-router";
import {Link} from "react-router-dom";

type Props = {
  type: ColumnType;
}

const titles = {
  backlog: 'Backlog',
  ready: 'Ready',
  progress: 'In Progress',
  finished: 'Finished'
}

const dummyText = `
  But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will 
  give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, 
  the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, 
  but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. 
  Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because 
  occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, 
  which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any 
  right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a
  pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men 
  who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot 
  foresee
`

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

  function saveToLocalStorage(target: string) {
    const newTickets = [
      ...tickets,
      {
        id: tickets.length,
        title: target,
        type: 'backlog',
        description: dummyText
      }
    ];
    // @ts-ignore
    setTickets(newTickets);
    localStorage.setItem('tickets', JSON.stringify(newTickets))
    localStorage.setItem('ticketsCounter', JSON.stringify(newTickets.length))
  }

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
     saveToLocalStorage(e.currentTarget.value);
     setIsInputActive(false);
    }
  }

  function handleInputOnClick() {
    if (isInputActive) {
      ref.current && saveToLocalStorage(ref.current!.value);
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
        localStorage.setItem('tickets', JSON.stringify(newReadyTickets));
        localStorage.setItem('newReadyTickets', JSON.stringify(newReadyTickets.length))
        return setTickets(newReadyTickets);

      case "progress":
        const newProgressTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'progress'
          }
          return ticket;
        })

        localStorage.setItem('tickets', JSON.stringify(newProgressTickets));
        localStorage.setItem('newProgressTickets', JSON.stringify(newProgressTickets.length))
        return setTickets(newProgressTickets);

      case "finished":
        const newFinishedTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'finished'
          }
          return ticket;
        })

        localStorage.setItem('tickets', JSON.stringify(newFinishedTickets));
        localStorage.setItem('finishedTicketsCounter', JSON.stringify(newFinishedTickets.length))
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
            .map(ticket => (
                <Ticket title={ticket.title} description={ticket.description} type={type} id={ticket.id}/>
              )
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