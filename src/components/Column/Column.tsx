import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import Ticket from "../Ticket/Ticket";
import {StoreContext} from "../../App";
import {ColumnType} from "../../types";
import s from "./Column.module.scss";

type Props = {
  type: ColumnType;
} & CounterProps

type CounterProps = {
  setBacklogTaskNumber: Dispatch<SetStateAction<number>>,
  setFinishedTaskNumber: Dispatch<SetStateAction<number>>
}

const titles = {
  backlog: 'Backlog',
  ready: 'Ready',
  progress: 'In Progress',
  finished: 'Finished'
}

function Column({type, setBacklogTaskNumber, setFinishedTaskNumber}: Props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {tickets, setTickets} = useContext(StoreContext);
  const ref = useRef<HTMLInputElement | null>(null);

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
        description: 'This task has no description'
      }
    ];
    // @ts-ignore
    setTickets(newTickets);
    // @ts-ignore
    const newBacklogTickets = newTickets.filter(ticket => ticket.type === 'backlog');
    if (newBacklogTickets.length === 0) {
      setIsButtonDisabled(true);
    }
    setBacklogTaskNumber(newBacklogTickets.length);
    localStorage.setItem('tickets', JSON.stringify(newTickets))
    localStorage.setItem('ticketsCounter', JSON.stringify(newBacklogTickets.length))
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

  useEffect(() => {
    if (isInputActive) {
      ref.current && ref.current.focus();
    }
  }, [isInputActive]);

  function handleSelect(e: ChangeEvent) {
    isSelectActive && setIsSelectActive(false);
    const target = e.target as HTMLOptionElement;
    switch (type) {
      case "ready":
        const newReadyTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'ready';
          }
          return ticket;
        })

        const newBacklogTickets = tickets.filter((ticket, id) => ticket.id !== Number(target.value) && ticket.type === 'backlog')
        setBacklogTaskNumber(newBacklogTickets.length)

        localStorage.setItem('tickets', JSON.stringify(newReadyTickets));
        localStorage.setItem('ticketsCounter', JSON.stringify(newBacklogTickets.length))
        return setTickets(newReadyTickets);

      case "progress":
        const newProgressTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'progress'
          }
          return ticket;
        })

        localStorage.setItem('tickets', JSON.stringify(newProgressTickets));
        // localStorage.setItem('newProgressTickets', JSON.stringify(newProgressTickets.length))
        return setTickets(newProgressTickets);

      case "finished":
        const newFinishedTickets = tickets.map((ticket, id) => {
          if (ticket.id === Number(target.value)) {
            ticket.type = 'finished'
          }
          return ticket;
        })
        console.log(newFinishedTickets)
        const newFinishedTicketsCounter = newFinishedTickets.filter((ticket, id) => ticket.type === 'finished')
        setFinishedTaskNumber( newFinishedTicketsCounter.length)

        localStorage.setItem('tickets', JSON.stringify(newFinishedTickets));
        localStorage.setItem('finishedCounter', JSON.stringify(newFinishedTicketsCounter.length))
        return setTickets(newFinishedTickets);
    }
  }

  useEffect(() => {
    tickets.map(ticket => {
      switch (type) {
        case "backlog":
          return setIsButtonDisabled(false);
        case 'ready':
          if (ticket.type === 'backlog' && tickets.length !== 0) {
            setIsButtonDisabled(false);
          }
          return;
        case 'progress':
          if (ticket.type === 'ready' && tickets.length !== 0) {
            setIsButtonDisabled(false);
          }
          return;
        case 'finished':
          if (ticket.type === 'progress' && tickets.length !== 0) {
            setIsButtonDisabled(false);
          }
          return;
      }
    })
  }, [tickets])

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
              <Ticket
                title={ticket.title}
                description={ticket.description}
                type={type}
                id={ticket.id}
              />
            )
          )}
      </div>
      {isInputActive && renderInput()}
      {isSelectActive && renderSelect()}
      <button className={s.addCard} onClick={handleIsInputActive} disabled={isButtonDisabled}>
        {isInputActive ? (type === 'backlog' && 'Submit') : type === 'backlog' && '+Add card'}
        {!isSelectActive && (type !== 'backlog' && '+Add card')}
      </button>
    </div>
  )
}

export default Column;